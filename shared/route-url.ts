import { validateIds, type Pub } from './catalogue'

export type RestoredPlan = { ids: string[]; error: string | null }
export function restorePlan(search: string, pubs: readonly Pub[]): RestoredPlan {
  try {
    if (!search) return { ids: [], error: null }
    if (search.length > 256 || /%(?![0-9a-f]{2})/i.test(search)) throw new Error('Invalid or oversized plan link.')
    const query = new URLSearchParams(search)
    if ([...query.keys()].some(key => key !== 'v' && key !== 'pubs') ||
        query.getAll('v').length !== 1 || query.getAll('pubs').length !== 1 || query.get('v') !== '1') throw new Error('Unsupported plan link. No stops were restored.')
    return { ids: validateIds(query.get('pubs')!.split(','), pubs), error: null }
  } catch (error) {
    return { ids: [], error: error instanceof Error ? error.message : 'Invalid plan link.' }
  }
}
export function planSearch(ids: readonly string[], pubs: readonly Pub[]): string {
  return ids.length === 0 ? '' : `?v=1&pubs=${validateIds([...ids], pubs).join(',')}`
}
