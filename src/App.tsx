import { useState } from 'react'
import ListingPage from './components/ListingPage/ListingPage'
import PhotoTour from './components/PhotoTour/PhotoTour'
import Lightbox from './components/Lightbox/Lightbox'
import { listing } from './data/listing'

export type OverlayState =
  | { type: 'none' }
  | { type: 'phototour'; initialIndex?: number }
  | { type: 'lightbox'; initialIndex: number }

export default function App() {
  const [overlay, setOverlay] = useState<OverlayState>({ type: 'none' })

  const openPhotoTour = (initialIndex = 0) => setOverlay({ type: 'phototour', initialIndex })
  const openLightbox = (initialIndex: number) => setOverlay({ type: 'lightbox', initialIndex })
  const closeOverlay = () => setOverlay({ type: 'none' })

  return (
    <>
      <ListingPage
        listing={listing}
        onShowAllPhotos={() => openPhotoTour(0)}
        onPhotoClick={(index) => openPhotoTour(index)}
      />
      {overlay.type === 'phototour' && (
        <PhotoTour
          photos={listing.photos}
          initialIndex={overlay.initialIndex ?? 0}
          onClose={closeOverlay}
          onPhotoClick={openLightbox}
        />
      )}
      {overlay.type === 'lightbox' && (
        <Lightbox
          photos={listing.photos}
          initialIndex={overlay.initialIndex}
          onClose={closeOverlay}
        />
      )}
    </>
  )
}
