// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createRoutingBudget } from './routing-budget'

describe('per-instance defensive budget (not global enforcement)', () => {
  it('admits two concurrent calls and frees each slot exactly once', () => {
    const budget = createRoutingBudget(() => 0)
    const a = budget.enter()!, b = budget.enter()!
    expect(budget.enter()).toBeNull()
    a(); a()
    const c = budget.enter()!
    expect(budget.enter()).toBeNull()
    b(); c()
  })
  it('enforces a sliding minute, not adjacent fixed-window bursts', () => {
    let time = 59_000
    const budget = createRoutingBudget(() => time)
    for (let i = 0; i < 6; i++) budget.enter()!()
    time = 60_000; expect(budget.enter()).toBeNull()
    time = 119_000; expect(budget.enter()).not.toBeNull()
  })
  it('caps attempts in the instance daily window and resets after 24 hours', () => {
    let time = 0
    const daily = createRoutingBudget(() => time)
    for (let i = 0; i < 100; i++) { daily.enter()!(); time += 60_000 }
    expect(daily.enter()).toBeNull()
    time = 86_400_000; expect(daily.enter()).not.toBeNull()
  })
  it('stops minute errors for 60 seconds and auth/daily ambiguity until replacement', () => {
    let time = 0
    const budget = createRoutingBudget(() => time)
    budget.observe(new Response('', { status: 429 }))
    expect(budget.enter()).toBeNull()
    time = 60_000; budget.enter()!()
    budget.observe(new Response('', { status: 403 }))
    time = 2 * 86_400_000; expect(budget.enter()).toBeNull()
    expect(createRoutingBudget(() => time).enter()).not.toBeNull() // Deliberately exposes instance limitation.
  })
  it('stops before another call when a response reports zero remaining quota', () => {
    const budget = createRoutingBudget(() => 0)
    budget.observe(new Response('', { headers: { 'x-ratelimit-remaining': '0' } }))
    expect(budget.enter()).toBeNull()
  })
})
