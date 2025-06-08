"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Event() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Title with wave effect
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, skewY: 5 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Content with morphing effect
      gsap.fromTo(
        contentRef.current,
        { x: -100, opacity: 0, rotationY: -15, transformOrigin: "right center" },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Image with depth effect
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotationY: 15, z: -100 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Event details with cascade effect
      gsap.fromTo(
        ".event-detail",
        { x: -30, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".event-details",
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // CTA button with pulse effect
      gsap.fromTo(
        ".event-cta",
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ".event-cta",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Continuous pulse for CTA
      gsap.to(".event-cta", {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Decorative elements floating
      gsap.to(".floating-decoration", {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      })
    }
  }, [])

  return (
    <section id="event" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center mb-16 text-platinum">
          The Platonx Event
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">An Exclusive Gathering</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Twice a year, we bring together the world&apos;s most influential individuals for an intimate evening of
              networking, luxury, and horological appreciation. The Platonx Event is more than a gathering—it&apos;s a
              convergence of minds that shape the future.
            </p>

            <div className="space-y-6 mb-8 event-details">
              <div className="event-detail flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-platinum" />
                <div>
                  <div className="text-white font-semibold">Next Event</div>
                  <div className="text-gray-400">March 15, 2024</div>
                </div>
              </div>

              <div className="event-detail flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-platinum" />
                <div>
                  <div className="text-white font-semibold">Location</div>
                  <div className="text-gray-400">Private Estate, Monaco</div>
                </div>
              </div>

              <div className="event-detail flex items-center space-x-4">
                <Users className="w-6 h-6 text-platinum" />
                <div>
                  <div className="text-white font-semibold">Attendance</div>
                  <div className="text-gray-400">Limited to 50 guests</div>
                </div>
              </div>

              <div className="event-detail flex items-center space-x-4">
                <Clock className="w-6 h-6 text-platinum" />
                <div>
                  <div className="text-white font-semibold">Duration</div>
                  <div className="text-gray-400">7:00 PM - 11:00 PM</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 event-cta">
              <Button
                size="lg"
                className="w-full bg-platinum text-black hover:bg-white transition-all duration-300 text-lg py-4"
              >
                Request Invitation
              </Button>
              <p className="text-sm text-gray-500 text-center">Invitations are extended by recommendation only</p>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-platinum/20 to-transparent rounded-lg overflow-hidden">
              <Image
                src="/images/pt4.jpg"
                alt="The Platonx Event - Luxury networking with platinum timepieces"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                style={{
                  filter: "contrast(1.1) saturate(0.8) brightness(1.1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-platinum/10" />
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-platinum/10 rounded-lg backdrop-blur-sm border border-platinum/20 floating-decoration" />
          </div>
        </div>
      </div>
    </section>
  )
}
