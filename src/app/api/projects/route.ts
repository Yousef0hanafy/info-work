import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json([])
  }
}
