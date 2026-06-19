import type { TravelRoute } from '../interfaces/route'
import { RouteMap } from './RouteMap'

interface RouteCardProps {
  route: TravelRoute
  onEdit: (route: TravelRoute) => void
  onDelete: (id: string) => void
}

export function RouteCard({ route, onEdit, onDelete }: RouteCardProps) {
  return (
    <article className="route-card">
      <div className="card-map">
        <RouteMap color={route.color} />
        <span className="category-badge">{route.category}</span>
      </div>
      <div className="card-content">
        <div>
          <p className="district">{route.district}</p>
          <h3>{route.title}</h3>
          <p>{route.notes}</p>
        </div>
        <dl className="route-meta">
          <div>
            <dt>Süre</dt>
            <dd>{Math.floor(route.duration / 60)} sa {route.duration % 60} dk</dd>
          </div>
          <div>
            <dt>Mesafe</dt>
            <dd>{route.distance.toFixed(1)} km</dd>
          </div>
          <div>
            <dt>Bütçe</dt>
            <dd>{route.budget}</dd>
          </div>
          <div>
            <dt>Saat</dt>
            <dd>{route.bestTime}</dd>
          </div>
        </dl>
        <div className="card-actions">
          <button className="ghost-button" type="button" onClick={() => onEdit(route)}>
            Düzenle
          </button>
          <button className="danger-button" type="button" onClick={() => onDelete(route.id)}>
            Sil
          </button>
        </div>
      </div>
    </article>
  )
}
