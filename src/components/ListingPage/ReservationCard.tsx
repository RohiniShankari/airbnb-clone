interface ReservationCardProps {
  pricePerNight: number
  rating: number
  reviewCount: number
  cleaningFee: number
  serviceFee: number
  guests: number
}

export default function ReservationCard(_props: ReservationCardProps) {
  return (
    <div
      className="border border-[#DDDDDD] rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
      aria-label="Reservation card"
    >
      <div className="mb-5 flex items-baseline gap-2">
        <span className="text-[22px] font-semibold text-[#222]">₹28,499</span>
        <span className="text-sm text-[#717171]">for 5 nights</span>
      </div>

      <div className="mb-4 overflow-hidden rounded-xl border border-[#B0B0B0]">
        <div className="grid grid-cols-2">
          <div className="border-r border-[#B0B0B0] px-3 py-3">
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#222]">Check-in</p>
            <p className="text-sm text-[#222]">10/18/2026</p>
          </div>
          <div className="px-3 py-3">
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#222]">Check-out</p>
            <p className="text-sm text-[#222]">10/23/2026</p>
          </div>
        </div>
        <div className="border-t border-[#B0B0B0] px-3 py-3">
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#222]">Guests</p>
          <p className="text-sm text-[#222]">2 guests</p>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold py-3.5 rounded-xl hover:from-[#D4194A] hover:via-[#CC1858] hover:to-[#C10360] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E61E4D]">
        Reserve
      </button>
      <p className="text-center text-sm text-[#717171] mt-2">You won't be charged yet</p>

      <p className="mt-5 rounded-lg bg-[#F7F7F7] px-3 py-2 text-center text-sm text-[#222]">Free cancellation before <strong>17 October</strong></p>
    </div>
  )
}
