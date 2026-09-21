import { motion } from 'framer-motion'
import type { Photo } from '../../data/listing'

interface HeroGridProps {
  photos: Photo[]
  onShowAllPhotos: () => void
  onPhotoClick: (index: number) => void
}

export default function HeroGrid({ photos, onShowAllPhotos, onPhotoClick }: HeroGridProps) {
  const displayed = photos.slice(0, 5)

  return (
    <div className="relative max-w-[1280px] mx-auto px-20 mt-6">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-xl overflow-hidden">
        <motion.button
          className="col-span-2 row-span-2 relative overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222]"
          onClick={() => onPhotoClick(0)}
          whileHover="hover"
          aria-label={`View photo 1: ${displayed[0]?.caption}`}
        >
          <motion.img
            src={displayed[0]?.url}
            alt={displayed[0]?.caption}
            className="w-full h-full object-cover bg-[#F7F7F7]"
            variants={{ hover: { scale: 1.03 } }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://placehold.co/1200x800/F7F7F7/AAAAAA?text=${encodeURIComponent(displayed[0]?.caption ?? 'Photo')}`
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </motion.button>

        {displayed.slice(1, 5).map((photo, i) => (
          <motion.button
            key={photo.id}
            className={`relative overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222] ${
              i === 1 ? 'rounded-tr-none' : ''
            }`}
            onClick={() => onPhotoClick(i + 1)}
            whileHover="hover"
            aria-label={`View photo ${i + 2}: ${photo.caption}`}
          >
            <motion.img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover bg-[#F7F7F7]"
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://placehold.co/800x600/F7F7F7/AAAAAA?text=${encodeURIComponent(photo.caption)}`
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      <button
        onClick={onShowAllPhotos}
        className="absolute bottom-6 right-24 flex items-center gap-2 bg-white text-[#222] text-sm font-medium px-4 py-2.5 rounded-lg border border-[#222] hover:bg-[#F7F7F7] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#222] focus-visible:outline-offset-2"
        aria-label="Show all photos"
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
          <path
            d="M3 1h10a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H3zm2.5 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm5.56 2.56L14 11H2l3.5-4.5 2.5 3z"
            fill="currentColor"
          />
        </svg>
        Show all photos
      </button>
    </div>
  )
}
