export type RouteCategory =
  | 'Kültür'
  | 'Sahil'
  | 'Fotoğraf'
  | 'Kahve'
  | 'Tarih'
  | 'Doğa'

export interface TravelRoute {
  id: string
  title: string
  district: string
  category: RouteCategory
  duration: number
  distance: number
  budget: string
  bestTime: string
  notes: string
  color: string
}

export type RouteDraft = Omit<TravelRoute, 'id'>
