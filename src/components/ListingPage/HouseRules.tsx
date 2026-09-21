import { CalendarX2, KeyRound, Shield } from 'lucide-react'

interface HouseRulesProps {
  houseRules: string[]
  cancellationPolicy: string
}

export default function HouseRules(_props: HouseRulesProps) {
  return (
    <section className="border-b border-[#DDDDDD] py-10">
      <h2 className="mb-6 text-[22px] font-semibold text-[#222]">Things to know</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        <div>
          <CalendarX2 size={24} strokeWidth={1.5} className="mb-5 text-[#222]" aria-hidden="true" />
          <h3 className="mb-4 text-base font-semibold text-[#222]">Cancellation policy</h3>
          <p className="text-sm leading-6 text-[#222]">Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.</p>
          <p className="mt-3 text-sm text-[#222]">Review this host’s full policy for details.</p>
          <button className="mt-2 text-sm font-semibold text-[#222] underline">Learn more</button>
        </div>
        <div>
          <KeyRound size={24} strokeWidth={1.5} className="mb-5 text-[#222]" aria-hidden="true" />
          <h3 className="mb-4 text-base font-semibold text-[#222]">House rules</h3>
          <ul className="space-y-2 text-sm leading-6 text-[#222]">
            <li>Check-in after 2:00 pm</li>
            <li>Checkout before 11:00 am</li>
            <li>3 guests maximum</li>
          </ul>
          <button className="mt-2 text-sm font-semibold text-[#222] underline">Learn more</button>
        </div>
        <div>
          <Shield size={24} strokeWidth={1.5} className="mb-5 text-[#222]" aria-hidden="true" />
          <h3 className="mb-4 text-base font-semibold text-[#222]">Safety & property</h3>
          <ul className="space-y-2 text-sm leading-6 text-[#222]">
            <li>Carbon monoxide alarm not reported</li>
            <li>Smoke alarm not reported</li>
            <li>Exterior security cameras on property</li>
          </ul>
          <button className="mt-2 text-sm font-semibold text-[#222] underline">Learn more</button>
        </div>
      </div>
    </section>
  )
}
