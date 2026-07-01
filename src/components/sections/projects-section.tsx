'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTranslations, useLocale } from '@/lib/i18n-client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Droplets,
  Waves,
  Wind,
  Flame,
  HardHat,
  Zap,
  Gauge,
  Clock,
  MapPin,
  Eye,
} from 'lucide-react'

interface Project {
  id: string
  titleEn: string
  titleAr: string
  category: string
  capacity: string | null
  duration: string | null
  location: string | null
  status: string
  year: number | null
  clientName?: string | null
}

const FALLBACK_PROJECTS: Project[] = [
  { id: '1', titleEn: 'Industrial Wastewater Treatment Plant', titleAr: 'محطة معالجة الصرف الصناعي', category: 'sewage-treatment', capacity: '200 m³/day', duration: '6 months', location: 'Shobra Shahab, Cairo', status: 'completed', year: 2022 },
  { id: '2', titleEn: 'Galala City Water Treatment Plant', titleAr: 'محطة معالجة مياه مدينة الجلالة', category: 'water-treatment', capacity: '1,000 m³/day', duration: '14 months', location: 'Galala City, Suez', status: 'completed', year: 2023 },
  { id: '3', titleEn: 'New Admin Capital — Government Complex HVAC', titleAr: 'العاصمة الإدارية الجديدة — تكييف المجمع الحكومي', category: 'hvac', capacity: '1,200 TR', duration: '10 months', location: 'New Admin Capital', status: 'in-progress', year: 2024 },
  { id: '4', titleEn: 'Fire Protection System — Industrial Zone', titleAr: 'نظام الحماية من الحرائق — المنطقة الصناعية', category: 'fire-fighting', capacity: '25,000 m²', duration: '5 months', location: '10th Ramadan City', status: 'completed', year: 2023 },
  { id: '5', titleEn: 'Sewage Treatment — Residential Compound', titleAr: 'معالجة الصرف الصحي — تجمع سكني', category: 'sewage-treatment', capacity: '350 m³/day', duration: '8 months', location: '6th October City', status: 'completed', year: 2023 },
  { id: '6', titleEn: 'Electromechanical Works — Water Station', titleAr: 'أعمال كهروميكانيكية — محطة مياه', category: 'electromechanical', capacity: 'Full scope', duration: '5 months', location: 'Suez', status: 'completed', year: 2024 },
  { id: '7', titleEn: 'Civil Works — Water Infrastructure', titleAr: 'أعمال مدنية — بنية تحتية مائية', category: 'civil-works', capacity: '2,500 m²', duration: '7 months', location: 'New Cairo', status: 'in-progress', year: 2025 },
  { id: '8', titleEn: 'UV Filtration System Upgrade', titleAr: 'ترقية نظام الترشيح بالأشعة فوق البنفسجية', category: 'water-treatment', capacity: '1,000 m³/day', duration: '3 months', location: 'Alexandria', status: 'completed', year: 2024 },
  { id: '9', titleEn: 'HVAC — Hospital Complex', titleAr: 'تكييف — مجمع مستشفيات', category: 'hvac', capacity: '200 TR', duration: '6 months', location: 'Sheikh Zayed City', status: 'completed', year: 2023 },
]

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'water-treatment': Droplets,
  'sewage-treatment': Waves,
  hvac: Wind,
  'fire-fighting': Flame,
  'civil-works': HardHat,
  electromechanical: Zap,
}

type FilterKey = 'all' | 'water-treatment' | 'sewage-treatment' | 'hvac' | 'fire-fighting' | 'civil-works' | 'electromechanical'

const FILTER_KEYS: FilterKey[] = ['all', 'water-treatment', 'sewage-treatment', 'hvac', 'fire-fighting', 'civil-works', 'electromechanical']

const easeOut = [0.22, 1, 0.36, 1] as const

export function ProjectsSection() {
  const t = useTranslations('projects')
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const locale = useLocale()

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data: Project[]) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(() => {})
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [projects, activeFilter])

  const filterLabels: Record<FilterKey, string> = {
    all: t('filterAll'),
    'water-treatment': t('filterWater'),
    'sewage-treatment': t('filterSewage'),
    hvac: t('filterHvac'),
    'fire-fighting': t('filterFireFighting'),
    'civil-works': t('filterCivil'),
    electromechanical: t('filterElectromechanical'),
  }

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* Subtle gradient */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mb-4 inline-block text-xs font-bold tracking-[3px] uppercase text-brand-glow"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mb-4 text-3xl md:text-4xl font-bold text-white"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="mx-auto mb-8 max-w-2xl text-base text-slate-400"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25, ease: easeOut }}
            className="mx-auto h-[3px] w-12 rounded-full bg-brand-accent"
          />
        </div>

        {/* Filter Bar */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center" style={{ scrollbarWidth: 'none' }}>
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20'
                  : 'border border-brand-border bg-transparent text-muted-foreground hover:border-brand-accent/40 hover:text-white'
              }`}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = CATEGORY_ICONS[project.category] || Zap
              const title = locale === 'ar' ? project.titleAr : project.titleEn
              const isCompleted = project.status === 'completed'

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="group relative overflow-hidden rounded-xl border border-brand-border bg-brand-surface transition-all duration-300 hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/5"
                >
                  {/* Header gradient */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/15 via-brand-accent/5 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="rounded-2xl p-5 transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}
                      >
                        <Icon className="h-10 w-10 text-brand-glow" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 rounded-full bg-brand-dark/80 backdrop-blur-sm border border-brand-border px-3 py-1 text-xs font-medium text-brand-glow">
                      {filterLabels[project.category as FilterKey] ?? project.category}
                    </span>

                    {/* Status badge */}
                    <span
                      className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                        isCompleted
                          ? 'bg-brand-success/80 text-white'
                          : 'bg-brand-warning/80 text-white'
                      }`}
                    >
                      {isCompleted ? t('completed') : t('inProgress')}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-accent/30">
                        <Eye className="h-4 w-4" />
                        {t('viewDetails')}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="mb-4 text-lg font-semibold text-white leading-snug">{title}</h3>

                    <div className="flex flex-wrap gap-2">
                      {project.capacity && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-dark/50 px-2.5 py-1.5 text-xs text-slate-400">
                          <Gauge className="h-3.5 w-3.5 text-brand-glow" />
                          {project.capacity}
                        </span>
                      )}
                      {project.duration && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-dark/50 px-2.5 py-1.5 text-xs text-slate-400">
                          <Clock className="h-3.5 w-3.5 text-brand-glow" />
                          {project.duration}
                        </span>
                      )}
                      {project.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-dark/50 px-2.5 py-1.5 text-xs text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-brand-glow" />
                          {project.location}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            {locale === 'ar' ? 'لا توجد مشاريع لهذه الفئة.' : 'No projects found for this category.'}
          </div>
        )}
      </div>
    </section>
  )
}