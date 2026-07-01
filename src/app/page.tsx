import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { HeroSection } from '@/components/sections/hero-section'

const ServicesSection = dynamic(
  () => import('@/components/sections/services-section').then(m => ({ default: m.ServicesSection })),
  { ssr: true }
)
const ChairmanSection = dynamic(
  () => import('@/components/sections/chairman-section').then(m => ({ default: m.ChairmanSection })),
  { ssr: true }
)
const ProjectsSection = dynamic(
  () => import('@/components/sections/projects-section').then(m => ({ default: m.ProjectsSection })),
  { ssr: true }
)
const TestimonialsSection = dynamic(
  () => import('@/components/sections/testimonials-section').then(m => ({ default: m.TestimonialsSection })),
  { ssr: true }
)
const ClientsSection = dynamic(
  () => import('@/components/sections/clients-section').then(m => ({ default: m.ClientsSection })),
  { ssr: true }
)
const ContactSection = dynamic(
  () => import('@/components/sections/contact-section').then(m => ({ default: m.ContactSection })),
  { ssr: true }
)

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ChairmanSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}