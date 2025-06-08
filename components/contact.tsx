"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import ConsultationForm from "@/components/consultation-form"

export default function Contact() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  const handleLearnMoreClick = () => {
    setIsConsultationOpen(true)
  }

  return (
    <section id="contact" className="space-mobile-ultra lg:space-ultra bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Dark Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center space-x-3 bg-graphite border-dark px-6 py-3 mb-8">
            <div className="w-1 h-1 bg-accent"></div>
            <span className="font-body-refined text-xs text-platinum uppercase tracking-[0.2em]">Contact</span>
          </div>

          <h2 className="font-display-ultra text-mobile-hero lg:text-desktop-hero text-accent mb-8 leading-none text-glow-accent">
            BEGIN YOUR
            <span className="block">JOURNEY</span>
          </h2>

          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>

          <p className="font-body-refined text-mobile-body lg:text-xl text-pearl max-w-3xl mx-auto leading-relaxed">
            Experience the world of Platonx through a personalized consultation. Our experts will guide you through our
            exclusive collections with the attention you deserve.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Keep only the contact methods section */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: Mail,
                title: "Email",
                primary: "info@platonx.com",
                secondary: "For all inquiries",
              },
              {
                icon: Phone,
                title: "Phone",
                primary: "+41 22 123 4567",
                secondary: "By appointment only",
              },
              {
                icon: MapPin,
                title: "Atelier",
                primary: "Geneva, Switzerland",
                secondary: "Private showroom",
              },
              {
                icon: Clock,
                title: "Hours",
                primary: "Monday - Friday: 9AM - 6PM",
                secondary: "Weekends by appointment",
              },
            ].map((contact) => (
              <div key={contact.title} className="group">
                <div className="bg-subtle-gradient border-dark p-6 hover:shadow-refined-dark transition-all duration-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-obsidian transition-all duration-500">
                      <contact.icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-body-medium text-lg text-ivory">{contact.title}</h4>
                      <div className="font-body-refined text-accent">{contact.primary}</div>
                      <div className="font-body-refined text-sm text-pearl">{contact.secondary}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Learn More button */}
          <div className="text-center">
            <button onClick={handleLearnMoreClick} className="btn-dark-luxury">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        formType="learn-more"
      />
    </section>
  )
}
