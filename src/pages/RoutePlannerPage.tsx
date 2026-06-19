import { useEffect, useMemo, useState } from 'react'
import { RouteCard } from '../components/RouteCard'
import { RouteForm } from '../components/RouteForm'
import { RouteMap } from '../components/RouteMap'
import { StatStrip } from '../components/StatStrip'
import { categories, seedRoutes } from '../data/seedRoutes'
import type { RouteCategory, RouteDraft, TravelRoute } from '../interfaces/route'
import { loadRoutes, saveRoutes } from '../utils/storage'

const emptyDraft: RouteDraft = {
  title: '',
  district: '',
  category: 'Kültür',
  duration: 120,
  distance: 2.5,
  budget: '250-450 TL',
  bestTime: '10.00',
  notes: '',
  color: '#B65335',
}

function createId(title: string) {
  const slug = title
    .toLowerCase()
    .replaceAll('ı', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return `${slug || 'rota'}-${Date.now().toString(36)}`
}

export function RoutePlannerPage() {
  const [routes, setRoutes] = useState<TravelRoute[]>(() => loadRoutes())
  const [draft, setDraft] = useState<RouteDraft>(emptyDraft)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<RouteCategory | 'Tümü'>('Tümü')

  useEffect(() => {
    saveRoutes(routes)
  }, [routes])

  const filteredRoutes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('tr-TR')

    return routes.filter((route) => {
      const matchesCategory = category === 'Tümü' || route.category === category
      const searchable = `${route.title} ${route.district} ${route.category} ${route.notes}`.toLocaleLowerCase(
        'tr-TR',
      )
      return matchesCategory && searchable.includes(normalizedQuery)
    })
  }, [category, query, routes])

  const totalDuration = routes.reduce((sum, route) => sum + route.duration, 0)
  const averageDistance =
    routes.length === 0
      ? '0.0'
      : (routes.reduce((sum, route) => sum + route.distance, 0) / routes.length).toFixed(1)

  const submitRoute = () => {
    if (editingId) {
      setRoutes((items) =>
        items.map((route) => (route.id === editingId ? { ...draft, id: editingId } : route)),
      )
      setEditingId(null)
    } else {
      setRoutes((items) => [{ ...draft, id: createId(draft.title) }, ...items])
    }

    setDraft(emptyDraft)
  }

  const editRoute = (route: TravelRoute) => {
    const rest: RouteDraft = {
      title: route.title,
      district: route.district,
      category: route.category,
      duration: route.duration,
      distance: route.distance,
      budget: route.budget,
      bestTime: route.bestTime,
      notes: route.notes,
      color: route.color,
    }

    setEditingId(route.id)
    setDraft(rest)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteRoute = (id: string) => {
    setRoutes((items) => items.filter((route) => route.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setDraft(emptyDraft)
    }
  }

  const resetRoutes = () => {
    setRoutes(seedRoutes)
    setEditingId(null)
    setDraft(emptyDraft)
    setQuery('')
    setCategory('Tümü')
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="side-panel">
          <div className="brand-mark">
            <span />
            <div>
              <p>İstanbul mikro rotalar</p>
              <h1>Rota Defteri</h1>
            </div>
          </div>

          <div className="featured-route">
            <RouteMap color="#B65335" stopCount={5} />
            <div>
              <p className="eyebrow">Bugünün planı</p>
              <h2>Kısa şehir kaçamaklarını düzenle.</h2>
            </div>
          </div>

          <RouteForm
            draft={draft}
            isEditing={Boolean(editingId)}
            onCancel={() => {
              setEditingId(null)
              setDraft(emptyDraft)
            }}
            onChange={setDraft}
            onSubmit={submitRoute}
          />
        </aside>

        <section className="content-panel">
          <div className="toolbar">
            <div>
              <p className="eyebrow">Rota arşivi</p>
              <h2>Kayıtlı gezi planları</h2>
            </div>
            <button className="ghost-button compact" type="button" onClick={resetRoutes}>
              Sıfırla
            </button>
          </div>

          <StatStrip
            averageDistance={averageDistance}
            totalDuration={totalDuration}
            totalRoutes={routes.length}
          />

          <div className="filters">
            <label>
              Arama
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rota, semt veya kategori ara"
              />
            </label>
            <div className="category-filter" aria-label="Kategori filtresi">
              <button
                className={category === 'Tümü' ? 'active' : ''}
                type="button"
                onClick={() => setCategory('Tümü')}
              >
                Tümü
              </button>
              {categories.map((item) => (
                <button
                  className={category === item ? 'active' : ''}
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="route-grid">
            {filteredRoutes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onDelete={deleteRoute}
                onEdit={editRoute}
              />
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="empty-state">
              <RouteMap color="#2D5B7A" stopCount={3} />
              <h3>Bu filtreye uygun rota yok.</h3>
              <p>Aramayı temizleyebilir veya yeni bir rota ekleyebilirsin.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}
