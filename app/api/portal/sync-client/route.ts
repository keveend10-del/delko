import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'

export async function POST() {
  // Verify session server-side
  const supabase = createClient()
  const { data: { user }, error: authErr } = await supabase.auth.getUser()

  if (authErr || !user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()
  const email = user.email.toLowerCase()
  const uid = user.id

  // 1. Look up by customer_user_id first (fastest, most precise)
  let { data: client } = await admin
    .from('clients')
    .select('*')
    .eq('customer_user_id', uid)
    .maybeSingle()

  // 2. Fall back to email match (handles rows created before auth link)
  if (!client) {
    const { data: byEmail } = await admin
      .from('clients')
      .select('*')
      .ilike('email', email)
      .maybeSingle()
    client = byEmail ?? null
  }

  if (client) {
    // 3. Backfill customer_user_id if missing
    if (!client.customer_user_id) {
      const { data: updated } = await admin
        .from('clients')
        .update({ customer_user_id: uid, updated_at: new Date().toISOString() })
        .eq('id', client.id)
        .select('*')
        .single()
      if (updated) client = updated
    }
  } else {
    // 4. No row at all — create a minimal placeholder client
    const emailPrefix = email.split('@')[0].replace(/[^a-z0-9]/gi, '-')
    const slug = generateSlug(emailPrefix)

    const { data: created, error: createErr } = await admin
      .from('clients')
      .insert({
        slug,
        name: emailPrefix,
        business_name: emailPrefix,
        email,
        customer_user_id: uid,
        package: null,
        subscription_status: 'pending',
        client_status: 'Active',
        payment_status: 'Not invoiced',
      })
      .select('*')
      .single()

    if (createErr) {
      return NextResponse.json({ error: createErr.message }, { status: 500 })
    }
    client = created
  }

  // 5. Ensure user_roles row exists for portal access
  await admin
    .from('user_roles')
    .upsert(
      { user_id: uid, role: 'client' },
      { onConflict: 'user_id,role', ignoreDuplicates: true }
    )

  return NextResponse.json({ client })
}
