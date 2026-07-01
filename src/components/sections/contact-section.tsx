'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/i18n-client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Loader2, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const serviceKeys = [
  'waterTreatment',
  'sewageTreatment',
  'hvac',
  'fireFighting',
  'electromechanical',
  'civil',
  'equipment',
  'design',
] as const

const projectTypeKeys = [
  'newConstruction',
  'retrofit',
  'maintenance',
  'feasibility',
  'other',
] as const

const budgetKeys = [
  'under50k',
  '50k_200k',
  '200k_500k',
  '500k_1m',
  'over1m',
  'notSure',
] as const

const timelineKeys = [
  'immediate',
  '1to3',
  '3to6',
  '6to12',
  'planning',
] as const

const inputClasses =
  'w-full bg-brand-surface border border-brand-border rounded-xl h-11 px-4 text-white placeholder:text-muted-foreground focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-colors'

const selectClasses =
  'w-full bg-brand-surface border border-brand-border rounded-xl h-11 px-4 text-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-colors appearance-none cursor-pointer'

const labelClasses = 'text-sm font-medium text-muted-foreground mb-1.5 block'

const infoCards = [
  { key: 'address', icon: MapPin, labelKey: 'addressLabel', valueKey: 'address' },
  { key: 'phone', icon: Phone, labelKey: 'phoneLabel', valueKey: null },
  { key: 'email', icon: Mail, labelKey: 'emailLabel', valueKey: 'email' },
] as const

export function ContactSection() {
  const t = useTranslations('contact')
  const tServices = useTranslations('services')
  const tForm = useTranslations('contact.form')
  const tInfo = useTranslations('contact.info')
  const tBudget = useTranslations('contact.budgetOptions')
  const tTimeline = useTranslations('contact.timelineOptions')
  const tProjectType = useTranslations('contact.projectTypeOptions')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // Clear messages on change
    if (success) setSuccess(false)
    if (error) setError('')
  }

  function validate(): string | null {
    if (!formData.fullName.trim()) return 'Full name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      return 'Please enter a valid email address'
    if (!formData.phone.trim()) return 'Phone number is required'
    if (!formData.serviceInterest) return 'Please select a service interest'
    if (formData.message.trim().length < 20)
      return 'Message must be at least 20 characters'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || tForm('error'))
        return
      }

      setSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceInterest: '',
        projectType: '',
        budgetRange: '',
        timeline: '',
        message: '',
      })
    } catch {
      setError(tForm('error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
            {t('label')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left column — Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Success / Error Messages */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-brand-success/30 bg-brand-success/10 px-5 py-4 text-brand-success text-sm"
                >
                  {tForm('success')}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-brand-error/30 bg-brand-error/10 px-5 py-4 text-brand-error text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="fullName" className={labelClasses}>
                    {tForm('fullName')} <span className="text-brand-error">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={tForm('fullName')}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className={labelClasses}>
                    {tForm('email')} <span className="text-brand-error">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={tForm('email')}
                  />
                </div>
              </div>

              {/* Phone + Company row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="phone" className={labelClasses}>
                    {tForm('phone')} <span className="text-brand-error">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={tForm('phone')}
                  />
                </div>
                <div>
                  <Label htmlFor="company" className={labelClasses}>
                    {tForm('company')}
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={tForm('company')}
                  />
                </div>
              </div>

              {/* Service Interest */}
              <div>
                <Label htmlFor="serviceInterest" className={labelClasses}>
                  {tForm('serviceInterest')} <span className="text-brand-error">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    required
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="" className="bg-brand-surface text-muted-foreground">
                      {tForm('selectService')}
                    </option>
                    {serviceKeys.map((key) => (
                      <option key={key} value={key} className="bg-brand-surface text-white">
                        {tServices(`${key}.title`)}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-4">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Project Type + Budget Range row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="projectType" className={labelClasses}>
                    {tForm('projectType')}
                  </Label>
                  <div className="relative">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={selectClasses}
                    >
                      <option value="" className="bg-brand-surface text-muted-foreground">
                        {tForm('selectProjectType')}
                      </option>
                      {projectTypeKeys.map((key) => (
                        <option key={key} value={key} className="bg-brand-surface text-white">
                          {tProjectType(key)}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-4">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="budgetRange" className={labelClasses}>
                    {tForm('budgetRange')}
                  </Label>
                  <div className="relative">
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className={selectClasses}
                    >
                      <option value="" className="bg-brand-surface text-muted-foreground">
                        {tForm('selectBudget')}
                      </option>
                      {budgetKeys.map((key) => (
                        <option key={key} value={key} className="bg-brand-surface text-white">
                          {tBudget(key)}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-4">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <Label htmlFor="timeline" className={labelClasses}>
                  {tForm('timeline')}
                </Label>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="" className="bg-brand-surface text-muted-foreground">
                      {tForm('selectTimeline')}
                    </option>
                    {timelineKeys.map((key) => (
                      <option key={key} value={key} className="bg-brand-surface text-white">
                        {tTimeline(key)}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-4">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className={labelClasses}>
                  {tForm('message')} <span className="text-brand-error">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} h-auto min-h-[100px] resize-y`}
                  placeholder={tForm('messagePlaceholder')}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {tForm('submitting')}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {tForm('submit')}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right column — Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Address Card */}
            {infoCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-brand-surface border border-brand-border rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        {tInfo(card.labelKey)}
                      </p>
                      {card.key === 'phone' ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-white font-medium">
                            {tInfo('phone1')}
                          </span>
                          <span className="text-white font-medium">
                            {tInfo('phone2')}
                          </span>
                        </div>
                      ) : (
                        <p className="text-white font-medium">
                          {tInfo(card.valueKey!)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Urgency Note */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-brand-warning/5 border border-brand-warning/20 rounded-xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-brand-warning" />
                </div>
                <p className="text-brand-warning font-medium text-sm pt-2">
                  {tInfo('urgentNote')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}