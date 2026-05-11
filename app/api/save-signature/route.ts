import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { clientSlug, signerName, signerDate } = await req.json()
    if (!clientSlug || !signerName || !signerDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase
      .from('clients')
      .update({
        signer_name: signerName,
        signer_date: signerDate,
        signed_at: new Date().toISOString(),
      })
      .eq('slug', clientSlug)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('save-signature error:', err)
    return NextResponse.json({ error: 'Failed to save signature' }, { status: 500 })
  }
}
