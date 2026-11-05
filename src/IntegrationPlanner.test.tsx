import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import IntegrationPlanner from './IntegrationPlanner'
import { testPubs, orsFixture } from './test/fixtures'
import { normaliseOrs } from '../shared/route'
import { CATALOGUE_REVISION } from '../shared/catalogue'

vi.mock('./DublinMap', () => ({ default: () => <p>Map unavailable. The list still works.</p> }))
beforeEach(() => window.history.replaceState(null, '', '/'))
afterEach(() => vi.restoreAllMocks())
function order(ids: string) {
  fireEvent.change(screen.getByLabelText('Ordered pub IDs'), { target: { value: ids } })
  fireEvent.click(screen.getByRole('button', { name: 'Apply order' }))
}
describe('integration proof UI', () => {
  it('retains list, order and sharing when mapping and routing fail; one stop makes no request', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('<html>unavailable</html>', { status: 503 }))
    render(<IntegrationPlanner pubs={testPubs} fetcher={fetcher} />)
    fireEvent.click(screen.getByRole('checkbox', { name: /Test pub 1 Synthetic/ }))
    expect(screen.getByRole('button', { name: 'Check walking route' })).toBeDisabled()
    expect(fetcher).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('checkbox', { name: /Test pub 2 Synthetic/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    await screen.findByText(/walking directions are unavailable/i)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('checkbox', { name: /Test pub 1 Synthetic/ })).toBeChecked()
    expect(screen.getByRole('link', { name: 'Open this exact plan' })).toHaveAttribute('href', '?v=1&pubs=p001,p002#route-planner')
    expect(screen.getByText(/map unavailable/i)).toBeVisible()
  })
  it('restores twelve stops in exact order and rejects edits without altering the current plan', () => {
    const ids = testPubs.map(pub => pub.id).reverse()
    window.history.replaceState(null, '', `/?v=1&pubs=${ids.join(',')}`)
    render(<IntegrationPlanner pubs={testPubs} />)
    const list = within(screen.getByRole('region', { name: 'Your ordered plan' })).getByRole('list')
    expect(within(list).getAllByRole('listitem').map(item => item.textContent)).toEqual([...testPubs].reverse().map(pub => pub.name))
    expect(screen.getByText(/12 of 12 stops · 11 walking legs/)).toBeVisible()
    order('p001,p001')
    expect(screen.getByRole('alert')).toHaveTextContent('Your current plan is unchanged')
    expect(window.location.search).toBe(`?v=1&pubs=${ids.join(',')}`)
  })
  it('keeps invalid incoming URLs until explicit recovery', () => {
    window.history.replaceState(null, '', '/?v=9&pubs=p001')
    render(<IntegrationPlanner pubs={testPubs} />)
    expect(screen.getByRole('alert')).toHaveTextContent('original URL has been kept')
    expect(window.location.search).toBe('?v=9&pubs=p001')
    fireEvent.click(screen.getByRole('button', { name: 'Start an empty plan' }))
    expect(window.location.search).toBe('')
  })
  it('validates twelve-stop walking results and renders instruction text safely', async () => {
    const fixture = orsFixture()
    fixture.features[0]!.properties.segments[0]!.steps[0]!.instruction = '<img src=x onerror=alert(1)>'
    const route = normaliseOrs(fixture, testPubs, CATALOGUE_REVISION)
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(route))
    render(<IntegrationPlanner pubs={testPubs} fetcher={fetcher} />)
    order(testPubs.map(pub => pub.id).join(','))
    fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    await screen.findByRole('region', { name: 'Walking directions' })
    expect(document.querySelectorAll('details')).toHaveLength(11)
    expect(screen.getByText('<img src=x onerror=alert(1)> (10 m)')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('rejects an old A response after A→B→A even when cancellation is ineffective', async () => {
    vi.spyOn(AbortController.prototype, 'abort').mockImplementation(() => {})
    let finish: (response: Response) => void = () => {}
    const fetcher = vi.fn<typeof fetch>().mockImplementationOnce(() => new Promise(resolve => { finish = resolve }))
      .mockResolvedValueOnce(Response.json(normaliseOrs(orsFixture(testPubs.slice(0, 2)), testPubs.slice(0, 2), CATALOGUE_REVISION)))
    render(<IntegrationPlanner pubs={testPubs} fetcher={fetcher} />)
    order('p001,p002'); fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    order('p002,p003'); order('p001,p002')
    await act(async () => { finish(Response.json(normaliseOrs(orsFixture(testPubs.slice(0, 2)), testPubs.slice(0, 2), CATALOGUE_REVISION))) })
    expect(screen.queryByRole('region', { name: 'Walking directions' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    await screen.findByRole('region', { name: 'Walking directions' })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
  it('clears walking output on browser history restoration and handles platform HTML 429', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('rate limited', { status: 429 }))
    render(<IntegrationPlanner pubs={testPubs} fetcher={fetcher} />)
    order('p001,p002'); fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    await screen.findByText(/directions are busy/i)
    act(() => { window.history.pushState(null, '', '/?v=1&pubs=p003'); window.dispatchEvent(new PopStateEvent('popstate')) })
    await waitFor(() => expect(screen.getByLabelText('Ordered pub IDs')).toHaveValue('p003'))
    expect(screen.queryByText(/directions are busy/i)).not.toBeInTheDocument()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('suppresses repeated checks after a disabled-service response without clearing selection', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ error: { code: 'ROUTING_UNAVAILABLE' } }, { status: 503 }))
    render(<IntegrationPlanner pubs={testPubs} fetcher={fetcher} />)
    order('p001,p002'); fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    await screen.findByText(/walking directions are unavailable/i)
    expect(screen.getByRole('button', { name: 'Check walking route' })).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Check walking route' }))
    expect(screen.getByRole('link', { name: 'Open this exact plan' })).toBeVisible()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})
