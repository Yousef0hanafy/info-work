import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { ChairmanSection } from '@/components/sections/chairman-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ClientsSection } from '@/components/sections/clients-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ChairmanSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ClientsSection />
      <ContactSection />
    </main>
  )
}