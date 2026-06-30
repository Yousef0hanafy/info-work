'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLocale } from '@/lib/i18n-client'

export function WhatsAppButton() {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <motion.a
      href="https://wa.me/201006249420"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 ${
        isRTL ? 'left-6' : 'right-6'
      }`}
      style={{ backgroundColor: '#25D366' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.2} />
    </motion.a>
  )
}