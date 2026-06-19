interface RouteMapProps {
  color: string
  stopCount?: number
}

export function RouteMap({ color, stopCount = 4 }: RouteMapProps) {
  const stops = Array.from({ length: Math.max(3, stopCount) })

  return (
    <svg className="route-map" viewBox="0 0 360 220" role="img" aria-label="Rota çizimi">
      <path className="map-road road-a" d="M34 178 C94 124 110 63 174 47 C239 31 270 84 331 42" />
      <path className="map-road road-b" d="M41 48 C105 86 155 118 220 165 C266 198 303 179 341 151" />
      <path className="map-road road-c" d="M103 202 C146 151 141 101 181 74 C219 48 260 54 328 92" />
      <rect className="map-block block-a" x="44" y="68" width="96" height="54" rx="16" />
      <rect className="map-block block-b" x="205" y="94" width="99" height="58" rx="18" />
      <path
        className="route-line"
        d="M48 166 C112 132 154 125 196 91 C236 58 272 47 320 31"
        style={{ stroke: color }}
      />
      {stops.map((_, index) => {
        const points = [
          [48, 166],
          [147, 115],
          [217, 78],
          [320, 31],
          [279, 48],
        ]
        const point = points[index % points.length]
        const radius = index === 1 ? 14 : 10

        return (
          <circle
            className="route-stop"
            cx={point[0]}
            cy={point[1]}
            fill="#fffaf2"
            key={`${point[0]}-${point[1]}-${index}`}
            r={radius}
            style={{ stroke: color }}
          />
        )
      })}
    </svg>
  )
}
