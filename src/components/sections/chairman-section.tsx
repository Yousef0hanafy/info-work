'use client'

import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'

const badgeKeys = ['badge1', 'badge2', 'badge3'] as const
const easeOut = [0.22, 1, 0.36, 1] as const

export function ChairmanSection() {
  const t = useTranslations('chairman')

  return (
    <section
      id="about"
      className="py-20 md:py-28 relative overflow-hidden bg-muted"
    >
      {/* Subtle top divider line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15) 50%, transparent)',
        }}
      />

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
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left column — Credibility Badges */}
          <motion.div
            className="lg:col-span-2 relative flex flex-col gap-4 lg:pt-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {/* Large decorative quotation mark */}
            <span
              className="absolute -top-8 start-0 pointer-events-none select-none leading-none"
              style={{
                fontSize: '140px',
                color: 'rgba(59,130,246,0.15)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div className="relative flex flex-col gap-3 pt-8">
              {badgeKeys.map((key, i) => (
                <motion.span
                  key={key}
                  className="inline-flex self-start rounded-lg px-4 py-2.5 text-sm font-medium bg-primary/5 text-primary border border-primary/10"
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
            </div>
          </motion.div>

          {/* Right column — Quote & Signature */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {/* Quote */}
            <blockquote
              className="border-s-[3px] ps-6 py-1"
              style={{
                borderInlineStartColor: '#3B82F6',
              }}
            >
              <p
                className="text-xl md:text-2xl italic leading-relaxed text-foreground/80"
              >
                {t('quote')}
              </p>
            </blockquote>

            {/* Signature */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold bg-primary/10 text-primary border border-primary/20">
                HD
              </div>
              <div>
                <p className="text-foreground font-semibold text-lg">
                  {t('signature')}
                </p>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                  {t('role')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}