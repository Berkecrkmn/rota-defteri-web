interface StatStripProps {
  totalRoutes: number
  totalDuration: number
  averageDistance: string
}

export function StatStrip({ totalRoutes, totalDuration, averageDistance }: StatStripProps) {
  return (
    <section className="stat-strip" aria-label="Rota istatistikleri">
      <article>
        <span>Rota</span>
        <strong>{totalRoutes}</strong>
      </article>
      <article>
        <span>Toplam süre</span>
        <strong>{Math.floor(totalDuration / 60)} sa {totalDuration % 60} dk</strong>
      </article>
      <article>
        <span>Ort. mesafe</span>
        <strong>{averageDistance} km</strong>
      </article>
    </section>
  )
}
