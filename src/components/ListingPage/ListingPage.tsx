import Navbar from './Navbar'
import HeroGrid from './HeroGrid'
import ListingHeader from './ListingHeader'
import HostCard from './HostCard'
import HighlightsSection from './HighlightsSection'
import AmenitiesSection from './AmenitiesSection'
import DatePicker from './DatePicker'
import ReviewsSection from './ReviewsSection'
import LocationSection from './LocationSection'
import ReservationCard from './ReservationCard'
import HostInfoSection from './HostInfoSection'
import HouseRules from './HouseRules'
import Title from './Title'
import NearbyStays from './NearbyStays'

interface ListingPageProps {
  listing: {
    title: string
    location: { city: string; region: string; country: string; lat: number; lng: number }
    rating: number
    reviewCount: number
    isSuperhost: boolean
    isGuestFavorite: boolean
    host: { name: string; avatar: string; isSuperhost: boolean; yearsHosting: number; responseRate: number; responseTime: string }
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
    pricePerNight: number
    cleaningFee: number
    serviceFee: number
    description: string
    highlights: Array<{ icon: string; title: string; desc: string }>
    amenities: Array<{ category: string; items: string[] }>
    photos: Array<{ id: number; url: string; caption: string; room: string }>
    reviews: Array<{ id: number; author: string; avatar: string; date: string; rating: number; text: string; location: string }>
    ratingBreakdown: { cleanliness: number; accuracy: number; checkIn: number; communication: number; location: number; value: number }
    houseRules: string[]
    cancellationPolicy: string
  }
  onShowAllPhotos: () => void
  onPhotoClick: (index: number) => void
}

export default function ListingPage({ listing: l, onShowAllPhotos, onPhotoClick }: ListingPageProps) {
  return (
    <div className="min-h-screen bg-white ">
      <Navbar rating={l.rating} reviewCount={l.reviewCount} title={l.title} />
      <div className="max-w-[1280px] mx-auto px-20 pt-6 pb-4">
        <Title title={l.title} />
      </div>

      <HeroGrid
        photos={l.photos}
        onShowAllPhotos={onShowAllPhotos}
        onPhotoClick={onPhotoClick}
      />

      <main className="max-w-[1280px] mx-auto px-20 mt-8">
        <div className="grid grid-cols-[1fr_380px] gap-24 border-b border-[#DDDDDD] pb-8">
          <div>
            <div id="overview">
              <div className="mb-5">
                <h1 className="text-[26px] font-semibold leading-8 text-[#222]">Entire serviced apartment in Candolim, India</h1>
                <p className="mt-1 text-base text-[#222]">3 guests · 1 bedroom · 1 bed · 1 bathroom</p>
              </div>
              <ListingHeader
                location={l.location}
                rating={l.rating}
                reviewCount={l.reviewCount}
                isSuperhost={l.isSuperhost}
                isGuestFavorite={l.isGuestFavorite}
              />
            </div>
            <HostCard
              host={l.host}
              guests={l.guests}
              bedrooms={l.bedrooms}
              beds={l.beds}
              bathrooms={l.bathrooms}
            />
            <HighlightsSection
              highlights={l.highlights}
              description={l.description}
            />
            <AmenitiesSection amenities={l.amenities} />
            <DatePicker pricePerNight={l.pricePerNight} />
          </div>

          <div className="sticky top-24 mt-12 h-fit self-start">
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#DDDDDD] px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl" aria-hidden="true">🏷️</span>
                  <div className="flex-1 text-sm text-[#222]">
                    <p>Get 10% off your next stay.</p>
                    <a href="#" className="font-medium underline">Terms apply</a>
                  </div>
                  <button className="rounded-lg bg-[#F7F7F7] px-4 py-2 text-sm font-semibold text-[#222]">Claim</button>
                </div>
              </div>
              <ReservationCard
                pricePerNight={l.pricePerNight}
                rating={l.rating}
                reviewCount={l.reviewCount}
                cleaningFee={l.cleaningFee}
                serviceFee={l.serviceFee}
                guests={l.guests}
              />
              <a href="#" className="block text-center text-sm text-[#717171] underline">⚑ Report this listing</a>
            </div>
          </div>
        </div>

        <div>
          <ReviewsSection
            rating={l.rating}
            reviewCount={l.reviewCount}
            reviews={l.reviews}
            ratingBreakdown={l.ratingBreakdown}
          />
          <LocationSection
            city={l.location.city}
            region={l.location.region}
            country={l.location.country}
            lat={l.location.lat}
            lng={l.location.lng}
          />
          <HostInfoSection host={l.host} />
          <HouseRules
            houseRules={l.houseRules}
            cancellationPolicy={l.cancellationPolicy}
          />
          <NearbyStays />
        </div>
      </main>

    </div>
  )
}
