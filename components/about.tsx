"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Award, Clock, Gem, Users } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        ".about-element",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  const achievements = [
    { icon: Award, number: "50+", label: "Patents", description: "Innovation Excellence" },
    { icon: Clock, number: "168h", label: "Craft Time", description: "Per Timepiece" },
    { icon: Gem, number: "99.95%", label: "Pure Platinum", description: "Highest Grade" },
    { icon: Users, number: "4", label: "Generations", description: "Master Craftsmen" },
  ]

  return (
    <section id="about" ref={sectionRef} className="space-mobile-ultra lg:space-ultra bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Dark Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-24">
          <div className="about-element space-y-6">
            <div className="inline-flex items-center space-x-3 bg-charcoal border-dark px-6 py-3">
              <div className="w-1 h-1 bg-accent"></div>
              <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">About Platonx</span>
            </div>

            <h2 className="font-display-ultra text-mobile-hero lg:text-desktop-hero text-accent leading-none text-glow-accent">
              CRAFTING
              <span className="block">EXCELLENCE</span>
            </h2>

            <div className="w-16 h-px bg-accent"></div>
          </div>

          <div className="about-element space-y-6 lg:pt-12">
            <p className="font-display-light text-mobile-display lg:text-2xl text-ivory leading-tight">
              For over a century, Platonx has redefined horological excellence through architectural precision and Swiss
              craftsmanship.
            </p>
            <p className="font-body-refined text-mobile-body lg:text-lg text-pearl leading-relaxed">
              Our commitment to using only the finest platinum and employing traditional techniques ensures that each
              timepiece transcends mere functionality to become a work of art.
            </p>
          </div>
        </div>

        {/* Dark Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 lg:mb-24">
          {achievements.map((achievement) => (
            <div key={achievement.label} className="about-element group cursor-pointer">
              <div className="bg-charcoal border-dark p-8 h-full hover:shadow-refined-dark transition-all duration-500 relative cursor-pointer">
                {/* Dark Icon */}
                <div className="w-12 h-12 border border-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-obsidian transition-all duration-500">
                  <achievement.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="font-display-light text-3xl lg:text-4xl text-accent text-glow-accent">
                    {achievement.number}
                  </div>
                  <div className="font-body-medium text-lg text-ivory">{achievement.label}</div>
                  <div className="font-body-refined text-sm text-pearl">{achievement.description}</div>
                </div>

                {/* Dark Hover Effect */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Dark Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="about-element space-y-8">
            <div className="space-y-6">
              <h3 className="font-display-light text-mobile-display lg:text-desktop-display text-accent leading-tight text-glow-accent">
                The Art of Precision
              </h3>
              <p className="font-body-refined text-mobile-body lg:text-lg text-pearl leading-relaxed">
                Every Platonx timepiece begins its journey in our Swiss atelier, where master craftsmen employ
                techniques passed down through generations. Our dedication to using only the finest platinum ensures
                that each watch is not just a timekeeper, but a work of art.
              </p>
              <p className="font-body-refined text-mobile-body lg:text-lg text-pearl leading-relaxed">
                The marriage of traditional craftsmanship with cutting-edge technology allows us to create movements of
                unprecedented precision and beauty.
              </p>
            </div>

            {/* Dark Process */}
            <div className="space-y-4">
              <h4 className="font-body-refined text-xs text-platinum uppercase tracking-[0.15em]">Our Process</h4>
              <div className="space-y-3">
                {[
                  "Design & Conceptualization",
                  "Platinum Sourcing & Preparation",
                  "Movement Assembly & Testing",
                  "Case Crafting & Finishing",
                  "Quality Assurance & Certification",
                ].map((step, index) => (
                  <div key={step} className="flex items-center space-x-4">
                    <div className="w-6 h-6 border border-accent flex items-center justify-center text-accent font-body-refined text-xs">
                      {index + 1}
                    </div>
                    <span className="font-body-refined text-ivory">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark Image with Hover Effects */}
          <div className="about-element">
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/5] bg-graphite shadow-dark overflow-hidden transition-all duration-700 group-hover:shadow-refined-dark">
                <Image
                  src="/images/pt6.jpg"
                  alt="Platonx craftsmanship"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter: "contrast(1.2) saturate(0.8) brightness(0.9)",
                  }}
                />
                <div className="absolute inset-0 bg-depth-gradient group-hover:bg-gradient-to-t group-hover:from-obsidian/60 group-hover:via-transparent group-hover:to-accent/10 transition-all duration-700"></div>

                {/* Hover overlay with text */}
                <div className="absolute inset-0 bg-obsidian/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-16 h-16 border-2 border-accent mx-auto flex items-center justify-center">
                      <div className="w-8 h-8 bg-accent"></div>
                    </div>
                    <p className="font-body-refined text-accent text-sm uppercase tracking-[0.2em]">Swiss Atelier</p>
                  </div>
                </div>
              </div>

              {/* Dark Accents with hover animation */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-accent transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:-top-3 group-hover:-left-3"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-accent transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:-bottom-3 group-hover:-right-3"></div>

              {/* Mobile touch indicator */}
              <div className="absolute top-4 right-4 lg:hidden">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
