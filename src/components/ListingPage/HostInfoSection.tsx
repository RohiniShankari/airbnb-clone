import { GraduationCap, Shield, Star } from 'lucide-react'

interface HostInfoSectionProps {
  host: {
    name: string
    avatar: string
    isSuperhost: boolean
    yearsHosting: number
    responseRate: number
    responseTime: string
  }
}

const coHosts = [
  ['https://i.pravatar.cc/80?img=14', 'Sharath'],
  ['https://i.pravatar.cc/80?img=21', 'Aman Dev Pahwa'],
  ['https://i.pravatar.cc/80?img=25', 'Maria Karen Priyanka'],
  ['https://i.pravatar.cc/80?img=31', 'Simran'],
  ['https://i.pravatar.cc/80?img=44', 'Pallavi'],
  ['https://i.pravatar.cc/80?img=47', 'Sanyukta'],
  ['', 'Shruti'],
  ['', 'Amisha'],
]

export default function HostInfoSection({ host }: HostInfoSectionProps) {
  return (
    <section className="border-b border-[#DDDDDD] py-10">
      <h2 className="mb-6 text-[22px] font-semibold text-[#222]">Meet your host</h2>
      <div className="grid grid-cols-[340px_1fr] gap-12">
        <div>
          <div className="grid grid-cols-[1fr_124px] overflow-hidden rounded-2xl border border-[#DDDDDD] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.10)]">
            <div className="flex flex-col items-center px-5 py-7 text-center">
              <div className="relative">
                <img src="https://i.pravatar.cc/128?img=11" alt="Mirashya Homes" className="h-24 w-24 rounded-full object-cover" />
                {host.isSuperhost && <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF385C]"><Star size={14} className="fill-white stroke-none" aria-hidden="true" /></span>}
              </div>
              <h3 className="mt-4 text-[22px] font-semibold text-[#222]">Mirashya Homes</h3>
              <p className="mt-1 text-sm text-[#717171]">Host</p>
            </div>
            <div className="border-l border-[#DDDDDD] px-5 py-7 text-sm text-[#222]">
              <div className="border-b border-[#DDDDDD] pb-4"><strong className="text-xl">1,463</strong><p>Reviews</p></div>
              <div className="border-b border-[#DDDDDD] py-4"><strong className="text-xl">4.68★</strong><p>Rating</p></div>
              <div className="pt-4"><strong className="text-xl">2</strong><p>Years hosting</p></div>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-[#222]">
            <p className="flex items-center gap-3"><span className="text-xl">◯</span>Born in the 80s</p>
            <p className="flex items-center gap-3"><GraduationCap size={23} strokeWidth={1.5} />Where I went to school: NICMAR GOA</p>
          </div>
        </div>

        <div className="pt-1">
          <h3 className="mb-5 text-base font-semibold text-[#222]">Co-Hosts</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            {coHosts.map(([image, name]) => (
              <div key={name} className="flex items-center gap-3 text-sm text-[#222]">
                {image ? <img src={image} alt={name} className="h-10 w-10 rounded-full object-cover" /> : <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-[#FF385C]">{name[0]}</span>}
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 space-y-2 text-sm text-[#222]">
            <p>Response rate: 100%</p>
            <p>Responds within an hour</p>
          </div>
          <button className="mt-5 rounded-lg bg-[#F0F0F0] px-6 py-3 text-base font-medium text-[#222] hover:bg-[#DDDDDD]">Message host</button>
          <p className="mt-7 flex items-start gap-3 text-sm leading-5 text-[#717171]"><Shield size={22} strokeWidth={1.5} className="flex-shrink-0" />To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
        </div>
      </div>
    </section>
  )
}
