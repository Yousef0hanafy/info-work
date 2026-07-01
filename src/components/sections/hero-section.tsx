'use client'

import { useTranslations } from '@/lib/i18n-client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

const stats = [
  { valueKey: 'projects', labelKey: 'projectsLabel' },
  { valueKey: 'years', labelKey: 'yearsLabel' },
  { valueKey: 'clients', labelKey: 'clientsLabel' },
  { valueKey: 'countries', labelKey: 'countriesLabel' },
] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.0 + i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

// Animated water particles
function WaterParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: `rgba(59, 130, 246, ${0.15 - i * 0.02})`,
            left: `${15 + i * 15}%`,
            bottom: '-5%',
          }}
          animate={{
            y: [-20, -400 - i * 60],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1, 0.5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const t = useTranslations('hero')
  const ts = useTranslations('stats')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/water-plant-hero.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/70 to-brand-dark" />
      </div>

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(96,165,250,0.05) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 80% at 70% 60%, rgba(59,130,246,0.09) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 30% 30%, rgba(96,165,250,0.06) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(96,165,250,0.05) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Water particles */}
      <WaterParticles />

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
            'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary orb — bottom left */}
      <div
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Water line decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 30%, rgba(59,130,246,0.5) 50%, rgba(59,130,246,0.3) 70%, transparent)',
        }}
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
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
              backgroundColor: 'rgba(59,130,246,0.08)',
              color: '#60A5FA',
              border: '1px solid rgba(59,130,246,0.15)',
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#3B82F6' }}
            />
            {t('badge')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
          style={{
            textShadow: '0 0 60px rgba(59,130,246,0.1)',
          }}
          variants={fadeUp}
        >
          <span className="block">Engineering</span>
          <span className="block mt-1" style={{ color: '#60A5FA' }}>
            Water Intelligence
          </span>
        </motion.h1>

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
            className="group inline-flex items-center justify-center h-12 px-8 rounded-xl text-white font-semibold text-sm transition-all cursor-pointer"
            style={{
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 24px rgba(59,130,246,0.3), 0 4px 12px rgba(59,130,246,0.2)',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 32px rgba(59,130,246,0.4), 0 8px 20px rgba(59,130,246,0.25)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {t('cta1')}
            <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#projects"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-semibold text-sm transition-all cursor-pointer"
            style={{
              backgroundColor: 'rgba(59,130,246,0.05)',
              border: '1.5px solid rgba(59,130,246,0.3)',
              color: '#60A5FA',
            }}
            whileHover={{
              scale: 1.03,
              backgroundColor: 'rgba(59,130,246,0.1)',
              borderColor: 'rgba(59,130,246,0.5)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            {t('cta2')}
          </motion.a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14"
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
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{
                  color: '#3B82F6',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                {ts(stat.valueKey)}
              </span>
              <span
                className="mt-1.5 text-xs sm:text-sm font-medium"
                style={{ color: '#64748B' }}
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
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.a
          href="#services"
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-[10px] uppercase tracking-[3px] font-medium" style={{ color: '#475569' }}>
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: '#475569' }} />
        </motion.a>
      </motion.div>
    </section>
  )
}