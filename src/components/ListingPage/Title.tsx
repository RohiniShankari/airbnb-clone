import { Upload, Heart } from 'lucide-react'

interface ListingHeaderProps {
  title: string
}

export default function ListingHeader({ title }: ListingHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
  <h1 className="text-[26px] font-semibold text-[#222] leading-[32px] tracking-[-0.02em]">{title}</h1>
  <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center gap-1.5 text-sm font-medium text-[#222] underline hover:text-[#717171] transition-colors">
          <Upload size={16} strokeWidth={2} aria-hidden="true" />
          Share
        </button>
        <button className="flex items-center gap-1.5 text-sm font-medium text-[#222] underline hover:text-[#717171] transition-colors">
          <Heart size={16} strokeWidth={2} aria-hidden="true" />
          Save
        </button>
      </div>
    </div>
  )
}