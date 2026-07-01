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
  Factory,
  Trophy,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

const CLIENTS: { name: string; nameAr: string; icon: LucideIcon }[] = [
  { name: 'Ministry of Water Resources', nameAr: 'وزارة الموارد المائية والري', icon: Droplets },
  { name: 'Arab Contractors', nameAr: 'المقاولون العرب', icon: Building2 },
  { name: 'Orascom Construction', nameAr: 'أوراسكوم للإنشاءات', icon: Hammer },
  { name: 'New Urban Communities Authority', nameAr: 'هيئة المجتمعات العمرانية', icon: Landmark },
  { name: 'Egyptian Armed Forces', nameAr: 'القوات المسلحة المصرية', icon: Shield },
  { name: 'Petrojet', nameAr: 'بيتروجيت', icon: Flame },
  { name: 'Industrial Development Authority', nameAr: 'هيئة التنمية الصناعية', icon: Factory },
  { name: 'Galala City Development', nameAr: 'تطوير مدينة الجلالة', icon: Trophy },
]

const TECH_PARTNERS = [
  { caption: 'UV Filtration', captionAr: 'ترشيح الأشعة فوق البنفسجية', description: 'Official Distributor', descriptionAr: 'موزع معتمد', icon: Filter },
  { caption: 'Industrial Pumps', captionAr: 'المضخات الصناعية', description: 'Certified Partner', descriptionAr: 'شريك معتمد', icon: Zap },
  { caption: 'Membrane Technology', captionAr: 'تقنية الأغشية', description: 'Strategic Alliance', descriptionAr: 'تحالف استراتيجي', icon: Droplets },
  { caption: 'Control Systems', captionAr: 'أنظمة التحكم', description: 'OEM Partner', descriptionAr: 'شريك OEM', icon: Cpu },
]

const easeOut = [0.22, 1, 0.36, 1] as const

export function ClientsSection() {
  const t = useTranslations('clients')

  return (
    <section id="clients" className="py-20 md:py-28 relative overflow-hidden bg-card">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mb-4 inline-block text-xs font-bold tracking-[3px] uppercase text-primary"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mb-4 text-3xl md:text-4xl font-bold text-foreground"
          >
            {t('title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15, ease: easeOut }}
            className="mx-auto h-[3px] w-12 rounded-full bg-primary"
          />
        </div>

        {/* Trusted By */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mb-16"
        >
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            {t('subtitleClients')}
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-4">
            {CLIENTS.map((client, i) => {
              const Icon = client.icon
              return (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: easeOut }}
                  className="group flex h-20 items-center justify-center gap-3 rounded-xl border border-border bg-background/50 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-card"
                >
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground text-center leading-tight">
                    {client.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Technology Partners */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            {t('subtitlePartners')}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_PARTNERS.map((partner, i) => {
              const Icon = partner.icon
              return (
                <motion.div
                  key={partner.caption}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: easeOut }}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background/50 p-6 text-center transition-all duration-300 hover:border-primary/30 hover:bg-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{partner.caption}</p>
                    <p className="mt-1 text-xs font-medium text-primary">{partner.description}</p>
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