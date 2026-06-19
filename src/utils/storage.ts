import type { TravelRoute } from '../interfaces/route'
import { seedRoutes } from '../data/seedRoutes'

const storageKey = 'rota-defteri-routes'

export function loadRoutes(): TravelRoute[] {
  const raw = window.localStorage.getItem(storageKey)

  if (!raw) {
    return seedRoutes
  }

  try {
    const parsed = JSON.parse(raw) as TravelRoute[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedRoutes
  } catch {
    return seedRoutes
  }
}

export function saveRoutes(routes: TravelRoute[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(routes))
}
