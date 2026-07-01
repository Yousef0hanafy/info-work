'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import en from '@/messages/en.json'
import ar from '@/messages/ar.json'

type Locale = 'en' | 'ar'

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  dir: 'ltr' | 'rtl'
}

export const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  dir: 'ltr',
})

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('infeworks-locale') as Locale | null
  return saved === 'ar' || saved === 'en' ? saved : 'en'
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', locale)
    html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('infeworks-locale', locale)
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
  }, [])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLocale(): Locale {
  return useContext(I18nContext).locale
}

export function useDir(): 'ltr' | 'rtl' {
  return useContext(I18nContext).dir
}

function resolvePath(obj: unknown, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = obj
  for (const k of keys) {
    if (current && typeof current === 'object' && k in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[k]
    } else {
      return path
    }
  }
  return current
}

function resolveNested(obj: unknown, path: string): string {
  const result = resolvePath(obj, path)
  return typeof result === 'string' ? result : path
}

const messages: Record<Locale, Record<string, unknown>> = { en: en as never, ar: ar as never }

export function useTranslations(namespace?: string) {
  const { locale } = useContext(I18nContext)
  const root = messages[locale]
  const ns = namespace ? resolvePath(root, namespace) : root

  return (key: string, ...args: unknown[]) => {
    let val = resolveNested(ns, key)

    args.forEach((arg, i) => {
      val = val.replace(`{${i}}`, String(arg))
    })

    const lastArg = args[args.length - 1]
    if (args.length > 0 && typeof lastArg === 'object' && lastArg !== null) {
      const params = lastArg as Record<string, string>
      for (const [k, v] of Object.entries(params)) {
        val = val.replace(`{${k}}`, v)
      }
    }

    return val
  }
}