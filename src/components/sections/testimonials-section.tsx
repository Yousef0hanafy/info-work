'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from '@/lib/i18n-client'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

interface Testimonial {
  id: string
  quoteEn: string | null
  quoteAr: string
  authorName: string
  authorRoleEn: string
  authorRoleAr: string
  organization: string | null
  rating: number
  projectType?: string | null
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quoteEn: 'We collaborated on the construction of a collection tank and an industrial wastewater treatment station inside the slaughterhouse. The team handled all requirements with great professionalism and completed the work in the shortest possible time, resolving every challenge we faced during on-site execution.',
    quoteAr: 'تم التعاون بيننا لانشاء خزان تجميع ومحطة صرف صناعي داخل المجزر وتم التعامل بحرفية مع جميع المتطلبات وانجازها فى اسرع وقت وحل جميع المشاكل التى واجهتنا اثناء سير العمل بالموقع',
    authorName: 'Nasser Fared Salem',
    authorRoleEn: 'Manager, Automated Slaughterhouse',
    authorRoleAr: 'مدير مجزر آلي',
    organization: 'Shobra Shahab',
    rating: 5,
    projectType: 'Industrial Wastewater',
  },
  {
    id: '2',
    quoteEn: 'We have worked together on several projects involving excavation, backfilling, concrete works, and finishing over the past 5 years. The work was completed on schedule with full financial commitment and zero delayed payments.',
    quoteAr: 'تم العمل على عدة مشاريع تتضمن اعمال حفر وردم واحلال وخرسانات وبعض اعمال التشطيبات منذ اكثر من 5 اعوام وتم انجاز العمل على حسب الخطة الزمنية المقررة للمشروع مع الالتزام الكامل بالجانب المادي من طرف الشركة',
    authorName: 'Hany Abbas',
    authorRoleEn: 'Contractor',
    authorRoleAr: 'مقاول',
    organization: null,
    rating: 5,
    projectType: 'Civil Construction',
  },
  {
    id: '3',
    quoteEn: 'Infeworks was selected based on their expertise in sewage and water treatment. They executed all sub-works without any contract breaches, delivering the highest quality on schedule and addressing all observations.',
    quoteAr: 'تم اختيار الشركة الدولية للاعمال الهندسية للتعاون فى عدة مشاريع استنادا على خبراتها فى مجالات محطات الصرف الصحي والمياه وتم التنفيذ باعلى جودة وفى وقت مناسب طبقا لجدول المشروع',
    authorName: 'Eng. Naser Hafny',
    authorRoleEn: 'Consulting Engineer',
    authorRoleAr: 'مهندس استشاري',
    organization: null,
    rating: 5,
    projectType: 'Water & Sewage Treatment',
  },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((part) => !['Col.', 'Eng.', 'Dr.', 'Mr.', 'Mrs.', 'م.'].includes(part))
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
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

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => {
            const quote = locale === 'ar'
              ? testimonial.quoteAr
              : (testimonial.quoteEn || testimonial.quoteAr)
            const role = locale === 'ar' ? testimonial.authorRoleAr : testimonial.authorRoleEn
            const initials = getInitials(testimonial.authorName)

            return (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                style={{ borderInlineStartWidth: 3, borderInlineStartColor: '#3B82F6' }}
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 end-6 h-8 w-8 text-primary/15" />

                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-none text-border'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p
                  className="mb-6 min-h-[100px] text-[15px] leading-relaxed text-foreground/70 italic"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary bg-primary/10">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
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