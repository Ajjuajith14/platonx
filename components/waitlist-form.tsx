"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, Check, Mail, User } from "lucide-react"

interface WaitlistFormProps {
  isOpen: boolean
  onClose: () => void
  watchName: string
}

export default function WaitlistForm({ isOpen, onClose, watchName }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Prevent body scroll
      document.body.style.overflow = "hidden"

      // Animate modal entrance
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
          setFormData({ name: "", email: "" })
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
      // Simulate email sending
      const emailData = {
        to: "raafarms8@gmail.com",
        subject: `Platonx Waitlist: ${watchName}`,
        body: `
          New waitlist signup:
          
          Watch: ${watchName}
          Name: ${formData.name}
          Email: ${formData.email}
          
          Submitted: ${new Date().toLocaleString()}
        `,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Email would be sent:", emailData)

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Auto close after success
      setTimeout(() => {
        handleClose()
      }, 2500)
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error sending email:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
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
        className="relative w-full max-w-md bg-charcoal border border-dark shadow-dark overflow-hidden"
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
            <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">Exclusive Access</span>
          </div>

          <h2 className="font-display-light text-2xl lg:text-3xl text-accent mb-3 text-glow-accent">
            Join the Waitlist
          </h2>

          <p className="font-body-refined text-pearl leading-relaxed">
            Be among the first to acquire the <span className="text-accent font-medium">{watchName}</span>. We&apos;ll
            notify you when this exclusive timepiece becomes available.
          </p>
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
                    placeholder="Your name"
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
                      <span>Joining Waitlist...</span>
                    </div>
                  ) : (
                    "Join Exclusive Waitlist"
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <div className="pt-2">
                <p className="font-body-refined text-xs text-silver leading-relaxed text-center">
                  Your information is kept strictly confidential and will only be used to notify you about this
                  exclusive timepiece.
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
                <h3 className="font-display-light text-xl text-accent text-glow-accent">Welcome to the Waitlist</h3>
                <p className="font-body-refined text-pearl leading-relaxed">
                  You&apos;ve been successfully added to the exclusive waitlist for the{" "}
                  <span className="text-accent font-medium">{watchName}</span>.
                </p>
                <p className="font-body-refined text-sm text-silver">
                  We&apos;ll be in touch when this exceptional timepiece becomes available.
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
