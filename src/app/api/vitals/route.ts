import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    // eslint-disable-next-line no-console
    console.log('[WebVitals API]', body?.name, Math.round(body?.value ?? 0), body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

