'use client'

import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'
import {
  Shield,
  Zap,
  Filter,
  Cpu,
  Droplets,
  Building2,
  Landmark,
  Flame,
  Hammer,
} from 'lucide-react'

// ── Client data ────────────────────────────────────────────────────────
const CLIENTS = [
  { name: 'Ministry of Water Resources', icon: Droplets },
  { name: 'Arab Contractors', icon: Building2 },
  { name: 'Orascom Construction', icon: Hammer },
  { name: 'New Urban Communities Authority', icon: Landmark },
  { name: 'Egyptian Armed Forces', icon: Shield },
  { name: 'Petrojet', icon: Flame },
]

// ── Technology partner data ─────────────────────────────────────────────
const TECH_PARTNERS = [
  {
    caption: 'UV Filtration Systems',
    description: 'Official Distributor',
    icon: Filter,
  },
  {
    caption: 'Industrial Pumps & Blowers',
    description: 'Certified Partner',
    icon: Zap,
  },
  {
    caption: 'Membrane Technology',
    description: 'Strategic Alliance',
    icon: Droplets,
  },
  {
    caption: 'Electrical Panels & Control',
    description: 'OEM Partner',
    icon: Cpu,
  },
]

// ── Animation variants ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

// ── Component ──────────────────────────────────────────────────────────
export function ClientsSection() {
  const t = useTranslations('clients')

  return (
    <section id="clients" className="py-24" style={{ backgroundColor: '#0F172A' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-12 text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-brand-border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-glow"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          >
            {t('title')}
          </motion.h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-brand-accent" />
        </div>

        {/* ── Sub-section 1: Trusted By ───────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-20"
        >
          <p className="mb-8 text-center text-base text-slate-400">
            {t('subtitleClients')}
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {CLIENTS.map((client, i) => {
              const Icon = client.icon
              return (
                <motion.div
                  key={client.name}
                  custom={i}
                  variants={fadeUp}
                  className="group flex h-20 items-center justify-center rounded-lg border border-brand-border bg-brand-surface p-4 transition-all duration-300 hover:border-brand-accent hover:text-white"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-brand-glow" />
                    <span className="text-xs font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-white sm:text-sm">
                      {client.name}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Sub-section 2: Technology Partners ──────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <p className="mb-8 text-center text-base text-slate-400">
            {t('subtitlePartners')}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_PARTNERS.map((partner, i) => {
              const Icon = partner.icon
              return (
                <motion.div
                  key={partner.caption}
                  custom={i}
                  variants={fadeUp}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-brand-border bg-brand-surface p-6 text-center transition-all duration-300 hover:border-brand-accent/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 transition-colors duration-300 group-hover:bg-brand-accent/20">
                    <Icon className="h-6 w-6 text-brand-glow" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{partner.caption}</p>
                    <p className="mt-1 text-xs text-brand-glow">{partner.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}