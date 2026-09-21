import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react'
import type { Photo } from '../../data/listing'

interface LightboxProps {
  photos: Photo[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState<1 | -1>(1)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setDirection(1)
      setCurrentIndex((i) => i + 1)
    }
  }, [currentIndex, photos.length])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  // Save and restore focus
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()
    return () => {
      previousFocusRef.current?.focus()
    }
  }, [])

  // Keyboard navigation + prevent body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handler)
    }
  }, [onClose, goNext, goPrev])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  const photo = photos[currentIndex]

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${photos.length}: ${photo.caption}`}
    >
      {/* Top bar */}
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-[#DDDDDD] px-6">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="flex items-center justify-center rounded-full p-2 text-[#222] hover:bg-[#F7F7F7] transition-colors focus-visible:outline-2 focus-visible:outline-[#222]"
          aria-label="Back to photo tour"
        >
          <Grid3X3 size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <h1 className="text-base font-semibold text-[#222]">{photo.room ?? 'Photo'}</h1>

        <div className="flex items-center gap-1">
          <span className="mr-3 text-sm font-medium text-[#222]" aria-live="polite">{currentIndex + 1} of {photos.length}</span>
          <button onClick={onClose} className="flex items-center justify-center rounded-full p-2 text-[#222] hover:bg-[#F7F7F7] transition-colors" aria-label="Close lightbox">
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Photo area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-20 py-8">
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="absolute left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#222] bg-white text-[#222] hover:bg-[#F7F7F7] disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-[#222]"
          aria-label="Previous photo"
        >
          <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        {/* Image with slide animation */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="max-h-full max-w-full select-none object-contain"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://placehold.co/1200x800/111111/555555?text=${encodeURIComponent(photo.caption)}`
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          disabled={currentIndex === photos.length - 1}
          className="absolute right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#222] bg-white text-[#222] hover:bg-[#F7F7F7] disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-[#222]"
          aria-label="Next photo"
        >
          <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Caption bar */}
      <div className="flex-shrink-0 px-6 py-4 text-center text-sm text-[#717171]">{photo.caption}</div>
    </motion.div>
  )
}
