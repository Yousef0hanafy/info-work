'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────
interface Testimonial {
  id: string
  quoteEn: string
  quoteAr: string
  authorName: string
  authorRoleEn: string
  authorRoleAr: string
  organization: string
  rating: number
}

// ── Fallback data ──────────────────────────────────────────────────────
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quoteEn:
      'We collaborated to build a collection tank and industrial sewage station inside the slaughterhouse. The team handled all requirements professionally and completed everything in record time, resolving all on-site challenges promptly.',
    quoteAr:
      'تم التعاون بيننا لانشاء خزان تجميع ومحطة صرف صناعي داخل المجزر وتم التعامل بحرفية مع جميع المتطلبات وانجازها فى اسرع وقت وحل جميع المشاكل التى واجهتنا اثناء سير العمل بالموقع',
    authorName: 'Col. Nasser Fared Salem',
    authorRoleEn: 'Manager, Automated Slaughterhouse',
    authorRoleAr: 'مدير مجزر آلي',
    organization: 'Shobra Shahab',
    rating: 5,
  },
  {
    id: '2',
    quoteEn:
      'We worked on multiple projects involving excavation, backfilling, concrete works, and finishing for over 5 years. Work was completed on schedule with full financial commitment and zero delayed payments.',
    quoteAr:
      'تم العمل على عدة مشاريع تتضمن اعمال حفر وردم واحلال وخرسانات وبعض اعمال التشطيبات منذ اكثر من 5 اعوام وتم انجاز العمل على حسب الخطة الزمنية المقررة للمشروع مع الالتزام الكامل بالجانب المادي من طرف الشركة',
    authorName: 'Hany Abbas',
    authorRoleEn: 'Contractor',
    authorRoleAr: 'مقاول',
    organization: '',
    rating: 5,
  },
  {
    id: '3',
    quoteEn:
      'Infeworks was selected based on their expertise in sewage and water treatment. They executed sub-works without any contract breaches, delivering the highest quality on schedule and addressing all observations.',
    quoteAr:
      'تم اختيار الشركة الدولية للاعمال الهندسية للتعاون فى عدة مشاريع استنادا على خبراتها فى مجالات محطات الصرف الصحي والمياه وتم التنفيذ باعلى جودة وفى وقت مناسب طبقا لجدول المشروع',
    authorName: 'Eng. Naser Hafny',
    authorRoleEn: 'Consulting Engineer',
    authorRoleAr: 'مهندس استشاري',
    organization: '',
    rating: 5,
  },
]

// ── Helpers ────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((part) => !['Col.', 'Eng.', 'Dr.', 'Mr.', 'Mrs.'].includes(part))
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ── Animation variants ─────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// ── Component ──────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)

  // Derive locale reactively from pathname
  const locale = useSyncExternalStore(
    () => () => {},
    () => (window.location.pathname.startsWith('/ar') ? 'ar' as const : 'en' as const),
    () => 'en' as const,
  )

  // Fetch from API
  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data)
      })
      .catch(() => {
        // Use fallback
      })
  }, [])

  return (
    <section id="testimonials" className="py-24" style={{ backgroundColor: '#0B1120' }}>
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-6 max-w-2xl text-base text-slate-400 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>
          <div className="mx-auto h-1 w-20 rounded-full bg-brand-accent" />
        </div>

        {/* ── Cards ───────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => {
            const quote = locale === 'ar' ? testimonial.quoteAr : testimonial.quoteEn
            const role = locale === 'ar' ? testimonial.authorRoleAr : testimonial.authorRoleEn
            const initials = getInitials(testimonial.authorName)

            return (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="group relative rounded-xl border border-brand-border bg-brand-surface p-6 transition-colors duration-300 hover:border-brand-accent/40"
                style={{ borderLeftWidth: 3, borderLeftColor: '#3B82F6' }}
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-accent/20" />

                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-none text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p
                  className="mb-6 min-h-[120px] text-base leading-relaxed text-slate-300 italic"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                  {/* Avatar with initials */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-sm font-bold text-brand-accent">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {testimonial.authorName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}