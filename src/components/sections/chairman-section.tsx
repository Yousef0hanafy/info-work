'use client'

import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'

const badgeKeys = ['badge1', 'badge2', 'badge3'] as const

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

export function ChairmanSection() {
  const t = useTranslations('chairman')

  return (
    <section
      id="about"
      className="py-16 md:py-24"
      style={{ backgroundColor: '#0B1120' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label + Title */}
        <motion.div
          className="mb-14"
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
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
          >
            {t('label')}
          </motion.span>

          <motion.h2
            className="mt-4 text-2xl md:text-[28px] font-bold text-white"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
          >
            {t('title')}
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left column — Credibility Badges */}
          <motion.div
            className="lg:col-span-2 relative flex flex-col gap-4 lg:pt-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {/* Large decorative quotation mark */}
            <span
              className="absolute -top-8 start-0 pointer-events-none select-none leading-none"
              style={{
                fontSize: '120px',
                color: 'rgba(59,130,246,0.30)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {badgeKeys.map((key, i) => (
              <motion.span
                key={key}
                className="inline-flex self-start rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(59,130,246,0.1)',
                  color: '#60A5FA',
                  border: '1px solid rgba(59,130,246,0.2)',
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.5,
                  ease: easeOut,
                }}
              >
                {t(key)}
              </motion.span>
            ))}
          </motion.div>

          {/* Right column — Quote & Signature */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {/* Quote — uses logical border-s (start) and ps (padding-start) for RTL support */}
            <blockquote
              className="border-s-[3px] ps-6 text-xl italic leading-relaxed"
              style={{
                borderInlineStartColor: '#3B82F6',
                color: '#CBD5E1',
              }}
            >
              {t('quote')}
            </blockquote>

            {/* Signature */}
            <div className="mt-8">
              <p className="text-white font-semibold text-lg">
                {t('signature')}
              </p>
              <p
                className="mt-1 text-sm"
                style={{ color: '#94A3B8' }}
              >
                {t('role')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}