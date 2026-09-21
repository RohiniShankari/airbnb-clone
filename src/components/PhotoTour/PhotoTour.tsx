import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Heart, Share } from 'lucide-react'
import type { Photo } from '../../data/listing'

interface PhotoTourProps {
  photos: Photo[]
  initialIndex?: number
  onClose: () => void
  onPhotoClick: (index: number) => void
}

export default function PhotoTour({ photos, initialIndex = 0, onClose, onPhotoClick }: PhotoTourProps) {
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const [isLiked, setIsLiked] = useState(false)

  const roomGroups = useMemo(() => {
    return Object.entries(
      photos.reduce<Record<string, { photo: Photo; index: number }[]>>((acc, photo, i) => {
        const room = photo.room ?? 'Other'
        if (!acc[room]) acc[room] = []
        acc[room].push({ photo, index: i })
        return acc
      }, {})
    )
  }, [photos])

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
    backButtonRef.current?.focus()
    return () => {
      previousFocusRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  useEffect(() => {
    const target = Math.min(Math.max(initialIndex, 0), photos.length - 1)
    const room = photos[target]?.room ?? 'Other'
    requestAnimationFrame(() => {
      sectionRefs.current[room]?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [initialIndex, photos])

  return (
    <AnimatePresence>
      <motion.div
        key="phototour"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Photo tour"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5">
          <div className="relative mb-6 flex items-center justify-start gap-3">
            <button
              ref={backButtonRef}
              onClick={onClose}
              className="flex items-center justify-center rounded-full p-2 text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#222]"
              aria-label="Back to listing"
            >
              <ChevronLeft size={22} strokeWidth={2.5} aria-hidden="true" />
            </button>
            <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-[#222]">Photo tour</h1>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    void navigator.share({ title: 'Photo tour', url: window.location.href })
                  }
                }}
                className="flex items-center justify-center rounded-full p-2 text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#222]"
                aria-label="Share photo tour"
              >
                <Share size={19} strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsLiked((liked) => !liked)}
                className="flex items-center justify-center rounded-full p-2 text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#222]"
                aria-label={isLiked ? 'Remove photo tour from favorites' : 'Add photo tour to favorites'}
                aria-pressed={isLiked}
              >
                <Heart size={19} strokeWidth={2} fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <div className="mb-5">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-8">
                {roomGroups.map(([room, items]) => {
                  const coverItem = items[0]
                  if (!coverItem) return null
                  const cover = coverItem.photo

                  return (
                    <motion.button
                      key={room}
                      type="button"
                      onClick={() => onPhotoClick(coverItem.index)}
                      aria-label={`Open ${room} photo`}
                      className="block w-full overflow-hidden rounded-md border-0 bg-[#F7F7F7] p-0 text-left"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={cover.url}
                        alt={cover.caption}
                        className="block aspect-square w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            `https://placehold.co/400x400/F7F7F7/AAAAAA?text=${encodeURIComponent(room)}`
                        }}
                      />
                      <div className="px-1.5 pb-1 pt-0.5 text-left text-[10px] font-medium text-[#222]">
                        {room}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {roomGroups.map(([room, items]) => (
              <section
                key={room}
                ref={(el) => {
                  sectionRefs.current[room] = el
                }}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-2 gap-8 items-start">
                  <div className="pt-2">
                    <h2 className="text-[22px] font-semibold text-[#222] leading-tight">{room}</h2>
                  </div>

                  <div className="space-y-4">
                    {items.map(({ photo, index }) => (
                      <motion.button
                        key={photo.id}
                        type="button"
                        onClick={() => onPhotoClick(index)}
                        aria-label={`Open ${photo.caption}`}
                        className="block w-full overflow-hidden rounded-xl border-0 bg-[#F7F7F7] p-0 text-left"
                        whileHover={{ scale: 1.002 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="block h-[420px] w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              `https://placehold.co/1200x900/F7F7F7/AAAAAA?text=${encodeURIComponent(photo.caption)}`
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
