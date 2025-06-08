"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const heritageHighlights = [
  {
    title: "Artisanal Legacy",
    description: "Four generations of master craftsmen perfecting the art of platinum horology",
    detail: "Established 1924 in Geneva",
    image: "/images/pt6.jpg",
  },
  {
    title: "Royal Heritage",
    description: "Appointed official timekeeper to European royalty since 1952",
    detail: "Crown jeweler certification",
    image: "/images/pt7.jpg",
  },
  {
    title: "Innovation Excellence",
    description: "Pioneering ultra-thin movements and revolutionary platinum techniques",
    detail: "50+ patents worldwide",
    image: "/images/Pt1.jpg",
  },
]

export default function Heritage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        ".heritage-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Floating elements
      gsap.to(".floating-element", {
        y: -15,
        rotation: 3,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      })
    }
  }, [])

  return (
    <section
      id="heritage"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-graphite via-charcoal to-charcoal relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 border border-silver rounded-full"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 border border-silver rounded-full"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-16 h-16 border border-silver rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6 drop-shadow-2xl">Heritage</h2>
          <p className="font-body text-lg text-pearl max-w-2xl mx-auto">
            A century of uncompromising excellence in platinum horology
          </p>
        </div>

        {/* Heritage Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {heritageHighlights.map((highlight, index) => (
            <div key={highlight.title} className="heritage-card group">
              <div className="bg-gradient-to-br from-charcoal/80 to-charcoal/60 backdrop-blur-sm rounded-2xl p-8 border border-graphite/40 hover:border-silver/60 transition-all duration-500 shadow-2xl hover:shadow-silver/10">
                <div className="relative mb-6">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 shadow-inner"
                      style={{
                        filter: "contrast(1.1) saturate(0.8) brightness(1.1)",
                        boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-silver/10 shadow-inner"></div>
                  </div>
                </div>

                <h3 className="font-display text-2xl text-ivory mb-3 group-hover:text-pearl transition-colors drop-shadow-lg">
                  {highlight.title}
                </h3>
                <p className="font-body text-pearl mb-4 leading-relaxed">{highlight.description}</p>
                <p className="font-body text-sm text-silver italic">{highlight.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-6 shadow-lg"></div>
          <p className="font-body text-sm text-silver italic tracking-wider drop-shadow-md">
            "Excellence is not a destination, but a journey of perpetual refinement"
          </p>
        </div>
      </div>
    </section>
  )
}
