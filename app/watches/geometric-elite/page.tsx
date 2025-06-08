"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Star, Shield } from "lucide-react"
import Footer from "@/components/footer"
import WaitlistForm from "@/components/waitlist-form"
import ConsultationForm from "@/components/consultation-form"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GeometricElitePage() {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline({ delay: 0.3 })

      // Entrance animations
      tl.fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
      )
        .fromTo(
          contentRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1",
        )
        .fromTo(
          ".product-element",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          "-=0.8",
        )
    }
  }, [])

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const features = [
    { icon: Star, title: "Geometric Case Design", description: "Architectural precision in platinum" },
    { icon: Shield, title: "Ultra-thin Movement", description: "Swiss manufacture caliber" },
    { icon: Check, title: "Platinum Bracelet", description: "Hand-finished links" },
  ]

  const specifications = [
    { label: "Case Material", value: "950 Platinum" },
    { label: "Case Diameter", value: "40mm" },
    { label: "Movement", value: "Automatic, 72h power reserve" },
    { label: "Water Resistance", value: "50 meters" },
    { label: "Limited Edition", value: "50 pieces worldwide" },
    { label: "Warranty", value: "Lifetime service guarantee" },
  ]

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-dark border-b border-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/#watches"
              className="group flex items-center space-x-3 text-accent hover:text-ivory transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body-refined text-sm uppercase tracking-[0.2em]">Back to Collection</span>
            </Link>

            <Link href="/" className="font-display-ultra text-xl text-accent glow-pulse">
              PLATONX
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-12 lg:pt-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image */}
            <div ref={imageRef} className="relative">
              <div className="aspect-square bg-charcoal shadow-dark overflow-hidden group">
                <Image
                  src="/images/Pt1.jpg"
                  alt="Geometric Elite - Luxury Platinum Watch"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: "contrast(1.2) saturate(0.8) brightness(0.9)",
                  }}
                  priority
                />
                <div className="absolute inset-0 bg-depth-gradient"></div>
              </div>

              {/* Floating accents */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border border-accent float-elegant"></div>
              <div
                className="absolute -bottom-4 -right-4 w-12 h-12 border border-platinum float-elegant"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Product Content */}
            <div ref={contentRef} className="space-y-8">
              {/* Badge */}
              <div className="product-element inline-flex items-center space-x-3 bg-charcoal border-dark px-6 py-3">
                <div className="w-1 h-1 bg-accent"></div>
                <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">
                  Architecture Series
                </span>
              </div>

              {/* Product Name */}
              <div className="product-element space-y-4">
                <h1 className="font-display-ultra text-4xl lg:text-6xl text-accent leading-none text-glow-accent">
                  GEOMETRIC ELITE
                </h1>
                <div className="w-20 h-px bg-accent"></div>
              </div>

              {/* Price */}
              <div className="product-element">
                <div className="font-display-light text-3xl lg:text-4xl text-ivory mb-2">USD 125,000</div>
                <div className="font-body-refined text-sm text-pearl">Limited to 50 pieces worldwide</div>
              </div>

              {/* Description */}
              <div className="product-element space-y-4">
                <p className="font-body-refined text-lg text-pearl leading-relaxed">
                  A masterpiece of architectural precision and horological excellence. The Geometric Elite represents
                  the pinnacle of Swiss craftsmanship, where mathematical perfection meets artistic vision.
                </p>
                <p className="font-body-refined text-pearl leading-relaxed">
                  Each timepiece is meticulously crafted from 950 platinum, featuring our proprietary ultra-thin
                  movement that embodies decades of innovation and heritage.
                </p>
              </div>

              {/* Buy Now Button */}
              <div className="product-element pt-4">
                <button onClick={() => setIsWaitlistOpen(true)} className="btn-dark-luxury text-base px-12 py-4">
                  Acquire Timepiece
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display-light text-3xl lg:text-4xl text-accent mb-6 text-glow-accent">
              Exceptional Features
            </h2>
            <div className="w-16 h-px bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="product-element group">
                <div className="bg-subtle-gradient border-dark p-8 h-full hover:shadow-refined-dark transition-all duration-500 text-center cursor-pointer">
                  <div className="w-16 h-16 border border-accent mx-auto mb-6 flex items-center justify-center group-hover:bg-accent group-hover:text-obsidian transition-all duration-500">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-body-medium text-xl text-ivory mb-3">{feature.title}</h3>
                  <p className="font-body-refined text-pearl">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 lg:py-24 bg-dark-gradient">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display-light text-3xl lg:text-4xl text-accent mb-6 text-glow-accent">
              Technical Specifications
            </h2>
            <div className="w-16 h-px bg-accent mx-auto"></div>
          </div>

          <div className="space-y-6">
            {specifications.map((spec, index) => (
              <div
                key={spec.label}
                className="product-element flex justify-between items-start py-6 px-6 border-b border-dark"
              >
                <div className="font-body-refined text-platinum uppercase tracking-[0.1em] text-sm flex-shrink-0 w-1/3">
                  {spec.label}
                </div>
                <div className="font-body-medium text-ivory text-right flex-1 pl-4">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Heritage Statement */}
          <div className="mt-16 text-center">
            <div className="bg-charcoal border-dark p-8 lg:p-12">
              <h3 className="font-display-light text-2xl text-accent mb-6 text-glow-accent">Swiss Heritage</h3>
              <p className="font-body-refined text-pearl leading-relaxed max-w-2xl mx-auto">
                Crafted in our Geneva atelier by master horologists with over four generations of expertise. Each
                Geometric Elite undergoes 168 hours of meticulous assembly and testing, ensuring perfection that will
                endure for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display-light text-3xl lg:text-4xl text-accent mb-6 text-glow-accent">
            Begin Your Journey
          </h2>
          <p className="font-body-refined text-xl text-pearl mb-8 leading-relaxed">
            Schedule a private consultation to experience the Geometric Elite in our exclusive Geneva showroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setIsConsultationOpen(true)} className="btn-dark-luxury">
              Schedule Private Viewing
            </button>
            <button onClick={() => setIsConsultationOpen(true)} className="btn-outline-dark">
              Request Information
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Waitlist Form Modal */}
      <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} watchName="Geometric Elite" />
      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        formType="private-viewing"
      />
    </main>
  )
}
