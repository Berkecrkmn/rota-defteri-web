import { categories, routeColors } from '../data/seedRoutes'
import type { RouteCategory, RouteDraft } from '../interfaces/route'

interface RouteFormProps {
  draft: RouteDraft
  isEditing: boolean
  onChange: (draft: RouteDraft) => void
  onCancel: () => void
  onSubmit: () => void
}

export function RouteForm({ draft, isEditing, onChange, onCancel, onSubmit }: RouteFormProps) {
  const update = <K extends keyof RouteDraft>(key: K, value: RouteDraft[K]) => {
    onChange({ ...draft, [key]: value })
  }

  return (
    <form
      className="route-form"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className="form-heading">
        <div>
          <p className="eyebrow">Rota kaydı</p>
          <h2>{isEditing ? 'Rotayı düzenle' : 'Yeni rota ekle'}</h2>
        </div>
        {isEditing && (
          <button className="ghost-button compact" type="button" onClick={onCancel}>
            Vazgeç
          </button>
        )}
      </div>

      <label>
        Rota adı
        <input
          required
          value={draft.title}
          onChange={(event) => update('title', event.target.value)}
          placeholder="Kuzguncuk Sakin Gün"
        />
      </label>

      <div className="form-grid">
        <label>
          Semt
          <input
            required
            value={draft.district}
            onChange={(event) => update('district', event.target.value)}
            placeholder="Üsküdar"
          />
        </label>
        <label>
          Kategori
          <select
            value={draft.category}
            onChange={(event) => update('category', event.target.value as RouteCategory)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Süre
          <input
            min="30"
            required
            type="number"
            value={draft.duration}
            onChange={(event) => update('duration', Number(event.target.value))}
          />
        </label>
        <label>
          Mesafe
          <input
            min="0.5"
            required
            step="0.1"
            type="number"
            value={draft.distance}
            onChange={(event) => update('distance', Number(event.target.value))}
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Bütçe
          <input
            required
            value={draft.budget}
            onChange={(event) => update('budget', event.target.value)}
            placeholder="300-500 TL"
          />
        </label>
        <label>
          Başlangıç
          <input
            required
            value={draft.bestTime}
            onChange={(event) => update('bestTime', event.target.value)}
            placeholder="10.30"
          />
        </label>
      </div>

      <label>
        Kısa not
        <textarea
          required
          rows={4}
          value={draft.notes}
          onChange={(event) => update('notes', event.target.value)}
          placeholder="Rota karakterini bir cümleyle anlat."
        />
      </label>

      <fieldset className="swatches">
        <legend>Harita rengi</legend>
        <div>
          {routeColors.map((color) => (
            <button
              aria-label={`${color} rengini seç`}
              className={draft.color === color ? 'selected' : ''}
              key={color}
              style={{ background: color }}
              type="button"
              onClick={() => update('color', color)}
            />
          ))}
        </div>
      </fieldset>

      <button className="primary-button" type="submit">
        {isEditing ? 'Güncelle' : 'Ekle'}
      </button>
    </form>
  )
}
