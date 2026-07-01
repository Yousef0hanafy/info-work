'use client'

import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'
import {
  Droplets,
  Recycle,
  Wind,
  Shield,
  Cog,
  Building2,
  Package,
  PencilRuler,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'

interface ServiceItem {
  key: string
  icon: LucideIcon
  slug: string
}

const services: ServiceItem[] = [
  { key: 'waterTreatment', icon: Droplets, slug: 'water-treatment' },
  { key: 'sewageTreatment', icon: Recycle, slug: 'sewage-treatment' },
  { key: 'hvac', icon: Wind, slug: 'hvac' },
  { key: 'fireFighting', icon: Shield, slug: 'fire-fighting' },
  { key: 'electromechanical', icon: Cog, slug: 'electromechanical' },
  { key: 'civil', icon: Building2, slug: 'civil' },
  { key: 'equipment', icon: Package, slug: 'equipment' },
  { key: 'design', icon: PencilRuler, slug: 'design' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function ServicesSection() {
  const t = useTranslations('services')

  return (
    <section
      id="services"
      className="py-20 md:py-28 relative overflow-hidden bg-background"
    >
      {/* Subtle gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[3px] uppercase text-primary"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
          >
            {t('label')}
          </motion.span>

          <motion.h2
            className="mt-4 text-3xl md:text-4xl font-bold text-foreground"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
          >
            {t('title')}
          </motion.h2>

          <motion.div
            className="mx-auto mt-5 h-[3px] w-12 rounded-full bg-primary"
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4, ease: easeOut } },
            }}
          />

          <motion.p
            className="mt-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.slug}
                className="group relative rounded-xl p-6 border border-border bg-card transition-all duration-300 cursor-default"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{
                  borderColor: 'rgba(59,130,246,0.4)',
                  y: -4,
                  boxShadow: '0 12px 40px rgba(59,130,246,0.08)',
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)',
                  }}
                />

                {/* Icon */}
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110 bg-primary/10 border border-primary/10">
                    <Icon className="w-6 h-6 text-primary transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                  {t(`${service.key}.title`)}
                </h3>

                {/* Description */}
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`${service.key}.description`)}
                </p>

                {/* Learn More */}
                <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-300 group-hover:gap-2.5">
                  {t('learnMore')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}