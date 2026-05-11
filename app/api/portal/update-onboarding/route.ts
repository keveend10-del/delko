import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest) {
  try {
    const { tasks } = await req.json() as { tasks: string[] }
    if (!Array.isArray(tasks)) {
      return NextResponse.json({ error: 'tasks must be an array' }, { status: 400 })
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Use admin client for the update (RLS on clients only has SELECT, not UPDATE yet)
    const adminClient = createAdminClient()
    const { error } = await adminClient
      .from('clients')
      .update({ onboarding_completed: tasks })
      .eq('email', user.email)

    if (error) throw new Error(error.message)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('update-onboarding error:', err)
    const message = err instanceof Error ? err.message : 'Failed to update onboarding'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
