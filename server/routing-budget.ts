// Best-effort protection for ONE warm handler instance. Cold starts, regions and
// scaling create independent counters. This is NOT a global or per-person limit.
export function createRoutingBudget(now = Date.now) {
  const minute: number[] = []
  let dayStart = now(), daily = 0, active = 0, blockedUntil = 0
  return {
    enter(): (() => void) | null {
      const time = now()
      while (minute.length && minute[0]! <= time - 60_000) minute.shift()
      if (time - dayStart >= 86_400_000) { dayStart = time; daily = 0 }
      if (time < blockedUntil || active >= 2 || minute.length >= 6 || daily >= 100) return null
      minute.push(time); daily++; active++
      let released = false
      return () => { if (!released) { active--; released = true } }
    },
    observe(response: Response) {
      if (response.status === 429) blockedUntil = Math.max(blockedUntil, now() + 60_000)
      // Do not repeat an invalid key or ambiguous daily quota failure. An operator
      // must investigate; a new reviewed deployment/key replaces this instance.
      if (response.status === 401 || response.status === 403) blockedUntil = Infinity
      if (response.headers.get('x-ratelimit-remaining') === '0') blockedUntil = Math.max(blockedUntil, now() + 86_400_000)
    },
  }
}
