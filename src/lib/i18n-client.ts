'use client'

import en from '@/messages/en.json'

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K
  }[keyof T & string]
  : never

export function useTranslations(namespace?: string) {
  if (namespace) {
    const ns = (en as Record<string, unknown>)[namespace] as Record<string, string> | undefined
    return (key: string, ...args: unknown[]) => {
      if (!ns) return key
      let val = ns[key] ?? key
      // Simple interpolation: {var} replacement
      args.forEach((arg, i) => {
        val = val.replace(`{${i}}`, String(arg))
      })
      return val
    }
  }
  return (key: NestedKeyOf<typeof en>, ...args: unknown[]) => {
    const keys = key.split('.')
    // @ts-expect-error — dynamic key access
    let val: unknown = en
    for (const k of keys) {
      if (val && typeof val === 'object' && k in (val as Record<string, unknown>)) {
        val = (val as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    let str = String(val ?? key)
    args.forEach((arg, i) => {
      str = str.replace(`{${i}}`, String(arg))
    })
    return str
  }
}

export function useLocale() {
  return 'en'
}