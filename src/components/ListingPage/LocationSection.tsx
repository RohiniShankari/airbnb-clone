import { MapPin } from 'lucide-react'

interface LocationSectionProps {
  city: string
  region: string
  country: string
  lat: number
  lng: number
}

export default function LocationSection({ city, region, country, lat, lng }: LocationSectionProps) {
  return (
    <div id="location" className="py-6 border-b border-[#DDDDDD]">
      <h2 className="text-[22px] font-semibold text-[#222] mb-4">Where you’ll be</h2>
      <p className="text-base text-[#222] font-medium mb-4">
        <MapPin size={16} className="inline mr-1.5 text-[#717171]" aria-hidden="true" />
        Candolim, Goa, India
      </p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl overflow-hidden border border-[#DDDDDD] hover:border-[#222] transition-colors focus-visible:outline-2 focus-visible:outline-[#222]"
        aria-label={`Open map for ${city}, ${region}, ${country}`}
      >
        <div className="relative w-full h-80 bg-[#F7F7F7] flex items-center justify-center">
          <div className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md" aria-hidden="true">⌕</div>
          <div className="absolute right-3 top-3 z-20 overflow-hidden rounded-xl bg-white shadow-md" aria-hidden="true"><div className="flex h-10 w-10 items-center justify-center border-b border-[#DDDDDD] text-xl">+</div><div className="flex h-10 w-10 items-center justify-center text-xl">−</div></div>
          <svg
            viewBox="0 0 800 320"
            className="absolute inset-0 w-full h-full opacity-20"
            aria-hidden="true"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#717171" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="320" fill="url(#grid)" />
            <line x1="200" y1="0" x2="200" y2="320" stroke="#999" strokeWidth="2" />
            <line x1="400" y1="0" x2="400" y2="320" stroke="#999" strokeWidth="2" />
            <line x1="600" y1="0" x2="600" y2="320" stroke="#999" strokeWidth="2" />
            <line x1="0" y1="120" x2="800" y2="120" stroke="#999" strokeWidth="2" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#999" strokeWidth="2" />
            <line x1="100" y1="0" x2="500" y2="320" stroke="#aaa" strokeWidth="1.5" />
            <line x1="600" y1="0" x2="300" y2="320" stroke="#aaa" strokeWidth="1.5" />
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 bg-[#FF385C] rounded-full flex items-center justify-center shadow-lg">
              <MapPin size={20} className="text-white fill-white stroke-none" aria-hidden="true" />
            </div>
            <div className="mt-2 bg-white px-3 py-1.5 rounded-lg shadow text-sm font-medium text-[#222]">
              Candolim, Goa
            </div>
          </div>
        </div>
      </a>

      <p className="mt-4 text-sm text-[#717171] leading-6">
        Exact location will be provided after booking.
      </p>
      <h3 className="mt-6 text-base font-semibold text-[#222]">Neighbourhood highlights</h3>
      <p className="mt-2 text-sm leading-6 text-[#222]">Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p>
      <button className="mt-2 text-sm font-semibold text-[#222] underline">Show more</button>
    </div>
  )
}
