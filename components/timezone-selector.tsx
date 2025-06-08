"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Globe, ChevronDown, Check } from "lucide-react"

interface TimezoneOption {
  value: string
  label: string
  offset: string
  city: string
}

interface TimezoneSelectorProps {
  selectedTimezone: string
  onTimezoneChange: (timezone: string) => void
}

const popularTimezones: TimezoneOption[] = [
  { value: "Europe/Zurich", label: "Central European Time", offset: "GMT+1", city: "Zurich" },
  { value: "Europe/London", label: "Greenwich Mean Time", offset: "GMT+0", city: "London" },
  { value: "America/New_York", label: "Eastern Time", offset: "GMT-5", city: "New York" },
  { value: "America/Los_Angeles", label: "Pacific Time", offset: "GMT-8", city: "Los Angeles" },
  { value: "America/Chicago", label: "Central Time", offset: "GMT-6", city: "Chicago" },
  { value: "Asia/Tokyo", label: "Japan Standard Time", offset: "GMT+9", city: "Tokyo" },
  { value: "Asia/Hong_Kong", label: "Hong Kong Time", offset: "GMT+8", city: "Hong Kong" },
  { value: "Asia/Singapore", label: "Singapore Time", offset: "GMT+8", city: "Singapore" },
  { value: "Asia/Dubai", label: "Gulf Standard Time", offset: "GMT+4", city: "Dubai" },
  { value: "Australia/Sydney", label: "Australian Eastern Time", offset: "GMT+11", city: "Sydney" },
  { value: "Europe/Paris", label: "Central European Time", offset: "GMT+1", city: "Paris" },
  { value: "Europe/Frankfurt", label: "Central European Time", offset: "GMT+1", city: "Frankfurt" },
]

const isValidTimezone = (timezone: string): boolean => {
  if (!timezone) return false
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone })
    return true
  } catch {
    return false
  }
}

export default function TimezoneSelector({ selectedTimezone, onTimezoneChange }: TimezoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [detectedTimezone, setDetectedTimezone] = useState<string>("")

  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect user's timezone with fallback
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (isValidTimezone(userTimezone)) {
        setDetectedTimezone(userTimezone)

        // Set default timezone if none selected
        if (!selectedTimezone || !isValidTimezone(selectedTimezone)) {
          onTimezoneChange(userTimezone)
        }
      } else {
        // Fallback to UTC if detection fails
        setDetectedTimezone("UTC")
        if (!selectedTimezone || !isValidTimezone(selectedTimezone)) {
          onTimezoneChange("UTC")
        }
      }
    } catch {
      // Fallback to UTC if everything fails
      setDetectedTimezone("UTC")
      if (!selectedTimezone || !isValidTimezone(selectedTimezone)) {
        onTimezoneChange("UTC")
      }
    }
  }, [selectedTimezone, onTimezoneChange])

  useEffect(() => {
    if (isOpen && optionsRef.current) {
      gsap.fromTo(
        optionsRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      )
    }
  }, [isOpen])

  const getCurrentOffset = (timezone: string) => {
    if (!timezone || !isValidTimezone(timezone)) {
      return "GMT+0"
    }

    try {
      const now = new Date()
      const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      const targetTime = new Date(utc.toLocaleString("en-US", { timeZone: timezone }))
      const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60)
      const sign = offset >= 0 ? "+" : ""
      return `GMT${sign}${Math.round(offset)}`
    } catch {
      return "GMT+0"
    }
  }

  const getSelectedTimezoneInfo = () => {
    const validTimezone = isValidTimezone(selectedTimezone) ? selectedTimezone : "UTC"
    const timezone = popularTimezones.find((tz) => tz.value === validTimezone)

    if (timezone) {
      return {
        ...timezone,
        offset: getCurrentOffset(timezone.value),
      }
    }

    // If not in popular list, create info from timezone string
    return {
      value: validTimezone,
      label: validTimezone.replace(/_/g, " "),
      offset: getCurrentOffset(validTimezone),
      city: validTimezone.split("/")[1]?.replace(/_/g, " ") || validTimezone,
    }
  }

  const filteredTimezones = popularTimezones.filter(
    (timezone) =>
      timezone.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timezone.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedInfo = getSelectedTimezoneInfo()

  const handleTimezoneSelect = (timezone: string) => {
    if (isValidTimezone(timezone)) {
      onTimezoneChange(timezone)
      setIsOpen(false)
      setSearchTerm("")
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const getCurrentTime = () => {
    const validTimezone = isValidTimezone(selectedTimezone) ? selectedTimezone : "UTC"
    try {
      return new Date().toLocaleString("en-US", {
        timeZone: validTimezone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    } catch {
      return (
        new Date().toLocaleString("en-US", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        }) + " UTC"
      )
    }
  }

  return (
    <div className="space-y-2">
      <label className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]">Timezone</label>

      <div ref={dropdownRef} className="relative">
        {/* Selected Timezone Display */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-graphite border border-dark px-4 py-4 text-left text-ivory hover:border-accent focus:border-accent focus:outline-none transition-colors font-body-refined flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-silver" />
            <div>
              <div className="text-ivory">{selectedInfo.city}</div>
              <div className="text-xs text-silver">{selectedInfo.offset}</div>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-silver transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            ref={optionsRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-charcoal border border-dark shadow-refined-dark max-h-80 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-dark">
              <input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-graphite border border-dark px-3 py-2 text-ivory placeholder-silver focus:border-accent focus:outline-none transition-colors font-body-refined text-sm"
              />
            </div>

            {/* Auto-detected timezone */}
            {detectedTimezone && isValidTimezone(detectedTimezone) && detectedTimezone !== selectedTimezone && (
              <div className="border-b border-dark">
                <button
                  type="button"
                  onClick={() => handleTimezoneSelect(detectedTimezone)}
                  className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div>
                        <div className="text-ivory font-body-refined">
                          {detectedTimezone.split("/")[1]?.replace(/_/g, " ")} (Detected)
                        </div>
                        <div className="text-xs text-silver">{getCurrentOffset(detectedTimezone)}</div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Timezone Options */}
            <div className="max-h-60 overflow-y-auto">
              {filteredTimezones.map((timezone) => (
                <button
                  key={timezone.value}
                  type="button"
                  onClick={() => handleTimezoneSelect(timezone.value)}
                  className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {selectedTimezone === timezone.value && <Check className="w-4 h-4 text-accent" />}
                      </div>
                      <div>
                        <div className="text-ivory font-body-refined">{timezone.city}</div>
                        <div className="text-xs text-silver">{getCurrentOffset(timezone.value)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-silver opacity-0 group-hover:opacity-100 transition-opacity">
                      {timezone.label}
                    </div>
                  </div>
                </button>
              ))}

              {filteredTimezones.length === 0 && (
                <div className="px-4 py-6 text-center text-silver">
                  <div className="text-sm">No timezones found</div>
                  <div className="text-xs mt-1">Try searching for a different city</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Current Time Display */}
      <div className="bg-graphite border border-dark p-3 text-center">
        <div className="text-xs text-platinum uppercase tracking-[0.1em] mb-1">Current Time</div>
        <div className="text-accent font-body-medium">{getCurrentTime()}</div>
      </div>
    </div>
  )
}
