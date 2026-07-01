'use client'

import { useEffect } from 'react'

interface LocaleUpdaterProps {
  locale: string
}

export function LocaleUpdater({ locale }: LocaleUpdaterProps) {
  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale])

  return null
}