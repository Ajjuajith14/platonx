"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import ConsultationForm from "@/components/consultation-form"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [consultationType, setConsultationType] = useState<
    "private-viewing" | "private-consultation" | "book-consultation" | "learn-more"
  >("private-viewing")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline({ delay: 0.5 })

      // Dark luxury entrance
      tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })
        .fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
          "-=1",
        )
        .fromTo(
          ".hero-element",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" },
          "-=0.8",
        )
    }
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById("about")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToWatches = () => {
    const watchesSection = document.getElementById("watches")
    if (watchesSection) {
      watchesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleConsultationClick = (
    type: "private-viewing" | "private-consultation" | "book-consultation" | "learn-more",
  ) => {
    setConsultationType(type)
    setIsConsultationOpen(true)
  }

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen bg-dark-gradient overflow-hidden">
      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/Pt1.jpg"
          alt="Platonx luxury platinum watch background"
          fill
          className="object-cover opacity-20"
          style={{
            filter: "contrast(1.2) saturate(0.8) brightness(0.7)",
          }}
          priority
        />
      </div>

      {/* Dark luxury background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent via-transparent to-platinum"></div>
      </div>

      {/* Floating dark elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border border-accent rotate-45 float-elegant"></div>
        <div
          className="absolute bottom-20 right-20 w-64 h-64 border border-platinum rotate-12 float-elegant"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen">
        {/* Increased bottom padding on mobile */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-24 pb-36 md:pb-32 lg:pb-40">
          {/* Ultra-refined Dark Logo and Content - Full width on mobile */}
          <div className="space-y-8 lg:space-y-12 relative z-10">
            {/* Dark Badge */}
            <div className="hero-element inline-flex items-center space-x-3 bg-charcoal border-dark px-6 py-3">
              <div className="w-1 h-1 bg-accent"></div>
              <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">
                Swiss Manufacture
              </span>
            </div>

            {/* Hero Title - Dark Ultra Typography */}
            <div ref={titleRef} className="space-y-6">
              <h1 className="font-display-ultra text-mobile-hero lg:text-desktop-hero text-accent leading-none text-glow-accent">
                PLATONX
              </h1>
              <div className="w-16 h-px bg-accent"></div>
            </div>

            {/* Dark Refined Subtitle */}
            <div className="space-y-6">
              <p className="font-display-light text-mobile-display lg:text-desktop-display text-ivory leading-tight max-w-lg">
                Architectural precision meets horological mastery
              </p>
              <p className="font-body-refined text-mobile-body lg:text-lg text-pearl max-w-md leading-relaxed">
                Discover timepieces that transcend functionality to become statements of uncompromising excellence and
                Swiss craftsmanship.
              </p>
            </div>

            {/* Dark Luxury CTAs */}
            <div className="hero-element flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4">
              <button onClick={scrollToWatches} className="btn-dark-luxury">
                Explore Collection
              </button>
              <button onClick={() => handleConsultationClick("private-viewing")} className="btn-outline-dark">
                Private Viewing
              </button>
            </div>

            {/* Dark Stats - Added more bottom margin on mobile */}
            <div className="hero-element grid grid-cols-3 gap-8 pt-12 lg:pt-16 mb-12 md:mb-0 lg:mb-16">
              {[
                { number: "99.95%", label: "Pure Platinum" },
                { number: "168h", label: "Craft Time" },
                { number: "50+", label: "Patents" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display-light text-2xl lg:text-3xl text-accent mb-2 text-glow-accent">
                    {stat.number}
                  </div>
                  <div className="font-body-refined text-xs text-platinum uppercase tracking-[0.15em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ultra-premium Image Presentation - Hidden on mobile, reduced height */}
          <div className="relative hidden lg:block">
            <div ref={imageRef} className="relative">
              {/* Main Image with Dark Frame - Reduced height */}
              <div className="relative aspect-[4/4.5] bg-charcoal shadow-dark overflow-hidden">
                <Image
                  src="/images/Pt1.jpg"
                  alt="Platonx luxury platinum watch"
                  fill
                  className="object-cover"
                  style={{
                    filter: "contrast(1.2) saturate(0.8) brightness(0.9)",
                  }}
                  priority
                />
                <div className="absolute inset-0 bg-depth-gradient"></div>
              </div>

              {/* Dark Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border border-accent float-elegant"></div>
              <div
                className="absolute -bottom-4 -right-4 w-12 h-12 border border-platinum float-elegant"
                style={{ animationDelay: "2s" }}
              ></div>

              {/* Dark Accent Lines */}
              <div className="absolute top-0 right-0 w-px h-16 bg-accent"></div>
              <div className="absolute bottom-0 left-0 w-16 h-px bg-accent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Scroll Indicator - Improved positioning and functionality */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 lg:bottom-10">
        <div className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em] mb-2">Discover</div>
        <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent mb-2"></div>
        <button
          onClick={scrollToNext}
          className="w-10 h-10 flex items-center justify-center hover:bg-accent/10 rounded-full transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to next section"
        >
          <ArrowDown className="w-4 h-4 text-accent animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        formType={consultationType}
      />
    </section>
  )
}
