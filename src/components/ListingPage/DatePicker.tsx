import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  pricePerNight: number
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const today = new Date()
const referenceCheckIn = new Date(2026, 9, 18)
const referenceCheckOut = new Date(2026, 9, 23)

export default function DatePicker({ pricePerNight: _pricePerNight }: DatePickerProps) {
  const [leftMonth, setLeftMonth] = useState(referenceCheckIn.getMonth())
  const [leftYear, setLeftYear] = useState(referenceCheckIn.getFullYear())
  const [checkIn, setCheckIn] = useState<Date | null>(referenceCheckIn)
  const [checkOut, setCheckOut] = useState<Date | null>(referenceCheckOut)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear

  const prevMonth = () => {
    if (leftMonth === 0) {
      setLeftMonth(11)
      setLeftYear((y) => y - 1)
    } else {
      setLeftMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (leftMonth === 11) {
      setLeftMonth(0)
      setLeftYear((y) => y + 1)
    } else {
      setLeftMonth((m) => m + 1)
    }
  }

  const handleDayClick = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date)
      setCheckOut(null)
    } else {
      if (date < checkIn) {
        setCheckOut(checkIn)
        setCheckIn(date)
      } else {
        setCheckOut(date)
      }
    }
  }

  const isInRange = (date: Date) => {
    if (checkIn && !checkOut && hoveredDate) {
      const [start, end] = hoveredDate > checkIn ? [checkIn, hoveredDate] : [hoveredDate, checkIn]
      return date > start && date < end
    }
    if (checkIn && checkOut) {
      return date > checkIn && date < checkOut
    }
    return false
  }

  const isStart = (date: Date) => checkIn?.toDateString() === date.toDateString()
  const isEnd = (date: Date) => checkOut?.toDateString() === date.toDateString()
  const isPast = (date: Date) => date < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const clearDates = () => {
    setCheckIn(null)
    setCheckOut(null)
    setHoveredDate(null)
  }

  const formatDate = (d: Date | null) => {
    if (!d) return 'Add dates'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const nights = checkIn && checkOut
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  function renderMonth(year: number, month: number) {
    const days = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const cells: React.ReactNode[] = []

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />)
    }
    for (let d = 1; d <= days; d++) {
      const date = new Date(year, month, d)
      const past = isPast(date)
      const start = isStart(date)
      const end = isEnd(date)
      const inRange = isInRange(date)
      cells.push(
        <button
          key={d}
          disabled={past}
          onClick={() => !past && handleDayClick(date)}
          onMouseEnter={() => !past && setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
          className={[
            'relative h-10 w-full text-sm rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#222]',
            past ? 'text-[#DDDDDD] cursor-not-allowed line-through' : 'cursor-pointer',
            start || end ? 'bg-[#222] text-white font-semibold' : '',
            inRange && !start && !end ? 'bg-[#F7F7F7] rounded-none text-[#222]' : '',
            !past && !start && !end && !inRange ? 'hover:bg-[#F7F7F7] text-[#222]' : '',
          ].join(' ')}
          aria-label={date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          aria-pressed={start || end}
        >
          {d}
        </button>
      )
    }

    return (
      <div>
        <p className="text-center text-sm font-semibold text-[#222] mb-4">
          {MONTHS[month]} {year}
        </p>
        <div className="grid grid-cols-7 gap-y-1 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="text-xs text-[#717171] font-medium">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">{cells}</div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-[#222]">
          {nights > 0 ? `${nights} nights in Candolim` : 'Select check-in date'}
        </h2>
        {(checkIn || checkOut) && (
          <button
            onClick={clearDates}
            className="text-sm underline font-medium text-[#222] hover:text-[#717171] transition-colors"
          >
            Clear dates
          </button>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#717171]">
          {checkIn && checkOut
            ? `${checkIn.getDate()} ${MONTHS[checkIn.getMonth()].slice(0, 3)} ${checkIn.getFullYear()} - ${checkOut.getDate()} ${MONTHS[checkOut.getMonth()].slice(0, 3)} ${checkOut.getFullYear()}`
            : `${formatDate(checkIn)} - ${formatDate(checkOut)}`}
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-12">
          <div className="flex-1">{renderMonth(leftYear, leftMonth)}</div>
          <div className="flex-1">{renderMonth(rightYear, rightMonth)}</div>
        </div>
        <button
          onClick={prevMonth}
          className="absolute left-0 top-0 p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={nextMonth}
          className="absolute right-0 top-0 p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
