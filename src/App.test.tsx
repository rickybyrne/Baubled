import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import * as liveConfig from './live-map-config'
vi.mock('./DublinMap', () => ({ default: () => <p>Offline map</p> }))

describe('Baubled foundation', () => {
  it('describes the public proof without claiming verified doorways or guaranteed availability', () => {
    const publicMode = vi.spyOn(liveConfig, 'isPublicProof').mockReturnValue(true)
    try {
      render(<App />)
      expect(screen.getByText('Live integration proof · experimental')).toBeVisible()
      expect(screen.getByText(/Walking estimates depend on service availability/)).toBeVisible()
      expect(screen.getByText(/Markers identify buildings, not verified doors/)).toBeVisible()
      expect(screen.queryByText(/Live services are disabled/)).not.toBeInTheDocument()
    } finally { publicMode.mockRestore() }
  })
  it('clearly identifies the separately bounded local proof', () => {
    vi.stubEnv('DEV', true); vi.stubEnv('MODE', 'live-proof')
    try {
      render(<App />)
      expect(screen.getByText('Local live integration proof')).toBeVisible()
      expect(screen.getByText(/separate request allowance/)).toBeVisible()
    } finally { vi.unstubAllEnvs() }
  })
  it('introduces the project and honestly describes the planner destination', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /a little dublin.*a little festive/i })).toBeVisible()
    const planner = screen.getByRole('region', { name: /your evening, in your order/i })
    expect(within(planner).getByText('Offline integration proof')).toBeVisible()
    expect(within(planner).getByText(/live services are disabled in this environment/i)).toBeVisible()
    expect(within(planner).getByText(/Its pedestrian entrance coordinate still needs verification/)).toBeVisible()
  })

  it('links the primary CTA to the actual planner section', () => {
    render(<App />)
    const planner = screen.getByRole('region', { name: /your evening, in your order/i })
    expect(planner).toHaveAttribute('id', 'route-planner')
    expect(screen.getByRole('link', { name: /plan your route/i })).toHaveAttribute('href', `#${planner.id}`)
  })

  it('provides a skip link to focusable main content', () => {
    render(<App />)
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute('href', `#${main.id}`)
  })
})
