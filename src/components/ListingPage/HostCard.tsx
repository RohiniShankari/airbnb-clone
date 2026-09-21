import { Award } from 'lucide-react'

interface HostCardProps {
  host: {
    name: string
    avatar: string
    isSuperhost: boolean
    yearsHosting: number
    responseRate: number
    responseTime: string
  }
  guests: number
  bedrooms: number
  beds: number
  bathrooms: number
}

export default function HostCard({ host }: HostCardProps) {
  return (
    <div className="flex items-center gap-4 border-b border-[#DDDDDD] py-5">
      <div className="relative flex-shrink-0">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-14 h-14 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${host.name}&background=FF385C&color=fff&size=56`
          }}
        />
        {host.isSuperhost && (
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#222] rounded-full flex items-center justify-center">
            <Award size={10} className="text-white" aria-hidden="true" />
          </span>
        )}
      </div>
      <div>
        <h2 className="text-base font-semibold text-[#222]">Hosted by Mirashya Homes</h2>
        <p className="mt-1 text-sm text-[#717171]">{host.yearsHosting} years hosting</p>
      </div>
    </div>
  )
}
