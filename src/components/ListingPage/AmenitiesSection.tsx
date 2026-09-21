import { useState } from 'react'
import {
  Wifi, Wind, Flame, Tv, Car, Utensils, ShowerHead, Shirt,
  Shield, Trees, Star
} from 'lucide-react'

const amenityIcons: Record<string, React.ReactNode> = {
  'wifi': <Wifi size={24} aria-hidden="true" />,
  'air conditioning': <Wind size={24} aria-hidden="true" />,
  'indoor fireplace': <Flame size={24} aria-hidden="true" />,
  'hdtv': <Tv size={24} aria-hidden="true" />,
  'parking': <Car size={24} aria-hidden="true" />,
  'kitchen': <Utensils size={24} aria-hidden="true" />,
  'outdoor shower': <ShowerHead size={24} aria-hidden="true" />,
  'washer': <Shirt size={24} aria-hidden="true" />,
  'smoke alarm': <Shield size={24} aria-hidden="true" />,
  'private pool': <Trees size={24} aria-hidden="true" />,
  'default': <Star size={24} aria-hidden="true" />,
}

function getIcon(item: string): React.ReactNode {
  const lower = item.toLowerCase()
  for (const [key, icon] of Object.entries(amenityIcons)) {
    if (lower.includes(key)) return icon
  }
  return amenityIcons['default']
}

interface AmenitiesSectionProps {
  amenities: Array<{ category: string; items: string[] }>
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [showAll, setShowAll] = useState(false)

  const allItems = amenities.flatMap((a) => a.items)
  const displayed = showAll ? allItems : allItems.slice(0, 10)

  return (
    <div id="amenities" className="py-6 border-b border-[#DDDDDD]">
      <h2 className="text-[22px] font-semibold text-[#222] mb-4">What this place offers</h2>
      <div className="grid grid-cols-2 gap-x-12 gap-y-3">
        {displayed.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[#222] w-6 flex-shrink-0">{getIcon(item)}</span>
            <span className="text-base text-[#222]">{item}</span>
          </div>
        ))}
      </div>
      {allItems.length > 10 && (
        <button
          onClick={() => setShowAll((p) => !p)}
          className="mt-6 px-6 py-3 border border-[#222] rounded-lg text-base font-medium text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#222]"
        >
          {showAll ? 'Show less' : `Show all ${allItems.length} amenities`}
        </button>
      )}
    </div>
  )
}
