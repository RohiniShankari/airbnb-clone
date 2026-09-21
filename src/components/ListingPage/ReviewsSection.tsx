import { useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, KeyRound, Map, MessageSquare, SprayCan, Star, Tag } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Review } from '../../data/listing'

interface ReviewsSectionProps {
  rating: number
  reviewCount: number
  reviews: Review[]
  ratingBreakdown: {
    cleanliness: number
    accuracy: number
    checkIn: number
    communication: number
    location: number
    value: number
  }
}

const categories = [
  ['🛏️', 'Comfort', 6], ['✅', 'Accuracy', 5], ['🛁', 'Hot tub', 5], ['🧺', 'Condition', 4],
  ['🎁', 'Hospitality', 8], ['🧼', 'Cleanliness', 4], ['🍽️', 'Amenities', 2], ['🖼️', 'Decor', 2],
  ['🏠', 'Indoor spaces', 2], ['📍', 'Location', 2],
] as const

const ratingLabels = [
  ['Cleanliness', 'cleanliness', SprayCan], ['Accuracy', 'accuracy', CheckCircle2], ['Check-in', 'checkIn', KeyRound],
  ['Communication', 'communication', MessageSquare], ['Location', 'location', Map], ['Value', 'value', Tag],
] as const

function Acorn() {
  return (
    <svg viewBox="0 0 28 48" className="h-full w-auto" fill="none" aria-hidden="true">
      <path d="M14 4C9 8 8 13 11 17c2 2 4 2 6 1 3-4 2-9-3-14Z" fill="#222" />
      <path d="M12 18C6 13 2 14 2 19c0 5 5 8 12 8 1-3 0-6-2-9Z" fill="#222" />
      <path d="M16 19c6-5 10-4 10 1 0 5-5 8-12 8-1-3 0-6 2-9Z" fill="#222" />
      <path d="M12 29c-7-4-11-2-10 3 1 5 7 7 14 5 0-3-1-6-4-8Z" fill="#222" />
      <path d="M16 29c7-4 11-2 10 3-1 5-7 7-14 5 0-3 1-6 4-8Z" fill="#222" />
      <path d="M14 15v28" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function RatingColumn({ label, value, Icon }: { label: string; value: number; Icon: typeof SprayCan }) {
  return (
    <div className="flex min-h-[132px] min-w-[118px] flex-col items-start justify-between gap-4 border-r border-[#DDDDDD] px-6 last:border-r-0">
      <span className="text-sm font-medium text-[#222]">{label}</span>
      <span className="text-[22px] font-semibold leading-none text-[#222]">{value.toFixed(1)}</span>
      <Icon size={28} strokeWidth={1.7} className="text-[#222]" aria-hidden="true" />
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > 200

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.author}
          className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
          onError={(event) => {
            event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author)}&background=717171&color=fff&size=44`
          }}
        />
        <div>
          <p className="text-sm font-semibold text-[#222]">{review.author}</p>
          <p className="text-xs text-[#717171]">{review.location} · {review.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={11} className="fill-[#222] stroke-none" aria-hidden="true" />)}</div>
        <span className="text-xs text-[#717171]">· {review.date}</span>
      </div>
      <div>
        <p className={`text-sm leading-6 text-[#222] ${!expanded && isLong ? 'line-clamp-4' : ''}`}>{review.text}</p>
        {isLong && <button onClick={() => setExpanded((current) => !current)} className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#222] underline">{expanded ? 'Show less' : 'Show more'}{expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>}
      </div>
    </div>
  )
}

export default function ReviewsSection({ rating, reviewCount, reviews, ratingBreakdown }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const displayed = showAll ? reviews : reviews.slice(0, 6)

  return (
    <div id="reviews" className="border-b border-[#DDDDDD] py-10">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-3 flex h-16 items-center gap-4">
          <span className="h-11 w-7"><Acorn /></span>
          <span className="text-[72px] font-semibold leading-none tracking-tight text-[#222]">{rating}</span>
          <span className="h-11 w-7 -scale-x-100"><Acorn /></span>
        </div>
        <p className="mb-1 text-xl font-semibold text-[#222]">Guest favourite</p>
        <p className="max-w-xs text-sm leading-5 text-[#717171]">This home is a guest favourite based on ratings, reviews and reliability</p>
        <button className="mt-2 text-sm font-medium text-[#222] underline">How reviews work</button>
      </div>

      <div className="mb-8 overflow-x-auto border-t border-[#DDDDDD] py-6">
        <div className="grid min-w-[880px] grid-cols-[150px_repeat(6,minmax(118px,1fr))]">
        <div className="flex min-h-[132px] flex-shrink-0 flex-col justify-between gap-2 border-r border-[#DDDDDD] pr-6">
          <span className="whitespace-nowrap text-sm font-medium text-[#222]">Overall rating</span>
          {[5, 4, 3, 2, 1].map((star) => <div key={star} className="flex items-center gap-2"><span className="w-2 text-xs text-[#222]">{star}</span><div className="h-1 w-24 overflow-hidden rounded-full bg-[#DDDDDD]"><div className={`h-full rounded-full bg-[#222] ${star === 5 ? 'w-[88%]' : star === 4 ? 'w-[10%]' : star === 3 ? 'w-[2%]' : 'w-0'}`} /></div></div>)}
        </div>
        {ratingLabels.map(([label, key, Icon]) => <RatingColumn key={key} label={label} value={ratingBreakdown[key]} Icon={Icon} />)}
        </div>
      </div>

      <div className="scrollbar-hide mb-8 flex items-center gap-3 overflow-x-auto pb-1">
        {categories.map(([icon, label, count]) => <button key={label} onClick={() => setActiveCategory((current) => current === label ? null : label)} className={`flex flex-shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${activeCategory === label ? 'border-[#222] bg-[#222] text-white' : 'border-[#DDDDDD] bg-white text-[#222] hover:border-[#222]'}`}><span aria-hidden="true">{icon}</span>{label}<span className={activeCategory === label ? 'text-white' : 'text-[#717171]'}>{count}</span></button>)}
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
        <AnimatePresence>
          {displayed.map((review) => <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}><ReviewCard review={review} /></motion.div>)}
        </AnimatePresence>
      </div>

      {reviews.length > 6 && <button onClick={() => setShowAll((current) => !current)} className="mt-10 rounded-xl border border-[#222] px-6 py-3.5 text-base font-semibold text-[#222] hover:bg-[#F7F7F7]">{showAll ? 'Show fewer reviews' : `Show all ${reviewCount} reviews`}</button>}
    </div>
  )
}
