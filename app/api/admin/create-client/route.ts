import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/admin'

export async function POST(req: NextRequest) {
  if (!verifyAdminToken(cookies().get('admin_token')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, businessName, email, pkg, customScope } = await req.json()
    if (!name || !businessName || !email || !pkg) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slug = generateSlug(businessName)
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('clients')
      .insert({
        slug,
        name,
        business_name: businessName,
        email,
        package: pkg,
        custom_scope: customScope || null,
        subscription_status: 'pending',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ slug, client: data })
  } catch (err) {
    console.error('create-client error:', err)
    const message = err instanceof Error ? err.message : 'Failed to create client'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
