'use client'

import en from '@/messages/en.json'

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K
  }[keyof T & string]
  : never

/**
 * Resolve a dot-notated key against a nested object, returning the string value.
 * e.g. resolveNested(obj, 'waterTreatment.title') => "Water Treatment Plants"
 */
function resolveNested(obj: unknown, path: string): string {
  const result = resolvePath(obj, path)
  return typeof result === 'string' ? result : path
}

/**
 * Resolve a dot-notated path against a nested object, returning the raw value.
 * e.g. resolveNestedObj(en, 'contact.form') => { fullName: "...", ... }
 */
function resolveNestedObj(obj: unknown, path: string): unknown {
  return resolvePath(obj, path)
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

export function useTranslations(namespace?: string) {
  // Resolve namespace using deep path (e.g., 'contact.form' => en.contact.form)
  const ns = namespace ? resolveNestedObj(en, namespace) : en
  return (key: string, ...args: unknown[]) => {
    let val = resolveNested(ns, key)
    // Positional interpolation: {0}, {1}, etc.
    args.forEach((arg, i) => {
      val = val.replace(`{${i}}`, String(arg))
    })
    // Named interpolation from last arg if it's an object
    if (args.length > 0 && typeof args[args.length - 1] === 'object' && args[args.length - 1] !== null) {
      const params = args[args.length - 1] as Record<string, string>
      for (const [k, v] of Object.entries(params)) {
        val = val.replace(`{${k}}`, v)
      }
    }
    return val
  }
}

export function useLocale() {
  return 'en'
}