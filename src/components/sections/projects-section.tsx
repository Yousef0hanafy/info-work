'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslations, useLocale } from '@/lib/i18n-client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
import { ProjectDetailModal } from './project-detail-modal'

const PROJECT_IMAGES: Record<string, string> = {
  'water-treatment': '/images/projects/water-treatment.png',
  'sewage-treatment': '/images/projects/sewage-treatment.png',
  'hvac': '/images/projects/hvac-systems.png',
  'fire-fighting': '/images/projects/fire-fighting.png',
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

const FALLBACK_PROJECTS: Project[] = [
  { id: '1', titleEn: 'Industrial Wastewater Treatment Plant', titleAr: 'محطة معالجة الصرف الصناعي', category: 'sewage-treatment', capacity: '200 m³/day', duration: '6 months', location: 'Shobra Shahab, Cairo', status: 'completed', year: 2022, descriptionEn: 'Complete design and construction of an industrial wastewater treatment station inside an automated slaughterhouse facility. The project included collection tank construction, biological treatment systems, and full commissioning of all electromechanical equipment.', descriptionAr: 'تصميم وبناء كامل لمحطة معالجة الصرف الصناعي داخل مجزر آلي. تضمن المشروع بناء خزان التجميع وأنظمة المعالجة البيولوجية والتشغيل الكامل لجميع المعدات الكهروميكانيكية.', techSpecs: 'Biological treatment, collection tank, chemical dosing, sludge handling, PLC control system' },
  { id: '2', titleEn: 'Galala City Water Treatment Plant', titleAr: 'محطة معالجة مياه مدينة الجلالة', category: 'water-treatment', capacity: '1,000 m³/day', duration: '14 months', location: 'Galala City, Suez', status: 'completed', year: 2023, descriptionEn: 'Design-build water treatment facility serving the new Galala City development. The plant features multi-stage filtration, UV disinfection, and automated monitoring systems to ensure potable water quality standards.', descriptionAr: 'تصميم وبناء محطة معالجة مياه تخدم تطوير مدينة الجلالة الجديدة. تتميز المحطة بمراحل ترشيح متعددة وتعقيم بالأشعة فوق البنفسجية وأنظمة مراقمة آلية.', techSpecs: 'Multi-stage filtration, UV disinfection, automated monitoring, storage tanks, distribution pump station' },
  { id: '3', titleEn: 'New Admin Capital — Government Complex HVAC', titleAr: 'العاصمة الإدارية الجديدة — تكييف المجمع الحكومي', category: 'hvac', capacity: '1,200 TR', duration: '10 months', location: 'New Admin Capital', status: 'in-progress', year: 2024, descriptionEn: 'Full HVAC design and installation for a major government complex in the New Administrative Capital. The system includes chiller plants, AHU units, VRV systems, and a BMS for centralized control and energy optimization.', descriptionAr: 'تصميم وتركيب كامل لأنظمة التكييف لمجمع حكومي كبير في العاصمة الإدارية الجديدة. يتضمن النظام محطات تبريد ووحدات معالجة الهواء وأنظمة VRV ونظام إدارة المباني.', techSpecs: 'Chiller plants, AHU units, VRV systems, BMS integration, ductwork, heat recovery' },
  { id: '4', titleEn: 'Fire Protection System — Industrial Zone', titleAr: 'نظام الحماية من الحرائق — المنطقة الصناعية', category: 'fire-fighting', capacity: '25,000 m²', duration: '5 months', location: '10th Ramadan City', status: 'completed', year: 2023, descriptionEn: 'Comprehensive fire protection system covering 25,000 m² of industrial facilities. The project included wet and dry sprinkler systems, fire alarm panels, hose reel stations, and emergency evacuation systems.', descriptionAr: 'نظام حماية شامل من الحرائق يغطي ٢٥,٠٠٠ متر مربع من المنشآت الصناعية. تضمن المشروع أنظمة رشاشات رطبة وجافة ولوحات إنذار الحريق ومحطات خراطيم.', techSpecs: 'Wet/dry sprinkler systems, fire alarm panels, hose reels, FM200 zones, emergency lighting' },
  { id: '5', titleEn: 'Sewage Treatment — Residential Compound', titleAr: 'معالجة الصرف الصحي — تجمع سكني', category: 'sewage-treatment', capacity: '350 m³/day', duration: '8 months', location: '6th October City', status: 'completed', year: 2023, descriptionEn: 'Design and construction of a compact sewage treatment plant serving a residential compound. The system utilizes extended aeration activated sludge process with membrane bioreactor (MBR) technology for high-quality effluent suitable for landscape irrigation.', descriptionAr: 'تصميم وبناء محطة صرف صحي مضغوطة تخدم تجمعًا سكنيًا. تستخدم النظام عملية الحمأة المنشطة بالتهوية الممتدة مع تقنية MBR.', techSpecs: 'Extended aeration, MBR technology, UV disinfection, sludge dewatering, SCADA system' },
  { id: '6', titleEn: 'Electromechanical Works — Water Station', titleAr: 'أعمال كهروميكانيكية — محطة مياه', category: 'electromechanical', capacity: 'Full scope', duration: '5 months', location: 'Suez', status: 'completed', year: 2024, descriptionEn: 'Full-scope electromechanical installation for a water pumping station in Suez. Works included power distribution panels, motor control centers, PLC-based automation, telemetry systems, and all associated cabling and instrumentation.', descriptionAr: 'تركيب كهروميكانيكي شامل لمحطة ضخ مياه في السويس. شملت الأعمال لوحات التوزيع الكهربائي ومراكز التحكم في المحركات.', techSpecs: 'Power distribution, MCC panels, PLC automation, SCADA, telemetry, instrumentation' },
  { id: '7', titleEn: 'Civil Works — Water Infrastructure', titleAr: 'أعمال مدنية — بنية تحتية مائية', category: 'civil-works', capacity: '2,500 m²', duration: '7 months', location: 'New Cairo', status: 'in-progress', year: 2025, descriptionEn: 'Large-scale civil construction for water infrastructure in New Cairo. The scope covers excavation, earthworks, reinforced concrete foundations, underground pipe laying, and all associated structural and finishing works.', descriptionAr: 'بناء مدني واسع النطاق للبنية التحتية المائية في القاهرة الجديدة. يشمل النطاق الحفر والتسوية وأساسات الخرسانة المسلحة.', techSpecs: 'Excavation, reinforced concrete, underground piping, manholes, road works, landscaping' },
  { id: '8', titleEn: 'UV Filtration System Upgrade', titleAr: 'ترقية نظام الترشيح بالأشعة فوق البنفسجية', category: 'water-treatment', capacity: '1,000 m³/day', duration: '3 months', location: 'Alexandria', status: 'completed', year: 2024, descriptionEn: 'Retrofit and upgrade of an existing water treatment plant with advanced UV filtration technology. The upgrade improved disinfection efficiency by 40% while reducing chemical consumption and operational costs.', descriptionAr: 'تجديد وترقية محطة معالجة مياه قائمة بتقنية الترشيح بالأشعة فوق البنفسجية المتقدمة. حسنت الترقية كفاءة التعقيم بنسبة ٤٠٪.', techSpecs: 'UV reactor systems, pre-filtration, automatic cleaning, real-time UV dose monitoring' },
  { id: '9', titleEn: 'HVAC — Hospital Complex', titleAr: 'تكييف — مجمع مستشفيات', category: 'hvac', capacity: '200 TR', duration: '6 months', location: 'Sheikh Zayed City', status: 'completed', year: 2023, descriptionEn: 'Precision HVAC system design and installation for a hospital complex requiring strict air quality and infection control standards. The system features HEPA filtration, positive pressure isolation rooms, and energy-efficient chiller configurations.', descriptionAr: 'تصميم وتركيب نظام تكييف دقيق لمجمع مستشفيات يتطلب معايير صارمة لجودة الهواء ومكافحة العدوى.', techSpecs: 'HEPA filtration, positive/negative pressure rooms, VRF systems, energy recovery ventilation' },
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
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

  const openProjectDetail = useCallback((project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeProjectDetail = useCallback(() => {
    setModalOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => setSelectedProject(null), 300)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) closeProjectDetail()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen, closeProjectDetail])

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden bg-card">
      {/* Subtle gradient */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25, ease: easeOut }}
            className="mx-auto h-[3px] w-12 rounded-full bg-primary"
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
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'border border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground'
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
                  className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                  onClick={() => openProjectDetail(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') openProjectDetail(project) }}
                >
                  {/* Header - Image or Icon fallback */}
                  <div className="relative h-48 overflow-hidden">
                    {PROJECT_IMAGES[project.category] ? (
                      <Image
                        src={PROJECT_IMAGES[project.category]}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {!PROJECT_IMAGES[project.category] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="rounded-2xl p-5 transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}
                        >
                          <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                        </div>
                      </div>
                    )}

                    {/* Category badge */}
                    <span className="absolute top-3 start-3 rounded-full bg-background/80 backdrop-blur-sm border border-border px-3 py-1 text-xs font-medium text-primary">
                      {filterLabels[project.category as FilterKey] ?? project.category}
                    </span>

                    {/* Status badge */}
                    <span
                      className={`absolute top-3 end-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                        isCompleted
                          ? 'bg-emerald-500/80 text-white'
                          : 'bg-amber-500/80 text-white'
                      }`}
                    >
                      {isCompleted ? t('completed') : t('inProgress')}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30">
                        <Eye className="h-4 w-4" />
                        {t('viewDetails')}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="mb-4 text-lg font-semibold text-foreground leading-snug">{title}</h3>

                    <div className="flex flex-wrap gap-2">
                      {project.capacity && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">
                          <Gauge className="h-3.5 w-3.5 text-primary" />
                          {project.capacity}
                        </span>
                      )}
                      {project.duration && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          {project.duration}
                        </span>
                      )}
                      {project.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
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
          <div className="py-20 text-center text-muted-foreground">
            {locale === 'ar' ? 'لا توجد مشاريع لهذه الفئة.' : 'No projects found for this category.'}
          </div>
        )}
      </div>

      {/* Project Detail Side Panel */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={closeProjectDetail}
        filterLabels={filterLabels}
      />
    </section>
  )
}