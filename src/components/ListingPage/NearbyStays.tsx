import { useState } from 'react'

const stays = [
  ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', 'Beautiful Studio with a view to die for', '₹23,600', '4.91'],
  ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', 'NAQAB - 1bhk with private pool', '₹42,218', '4.95'],
  ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 'Greentique Luxury Flat with plunge pool, Calangute', '₹44,506', '4.94'],
  ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'The Tropical Studio | 5 mins to Beach', '₹22,824', '4.96'],
  ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', 'Luxury Casa Bella 1BHK with plunge pool, Calangute', '₹39,942', '4.95'],
  ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool', '₹45,648', '5.0'],
]

export default function NearbyStays() {
  const [page, setPage] = useState(0)
  const pageSize = 5
  const visibleStays = stays.slice(page * pageSize, page * pageSize + pageSize)
  const pageCount = Math.ceil(stays.length / pageSize)

  return (
    <section className="border-b border-[#DDDDDD] py-8" aria-labelledby="nearby-stays-title">
      <div className="mb-5 flex items-center justify-between">
        <h2 id="nearby-stays-title" className="text-[22px] font-semibold text-[#222]">More stays nearby</h2>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm text-[#717171]">1 / 2</span>
          <button
            type="button"
            aria-label="Previous nearby stays"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDDDDD] text-[#B0B0B0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next nearby stays"
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
            disabled={page === pageCount - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#222] text-xl text-[#222] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>
      <div className="nearby-stays-track scrollbar-hide">
        {visibleStays.map(([image, title, price, rating]) => (
          <article key={title} className="nearby-stay-card">
            <img
              src={image}
              alt={title}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-5 text-[#222]">{title}</h3>
            <p className="mt-1 text-sm text-[#222]"><strong>{price}</strong> <span className="text-[#717171]"> · {rating}</span></p>
          </article>
        ))}
      </div>
    </section>
  )
}
