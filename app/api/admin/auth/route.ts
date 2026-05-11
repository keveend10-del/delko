import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const token = Buffer.from(`${Date.now()}:${process.env.ADMIN_PASSWORD}`).toString('base64')
  cookies().set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
  })
  return NextResponse.json({ success: true })
}

export async function DELETE() {
  cookies().delete('admin_token')
  return NextResponse.json({ success: true })
}

