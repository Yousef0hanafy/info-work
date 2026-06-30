import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface ContactBody {
  fullName: string
  email: string
  phone: string
  company?: string
  serviceInterest: string
  projectType?: string
  budgetRange?: string
  timeline?: string
  message: string
}

function validateBody(body: unknown): { valid: boolean; error?: string; data?: ContactBody } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object.' }
  }

  const b = body as Record<string, unknown>

  const fullName = typeof b.fullName === 'string' ? b.fullName.trim() : ''
  const email = typeof b.email === 'string' ? b.email.trim() : ''
  const phone = typeof b.phone === 'string' ? b.phone.trim() : ''
  const company = typeof b.company === 'string' ? b.company.trim() : undefined
  const serviceInterest = typeof b.serviceInterest === 'string' ? b.serviceInterest.trim() : ''
  const projectType = typeof b.projectType === 'string' ? b.projectType.trim() : undefined
  const budgetRange = typeof b.budgetRange === 'string' ? b.budgetRange.trim() : undefined
  const timeline = typeof b.timeline === 'string' ? b.timeline.trim() : undefined
  const message = typeof b.message === 'string' ? b.message.trim() : ''

  if (!fullName) {
    return { valid: false, error: 'Full name is required.' }
  }
  if (!email) {
    return { valid: false, error: 'Email is required.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' }
  }
  if (!phone) {
    return { valid: false, error: 'Phone number is required.' }
  }
  if (!serviceInterest) {
    return { valid: false, error: 'Service interest is required.' }
  }
  if (!message) {
    return { valid: false, error: 'Message is required.' }
  }

  return {
    valid: true,
    data: {
      fullName,
      email,
      phone,
      company: company || undefined,
      serviceInterest,
      projectType: projectType || undefined,
      budgetRange: budgetRange || undefined,
      timeline: timeline || undefined,
      message,
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = validateBody(body)

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Validation error.' },
        { status: 400 }
      )
    }

    const data = validation.data

    await db.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        serviceInterest: data.serviceInterest,
        projectType: data.projectType,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        message: data.message,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Message received',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}