import { useState } from 'react'
import { ChevronDown, ChevronUp, Mountain, DoorOpen, Star } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  'mountain-snow': <Mountain size={24} className="text-[#222]" aria-hidden="true" />,
  'door-open': <DoorOpen size={24} className="text-[#222]" aria-hidden="true" />,
  'star': <Star size={24} className="fill-[#FF385C] stroke-none" aria-hidden="true" />,
}

interface HighlightsSectionProps {
  highlights: Array<{ icon: string; title: string; desc: string }>
  description: string
}

export default function HighlightsSection({ highlights, description }: HighlightsSectionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  return (
    <>
      <div className="py-6 border-b border-[#DDDDDD] space-y-5">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {iconMap[h.icon] ?? <Star size={24} className="text-[#222]" />}
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#222]">{h.title}</p>
              <p className="text-sm text-[#717171] mt-0.5">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-[#DDDDDD] py-6">
        <div className="mb-4 rounded-xl bg-[#F7F7F7] px-4 py-3 text-sm text-[#222]">
          Some info has been automatically translated. <button className="font-semibold underline">Show original</button>
        </div>
        <p className={`whitespace-pre-line text-base leading-7 text-[#222] ${!showFullDescription ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        <button
          type="button"
          onClick={() => setShowFullDescription((current) => !current)}
          className="mt-4 flex items-center gap-1 text-base font-semibold text-[#222] underline"
        >
          {showFullDescription ? 'Show less' : 'Show more'}
          {showFullDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </>
  )
}
