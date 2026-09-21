import { Star } from 'lucide-react'

interface ListingHeaderProps {
  location: { city: string; region: string; country: string }
  rating: number
  reviewCount: number
  isSuperhost: boolean
  isGuestFavorite: boolean
}

export default function ListingHeader({
  rating,
  reviewCount,
  isGuestFavorite,
}: ListingHeaderProps) {
  return (
    <div className="mb-6 flex min-h-[82px] items-center justify-between gap-6 rounded-2xl border border-[#DDDDDD] px-7 py-4">
      <div className="flex items-center gap-4">
        <span className="text-4xl leading-none text-[#222]" aria-hidden="true">♧</span>
        <div>
          <p className="text-base font-semibold leading-5 text-[#222]">{isGuestFavorite ? 'Guest favourite' : 'Guest favourite'}</p>
          <p className="mt-1 max-w-[280px] text-sm leading-5 text-[#717171]">One of the most loved homes on Airbnb, according to guests</p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-center">
        <div>
          <p className="text-xl font-semibold text-[#222]">{rating}</p>
          <div className="flex items-center justify-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={11} className="fill-[#222] stroke-none" aria-hidden="true" />)}
          </div>
        </div>
        <div className="h-10 border-l border-[#DDDDDD]" />
        <div>
          <p className="text-xl font-semibold text-[#222]">{reviewCount}</p>
          <button className="text-sm text-[#222] underline">Reviews</button>
        </div>
      </div>
    </div>
  )
}


