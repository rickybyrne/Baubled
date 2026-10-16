import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Baubled foundation', () => {
  it('introduces the project and honestly describes the planner destination', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /a little dublin.*a little festive/i })).toBeVisible()
    const planner = screen.getByRole('region', { name: /your evening, in your order/i })
    expect(within(planner).getByText('Planner coming soon')).toBeVisible()
    expect(within(planner).getByText(/no route can be created yet/i)).toBeVisible()
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
