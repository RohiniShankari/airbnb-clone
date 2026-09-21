import { useEffect, useState } from 'react'
import { Search, Globe, Menu, Star } from 'lucide-react'

interface NavbarProps {
  rating: number
  reviewCount: number
  title: string
}
export default function Navbar({ }: NavbarProps) {
  const [showCompactNav, setShowCompactNav] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScroll = () => {
      setShowCompactNav(window.scrollY > 360)

      const sections = navItems
        .map((item) => document.getElementById(item.key))
        .filter(Boolean) as HTMLElement[]

      const scrollPosition = window.scrollY + 220
      let current = navItems[0].key

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          current = section.id
        }
      }

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'overview', label: 'Overview', href: '#overview' },
    { key: 'amenities', label: 'Amenities', href: '#amenities' },
    { key: 'reviews', label: 'Reviews', href: '#reviews' },
    { key: 'location', label: 'Location', href: '#location' },
  ]

  const renderNavLinks = (compact = false) => (
    <nav className={compact ? 'flex items-center gap-1 flex-1 justify-center' : 'flex items-center gap-1'} aria-label="Section navigation">
      {navItems.map(({ key, label, href }) => {
        const isActive = activeSection === key

        return (
          <a
            key={key}
            href={href}
            onClick={() => setActiveSection(key)}
            className={[
              'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-[#222] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-[#222]'
                : 'text-[#717171] hover:text-[#222]',
            ].join(' ')}
          >
            {label}
          </a>
        )
      })}
    </nav>
  )

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD]">
      {!showCompactNav ? (
        <div className="max-w-[1440px] mx-auto px-10 h-20 flex items-center justify-between gap-8">

        <a href="/" aria-label="Airbnb home" className="flex-shrink-0 flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="w-9 h-9 fill-[#FF385C]" aria-hidden="true">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.204 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.63l-.28.023-.307.013C5.765 31 2.88 28.614 2.88 24.533l.002-.233.01-.408c.05-.963.244-1.838.928-3.492l.145-.353c.973-2.268 5.076-11.085 7.015-14.87l.356-.67C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.607 1.76-.654 2.558l-.01.402-.001.218c0 2.646 1.933 4.479 4.458 4.479 1.758 0 3.858-1.088 5.797-3.15l.383-.416.112-.124.115.13c1.977 2.187 4.054 3.358 5.824 3.548l.257.018.22.006c2.526 0 4.457-1.833 4.457-4.479l-.001-.218-.01-.402c-.047-.798-.227-1.487-.654-2.558l-.344-.836c-.983-2.29-5.17-11.033-7.066-14.735l-.344-.658C18.052 3.539 17.238 3 16 3z" />
          </svg>
          <span className="text-[#FF385C] font-bold text-xl tracking-tight hidden lg:block">airbnb</span>
        </a>

        <div className="flex-1 flex justify-center">
          <button
            className="flex items-center border border-[#DDDDDD] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow duration-200 divide-x divide-[#DDDDDD] overflow-hidden"
            aria-label="Search: Anywhere, Anytime, Add guests"
          >
            <span className="flex items-center gap-2 px-4 py-3">
              <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
                <path d="M16 1C7.716 1 1 7.716 1 16s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 2c7.18 0 13 5.82 13 13S23.18 29 16 29 3 23.18 3 16 8.82 3 16 3zm0 3a2 2 0 100 4 2 2 0 000-4zm0 7c-3.314 0-6 2.686-6 6h2c0-2.21 1.79-4 4-4s4 1.79 4 4h2c0-3.314-2.686-6-6-6z" fill="#FF385C" />
              </svg>
            </span>
            <span className="px-5 py-3 text-sm font-semibold text-[#222] whitespace-nowrap">Anywhere</span>
            <span className="px-5 py-3 text-sm font-semibold text-[#222] whitespace-nowrap">Anytime</span>
            <span className="flex items-center gap-3 pl-5 pr-3 py-2">
              <span className="text-sm text-[#717171] whitespace-nowrap">Add guests</span>
              <span className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0">
                <Search size={14} className="text-white" strokeWidth={3} aria-hidden="true" />
              </span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <a
            href="#"
            className="text-sm font-medium [font-weight:550] text-[#222] px-4 py-3 rounded-full hover:bg-[#F7F7F7] transition-colors whitespace-nowrap"
          >
            Become a host
          </a>
          <button
className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EEEEEE] hover:bg-[#E0E0E0] transition-colors"         aria-label="Choose language and currency"
          >
            <Globe size={18} strokeWidth={1.75} className="text-[#222]" aria-hidden="true" />
          </button>

          <button
className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EEEEEE] hover:bg-[#E0E0E0] transition-colors"
            aria-haspopup="true"
          >
            <Menu size={16} strokeWidth={1.75} className="text-[#222]" aria-hidden="true" />
          </button>
        </div>

      </div>
      ) : (
        <div className="max-w-[1280px] mx-auto px-20 h-16 flex items-center justify-between gap-4">
          

          {renderNavLinks(true)}

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col text-sm leading-snug">
            <span className="font-semibold text-[#222]">
              ₹28,499 <span className="font-normal">for 5 nights</span>
            </span>
            <span className="flex items-center gap-1 text-[#222]">
              <Star size={12} className="fill-[#222] stroke-none" aria-hidden="true" />
              <span className="font-semibold">4.95</span>
              <span className="text-[#717171]">· 19 reviews</span>
            </span>
          </div>

          <button className="bg-gradient-to-r from-[#E61E4D] to-[#BD1E59] hover:opacity-90 text-white text-sm font-semibold px-6 py-3 rounded-full transition-opacity whitespace-nowrap">
            Reserve
          </button>
        </div>
        </div>
      )}
    </header>
  )
}
