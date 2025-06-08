"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight, Clock, CalendarIcon, Check } from "lucide-react"

interface AppointmentCalendarProps {
  onDateTimeSelect: (date: string, time: string) => void
  selectedDate?: string
  selectedTime?: string
  timezone: string
}

interface TimeSlot {
  time: string
  available: boolean
  localTime?: string
}

const baseTimeSlots: Omit<TimeSlot, "localTime">[] = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const isValidTimezone = (timezone: string): boolean => {
  if (!timezone) return false
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone })
    return true
  } catch {
    return false
  }
}

export default function AppointmentCalendar({
  onDateTimeSelect,
  selectedDate,
  selectedTime,
  timezone,
}: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDateState, setSelectedDateState] = useState<string>(selectedDate || "")
  const [selectedTimeState, setSelectedTimeState] = useState<string>(selectedTime || "")
  const [showTimeSlots, setShowTimeSlots] = useState(false)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

  const calendarRef = useRef<HTMLDivElement>(null)
  const timeSlotsRef = useRef<HTMLDivElement>(null)

  // Convert Geneva time slots to user's timezone
  useEffect(() => {
    const validTimezone = isValidTimezone(timezone) ? timezone : "UTC"

    const convertedSlots = baseTimeSlots.map((slot) => {
      try {
        // Create a date for today with the Geneva time
        const today = new Date()
        const genevaDateTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          Number.parseInt(slot.time.split(":")[0]),
          Number.parseInt(slot.time.split(":")[1]),
        )

        // Convert to user's timezone
        const userTimeString = genevaDateTime.toLocaleString("en-US", {
          timeZone: validTimezone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })

        return {
          ...slot,
          localTime: userTimeString,
        }
      } catch {
        return {
          ...slot,
          localTime: slot.time,
        }
      }
    })

    setTimeSlots(convertedSlots)
  }, [timezone])

  useEffect(() => {
    if (showTimeSlots && timeSlotsRef.current) {
      gsap.fromTo(
        timeSlotsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
      )
    }
  }, [showTimeSlots])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Only allow future dates and exclude weekends for this luxury service
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6
  }

  const formatDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toISOString().split("T")[0]
  }

  const handleDateSelect = (day: number) => {
    if (!isDateAvailable(day)) return

    const dateString = formatDate(day)
    setSelectedDateState(dateString)
    setShowTimeSlots(true)

    // If time was already selected, maintain the selection
    if (selectedTimeState) {
      onDateTimeSelect(dateString, selectedTimeState)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTimeState(time)
    if (selectedDateState) {
      onDateTimeSelect(selectedDateState, time)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
    setShowTimeSlots(false)
  }

  const getTimezoneAbbreviation = (timezone: string) => {
    const validTimezone = isValidTimezone(timezone) ? timezone : "UTC"
    try {
      const date = new Date()
      const timeString = date.toLocaleString("en-US", {
        timeZone: validTimezone,
        timeZoneName: "short",
      })
      return timeString.split(" ").pop() || "UTC"
    } catch {
      return "UTC"
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDateAvailable(day)
      const isSelected = selectedDateState === formatDate(day)

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={!isAvailable}
          className={`
            aspect-square flex items-center justify-center text-sm font-body-refined transition-all duration-300 relative
            ${
              isAvailable
                ? "text-ivory hover:bg-accent hover:text-obsidian cursor-pointer"
                : "text-silver/30 cursor-not-allowed"
            }
            ${isSelected ? "bg-accent text-obsidian shadow-lg" : "hover:bg-accent/20"}
          `}
        >
          {day}
          {isSelected && <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-5 h-5 text-accent" />
          <span className="font-body-refined text-sm text-platinum uppercase tracking-[0.1em]">Select Date & Time</span>
        </div>
        <div className="text-xs text-silver">Times shown in {getTimezoneAbbreviation(timezone)}</div>
      </div>

      {/* Calendar */}
      <div ref={calendarRef} className="bg-graphite border border-dark p-6 space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="w-8 h-8 flex items-center justify-center text-silver hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h3 className="font-display-light text-lg text-accent">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>

          <button
            onClick={() => navigateMonth("next")}
            className="w-8 h-8 flex items-center justify-center text-silver hover:text-accent transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="aspect-square flex items-center justify-center text-xs font-body-refined text-platinum uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-dark">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-silver">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-silver/30 rounded-full"></div>
            <span className="text-xs text-silver">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {showTimeSlots && selectedDateState && (
        <div ref={timeSlotsRef} className="bg-graphite border border-dark p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-body-refined text-sm text-platinum uppercase tracking-[0.1em]">
                Available Times
              </span>
            </div>
            <div className="text-xs text-silver">Geneva Time → Your Time</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`
                  p-4 text-sm font-body-refined transition-all duration-300 relative border
                  ${
                    slot.available
                      ? "text-ivory hover:bg-accent hover:text-obsidian border-dark hover:border-accent"
                      : "text-silver/30 border-silver/20 cursor-not-allowed"
                  }
                  ${selectedTimeState === slot.time ? "bg-accent text-obsidian border-accent" : "bg-charcoal"}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-medium">{slot.time} CET</div>
                    <div className="text-xs opacity-75">
                      {slot.localTime} {getTimezoneAbbreviation(timezone)}
                    </div>
                  </div>
                  {selectedTimeState === slot.time && <Check className="w-4 h-4" />}
                </div>
              </button>
            ))}
          </div>

          {selectedDateState && selectedTimeState && (
            <div className="mt-6 p-4 bg-charcoal border border-accent/30 rounded">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-body-medium text-accent">Appointment Selected</div>
                  <div className="font-body-refined text-sm text-pearl">
                    {new Date(selectedDateState).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {timeSlots.find((slot) => slot.time === selectedTimeState)?.localTime}{" "}
                    {getTimezoneAbbreviation(timezone)}
                  </div>
                  <div className="font-body-refined text-xs text-silver mt-1">Geneva time: {selectedTimeState} CET</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
