// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { requestWalkingRoute } from './routing-client'

describe('client response boundary', () => {
  it.each([429, 503, 200])('cancels non-JSON streaming status %i bodies', async status => {
    let cancelled = false
    const response = new Response(new ReadableStream({ cancel() { cancelled = true } }), { status, headers: { 'content-type': 'text/html' } })
    await expect(requestWalkingRoute(['p001', 'p002'], 'test', new AbortController().signal, vi.fn().mockResolvedValue(response))).rejects.toThrow()
    expect(cancelled).toBe(true)
  })
  it.each(['ROUTING_UNAVAILABLE', 'ROUTING_QUOTA_EXHAUSTED'])('marks terminal %s without displaying provider text', async code => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ error: { code, message: 'DO_NOT_DISPLAY' } }, { status: 503 }))
    await expect(requestWalkingRoute(['p001', 'p002'], 'test', new AbortController().signal, fetcher)).rejects.toMatchObject({ retryable: false, message: 'Walking directions are unavailable. Your stops and share link still work.' })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})
