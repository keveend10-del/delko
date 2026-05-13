import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { client_id, body } = await request.json()
  if (!client_id || !body?.trim()) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const admin = createAdminClient()

  // Verify this auth user's email matches the client record
  const { data: clientRow } = await admin
    .from('clients')
    .select('id')
    .eq('id', client_id)
    .eq('email', user.email)
    .single()

  if (!clientRow) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { error } = await admin.from('client_messages').insert({
    client_id,
    sender_id: user.id,
    sender_role: 'client',
    body: body.trim(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
