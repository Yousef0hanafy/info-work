'use client'

import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const titleWords = ['Engineering', 'Water', 'Intelligence']

const stats = [
  { valueKey: 'stats.projects', labelKey: 'stats.projectsLabel' },
  { valueKey: 'stats.years', labelKey: 'stats.yearsLabel' },
  { valueKey: 'stats.clients', labelKey: 'stats.clientsLabel' },
  { valueKey: 'stats.countries', labelKey: 'stats.countriesLabel' },
] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export function HeroSection() {
  const t = useTranslations('hero')
  const ts = useTranslations('stats')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0B1120' }}
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(96,165,250,0.04) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 80% at 70% 60%, rgba(59,130,246,0.07) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 30% 30%, rgba(96,165,250,0.05) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(96,165,250,0.04) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glowing orb — top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary orb — bottom left for depth */}
      <div
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: 'rgba(59,130,246,0.1)',
              color: '#60A5FA',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#3B82F6' }}
            />
            {t('badge')}
          </span>
        </motion.div>

        {/* Title — stagger animated per word */}
        <h1 className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-3xl sm:text-4xl md:text-[48px] font-extrabold text-white leading-tight tracking-tight">
          {titleWords.map((word) => (
            <motion.span
              key={word}
              variants={fadeUp}
              style={{
                textShadow: '0 0 40px rgba(59,130,246,0.15)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: '#94A3B8' }}
          variants={fadeUp}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          variants={fadeUp}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl text-white font-semibold text-sm transition-colors cursor-pointer"
            style={{ backgroundColor: '#3B82F6' }}
            whileHover={{
              scale: 1.03,
              backgroundColor: '#2563EB',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {t('cta1')}
          </motion.a>

          <motion.a
            href="#projects"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
            style={{
              backgroundColor: 'transparent',
              border: '1.5px solid #3B82F6',
              color: '#3B82F6',
            }}
            whileHover={{
              scale: 1.03,
              backgroundColor: 'rgba(59,130,246,0.1)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {t('cta2')}
          </motion.a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.valueKey}
              className="flex flex-col items-center"
              custom={i}
              variants={statVariants}
            >
              <span
                className="text-3xl md:text-[36px] font-bold tracking-tight"
                style={{
                  color: '#3B82F6',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                {ts(stat.valueKey)}
              </span>
              <span
                className="mt-1 text-xs sm:text-sm"
                style={{ color: '#94A3B8' }}
              >
                {ts(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.a
          href="#services"
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
          style={{
            border: '1.5px solid rgba(59,130,246,0.3)',
            color: '#60A5FA',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ borderColor: 'rgba(59,130,246,0.6)' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}