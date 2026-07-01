'use client'

import { useTranslations, useLocale, useDir } from '@/lib/i18n-client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  X,
  Gauge,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Building2,
  Droplets,
  Waves,
  Wind,
  Flame,
  HardHat,
  Zap,
} from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'water-treatment': Droplets,
  'sewage-treatment': Waves,
  hvac: Wind,
  'fire-fighting': Flame,
  'civil-works': HardHat,
  electromechanical: Zap,
}

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
  descriptionEn?: string | null
  descriptionAr?: string | null
  techSpecs?: string | null
  images?: string[] | null
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  filterLabels: Record<string, string>
}

const PROJECT_IMAGES: Record<string, string> = {
  'water-treatment': '/images/projects/water-treatment.png',
  'sewage-treatment': '/images/projects/sewage-treatment.png',
  'hvac': '/images/projects/hvac-systems.png',
  'fire-fighting': '/images/projects/fire-fighting.png',
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function ProjectDetailModal({ project, isOpen, onClose, filterLabels }: ProjectDetailModalProps) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const dir = useDir()
  const isRTL = dir === 'rtl'

  if (!project) return null

  const title = locale === 'ar' ? project.titleAr : project.titleEn
  const description = locale === 'ar'
    ? (project.descriptionAr || project.descriptionEn || '')
    : (project.descriptionEn || project.descriptionAr || '')
  const Icon = CATEGORY_ICONS[project.category] || Zap
  const isCompleted = project.status === 'completed'
  const categoryImage = PROJECT_IMAGES[project.category]

  const details = [
    { icon: Gauge, label: t('detailCapacity'), value: project.capacity },
    { icon: Clock, label: t('detailDuration'), value: project.duration },
    { icon: MapPin, label: t('detailLocation'), value: project.location },
    { icon: Calendar, label: t('detailYear'), value: project.year ? String(project.year) : null },
    { icon: Building2, label: t('detailClient'), value: project.clientName },
  ].filter(d => d.value)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: isRTL ? 400 : -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRTL ? 400 : -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-50 h-full w-full max-w-lg overflow-y-auto shadow-2xl border-s-0`}
            style={{
              backgroundColor: 'var(--color-card)',
              borderInlineStart: '1px solid var(--color-border)',
            }}
          >
            {/* Header Image */}
            <div className="relative h-64 overflow-hidden">
              {categoryImage ? (
                <Image
                  src={categoryImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="512px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 end-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white transition-colors hover:bg-black/60"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Status + Category badges */}
              <div className="absolute bottom-4 start-4 z-10 flex gap-2">
                <span className="rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-medium text-white">
                  {filterLabels[project.category] ?? project.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                    isCompleted
                      ? 'bg-emerald-500/80 text-white'
                      : 'bg-amber-500/80 text-white'
                  }`}
                >
                  {isCompleted ? t('completed') : t('inProgress')}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-2">
              {/* Title */}
              <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
                  {description}
                </p>
              )}

              {/* Tech Specs */}
              {project.techSpecs && (
                <div className="mb-6 rounded-xl border border-border p-4" style={{ backgroundColor: 'var(--color-muted)' }}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {t('detailTechSpecs')}
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {project.techSpecs}
                  </p>
                </div>
              )}

              {/* Details Grid */}
              {details.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {details.map((detail) => {
                    const DetailIcon = detail.icon
                    return (
                      <div
                        key={detail.label}
                        className="rounded-xl border border-border p-3.5"
                        style={{ backgroundColor: 'var(--color-muted)' }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <DetailIcon className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {detail.label}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {detail.value}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* No fallback icon needed for full-image categories */}
              {!categoryImage && (
                <div className="flex items-center justify-center py-8 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-muted)' }}>
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl"
                    style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}
                  >
                    <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}