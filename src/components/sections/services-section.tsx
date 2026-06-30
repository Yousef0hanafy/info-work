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
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function ServicesSection() {
  const t = useTranslations('services')

  return (
    <section
      id="services"
      className="py-16 md:py-24"
      style={{ backgroundColor: '#0F172A' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-block text-xs font-bold tracking-[3px] uppercase"
            style={{ color: '#3B82F6' }}
            variants={headerVariants}
          >
            {t('label')}
          </motion.span>

          <motion.h2
            className="mt-4 text-2xl md:text-[28px] font-bold text-white"
            variants={headerVariants}
          >
            {t('title')}
          </motion.h2>

          <motion.div
            className="mx-auto mt-5"
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#3B82F6',
              borderRadius: '2px',
            }}
            variants={headerVariants}
          />

          <motion.p
            className="mt-5 text-base leading-relaxed"
            style={{ color: '#94A3B8' }}
            variants={headerVariants}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.slug}
                className="group relative rounded-xl p-6 transition-shadow duration-300 cursor-default"
                style={{
                  backgroundColor: '#1A2332',
                  border: '1.5px solid #2D3B4F',
                }}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{
                  borderColor: '#3B82F6',
                  y: -2,
                  boxShadow: '0 8px 32px rgba(59,130,246,0.12)',
                  transition: { duration: 0.25 },
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
                >
                  <Icon className="w-7 h-7" style={{ color: '#3B82F6' }} />
                </div>

                {/* Title */}
                <h3
                  className="mt-4 text-lg font-semibold text-white"
                >
                  {t(`${service.key}.title`)}
                </h3>

                {/* Description */}
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: '#94A3B8' }}
                >
                  {t(`${service.key}.description`)}
                </p>

                {/* Learn More */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all duration-300" style={{ color: '#60A5FA' }}>
                  {t('learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}