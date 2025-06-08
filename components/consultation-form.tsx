"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, Check, Mail, User, MapPin, MessageSquare } from "lucide-react"
import AppointmentCalendar from "@/components/appointment-calendar"
import TimezoneSelector from "@/components/timezone-selector"

interface ConsultationFormProps {
  isOpen: boolean
  onClose: () => void
  formType: "private-viewing" | "private-consultation" | "book-consultation" | "learn-more"
}

const formTitles = {
  "private-viewing": "Schedule Private Viewing",
  "private-consultation": "Private Consultation",
  "book-consultation": "Book Private Consultation",
  "learn-more": "Learn More About Platonx",
}

const formDescriptions = {
  "private-viewing": "Experience our exclusive timepieces in the privacy of our Geneva atelier.",
  "private-consultation": "Receive personalized guidance from our horological experts.",
  "book-consultation": "Schedule a comprehensive consultation to explore our complete collection.",
  "learn-more": "Discover the heritage and craftsmanship behind Platonx timepieces.",
}

export default function ConsultationForm({ isOpen, onClose, formType }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    address: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [useCalendar, setUseCalendar] = useState(true)

  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      document.body.style.overflow = "hidden"

      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)", delay: 0.1 },
      )
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
      })
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            preferredDate: "",
            preferredTime: "",
            timezone: "",
            address: "",
            message: "",
          })
          setErrors({})
          onClose()
        },
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate email sending (in real app, this would be an API call)
      const emailData = {
        to: "raafarms8@gmail.com",
        subject: `Platonx ${formTitles[formType]} Request`,
        body: `
          New ${formTitles[formType]} request:
          
          Name: ${formData.name}
          Email: ${formData.email}
          Preferred Date: ${formData.preferredDate || "Not specified"}
          Preferred Time: ${formData.preferredTime || "Not specified"}
          Timezone: ${formData.timezone || "Not specified"}
          Address: ${formData.address || "Not provided"}
          Message: ${formData.message || "No additional message"}
          
          Form Type: ${formType}
          Submitted: ${new Date().toLocaleString()}
        `,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Email would be sent:", emailData)

      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error sending email:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleTimezoneChange = (timezone: string) => {
    setFormData((prev) => ({ ...prev, timezone }))
  }

  const handleDateTimeSelect = (date: string, time: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDate: date,
      preferredTime: time,
    }))
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-2xl bg-charcoal border border-dark shadow-dark overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-silver hover:text-accent transition-colors z-10"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-dark">
          <div className="inline-flex items-center space-x-3 bg-graphite border-dark px-4 py-2 mb-4">
            <div className="w-1 h-1 bg-accent"></div>
            <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">
              Exclusive Service
            </span>
          </div>

          <h2 className="font-display-light text-2xl lg:text-3xl text-accent mb-3 text-glow-accent">
            {formTitles[formType]}
          </h2>

          <p className="font-body-refined text-pearl leading-relaxed">{formDescriptions[formType]}</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]"
                >
                  Name <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-silver">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-graphite border ${errors.name ? "border-red-500" : "border-dark"} pl-12 pr-4 py-4 text-ivory placeholder-silver focus:border-accent focus:outline-none transition-colors font-body-refined`}
                    placeholder="Your full name"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm font-body-refined">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]"
                >
                  Email <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-silver">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-graphite border ${errors.email ? "border-red-500" : "border-dark"} pl-12 pr-4 py-4 text-ivory placeholder-silver focus:border-accent focus:outline-none transition-colors font-body-refined`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm font-body-refined">{errors.email}</p>}
              </div>

              {/* Calendar Integration with Timezone */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body-refined text-sm text-platinum uppercase tracking-[0.1em]">
                    Appointment Scheduling
                  </span>
                  <button
                    type="button"
                    onClick={() => setUseCalendar(!useCalendar)}
                    className="text-xs text-accent hover:text-ivory transition-colors"
                  >
                    {useCalendar ? "Use Manual Entry" : "Use Calendar"}
                  </button>
                </div>

                {/* Timezone Selector */}
                <TimezoneSelector selectedTimezone={formData.timezone} onTimezoneChange={handleTimezoneChange} />

                {useCalendar ? (
                  <AppointmentCalendar
                    onDateTimeSelect={handleDateTimeSelect}
                    selectedDate={formData.preferredDate}
                    selectedTime={formData.preferredTime}
                    timezone={formData.timezone}
                  />
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Manual Date Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="preferredDate"
                        className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]"
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full bg-graphite border border-dark px-4 py-4 text-ivory focus:border-accent focus:outline-none transition-colors font-body-refined"
                      />
                    </div>

                    {/* Manual Time Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="preferredTime"
                        className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]"
                      >
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full bg-graphite border border-dark px-4 py-4 text-ivory focus:border-accent focus:outline-none transition-colors font-body-refined"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]"
                >
                  Address <span className="text-silver text-xs normal-case">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-silver">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-graphite border border-dark pl-12 pr-4 py-4 text-ivory placeholder-silver focus:border-accent focus:outline-none transition-colors font-body-refined resize-none"
                    placeholder="Your address (for private viewings)"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block font-body-refined text-sm text-platinum uppercase tracking-[0.1em]"
                >
                  Additional Message <span className="text-silver text-xs normal-case">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-silver">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-graphite border border-dark pl-12 pr-4 py-4 text-ivory placeholder-silver focus:border-accent focus:outline-none transition-colors font-body-refined resize-none"
                    placeholder="Tell us about your preferences or any specific requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-dark-luxury py-4 text-base relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking Appointment...</span>
                    </div>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <div className="pt-2">
                <p className="font-body-refined text-xs text-silver leading-relaxed text-center">
                  Your appointment will be confirmed within 2 hours. All information is kept strictly confidential.
                </p>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-accent" />
              </div>

              <div className="space-y-3">
                <h3 className="font-display-light text-xl text-accent text-glow-accent">Appointment Booked</h3>
                <p className="font-body-refined text-pearl leading-relaxed">
                  Thank you for booking with Platonx. We have received your appointment request and will confirm your
                  slot within 2 hours.
                </p>
                {formData.preferredDate && formData.preferredTime && (
                  <div className="bg-graphite border border-accent/30 p-4 rounded">
                    <p className="font-body-refined text-accent">
                      Requested:{" "}
                      {new Date(formData.preferredDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at {formData.preferredTime}
                    </p>
                    {formData.timezone && (
                      <p className="font-body-refined text-sm text-silver mt-1">Timezone: {formData.timezone}</p>
                    )}
                  </div>
                )}
                <p className="font-body-refined text-sm text-silver">
                  A confirmation email has been sent to {formData.email}.
                </p>
              </div>

              <div className="pt-4">
                <button onClick={handleClose} className="btn-outline-dark px-8 py-3">
                  Continue Exploring
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-accent opacity-50"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-accent opacity-50"></div>
      </div>
    </div>
  )
}
