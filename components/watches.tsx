"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import WaitlistForm from "@/components/waitlist-form"
import ConsultationForm from "@/components/consultation-form"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const watches = [
  {
    id: 1,
    name: "Geometric Elite",
    series: "Architecture Series",
    price: "125,000",
    currency: "USD",
    limited: "Limited to 50 pieces",
    slug: "geometric-elite",
    image: "/images/Pt1.jpg",
    features: ["Geometric Case Design", "Ultra-thin Movement", "Platinum Bracelet"],
    description: "A masterpiece of architectural precision and horological excellence.",
  },
  {
    id: 2,
    name: "Minimalist Master",
    series: "Bauhaus Collection",
    price: "185,000",
    currency: "USD",
    limited: "Limited to 25 pieces",
    slug: "minimalist-master",
    image: "/images/pt4.jpg",
    features: ["Clean Line Aesthetics", "Precision Engineering", "Architectural Dial"],
    description: "Where minimalist design meets Swiss manufacturing excellence.",
  },
  {
    id: 3,
    name: "Structural Unique",
    series: "Avant-garde Line",
    price: "350,000",
    currency: "USD",
    limited: "Unique piece",
    slug: "structural-unique",
    image: "/images/pt7.jpg",
    features: ["Deconstructed Design", "Visible Movement", "Platinum Innovation"],
    description: "An avant-garde expression of horological artistry and innovation.",
  },
]

export default function Watches() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredWatch, setHoveredWatch] = useState<number | null>(null)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [selectedWatch, setSelectedWatch] = useState<string>("")
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  const handleAcquireClick = (watchName: string) => {
    setSelectedWatch(watchName)
    setIsWaitlistOpen(true)
  }

  const handleConsultationClick = () => {
    setIsConsultationOpen(true)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        ".watch-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".watches-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section id="watches" ref={sectionRef} className="space-mobile-ultra lg:space-ultra bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Dark Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center space-x-3 bg-graphite border-dark px-6 py-3 mb-8">
            <div className="w-1 h-1 bg-accent"></div>
            <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">Collection</span>
          </div>

          <h2 className="font-display-ultra text-mobile-hero lg:text-desktop-hero text-accent mb-8 leading-none text-glow-accent">
            TIMEPIECES
          </h2>

          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>

          <p className="font-body-refined text-mobile-body lg:text-xl text-pearl max-w-3xl mx-auto leading-relaxed">
            Each timepiece represents the pinnacle of Swiss craftsmanship, where architectural precision meets
            horological excellence in perfect harmony.
          </p>
        </div>

        {/* Dark Luxury Watches Grid */}
        <div className="watches-container space-y-16 lg:space-y-24">
          {watches.map((watch, index) => (
            <div
              key={watch.id}
              className={`watch-item grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              onMouseEnter={() => setHoveredWatch(index)}
              onMouseLeave={() => setHoveredWatch(null)}
            >
              {/* Dark Premium Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <Link href={`/watches/${watch.slug}`} className="relative group cursor-pointer block">
                  <div className="aspect-square bg-graphite shadow-dark overflow-hidden">
                    <Image
                      src={watch.image || "/placeholder.svg"}
                      alt={watch.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      style={{
                        filter: "contrast(1.2) saturate(0.8) brightness(0.9)",
                      }}
                    />
                  </div>

                  {/* Dark Accents */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-accent"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-accent"></div>
                </Link>
              </div>

              {/* Dark Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-accent-italic text-platinum text-lg">{watch.series}</span>
                    <span className="font-body-refined text-xs text-silver uppercase tracking-[0.15em]">2024</span>
                  </div>

                  <h3 className="font-display-light text-mobile-display lg:text-desktop-display text-accent leading-tight text-glow-accent">
                    {watch.name}
                  </h3>

                  <div className="w-12 h-px bg-accent"></div>
                </div>

                {/* Description */}
                <p className="font-body-refined text-mobile-body lg:text-lg text-pearl leading-relaxed">
                  {watch.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-body-refined text-xs text-platinum uppercase tracking-[0.15em]">Features</h4>
                  <div className="space-y-3">
                    {watch.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-1 h-1 bg-accent"></div>
                        <span className="font-body-refined text-ivory">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Limited Edition */}
                <div className="bg-subtle-gradient border-dark p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-display-light text-2xl lg:text-3xl text-accent text-glow-accent">
                      {watch.currency} {watch.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="font-body-refined text-sm text-pearl">{watch.limited}</div>
                </div>

                {/* Dark Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/watches/${watch.slug}`}
                    className="btn-dark-luxury group flex items-center justify-center"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button onClick={() => handleAcquireClick(watch.name)} className="btn-outline-dark">
                    Acquire Timepiece
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dark Bottom CTA */}
        <div className="text-center mt-20 lg:mt-32 pt-16 lg:pt-24 border-t border-dark">
          <h3 className="font-display-light text-mobile-display lg:text-desktop-display text-accent mb-6 leading-tight text-glow-accent">
            Discover Your Perfect Timepiece
          </h3>
          <p className="font-body-refined text-mobile-body lg:text-lg text-pearl mb-8 max-w-2xl mx-auto leading-relaxed">
            Schedule a private consultation to explore our complete collection and find the watch that speaks to your
            unique aesthetic.
          </p>
          <button onClick={handleConsultationClick} className="btn-dark-luxury">
            Book Private Consultation
          </button>
        </div>
      </div>
      {/* Waitlist Form Modal */}
      <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} watchName={selectedWatch} />

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        formType="book-consultation"
      />
    </section>
  )
}
