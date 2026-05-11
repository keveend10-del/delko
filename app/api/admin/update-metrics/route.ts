import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/admin'

export async function POST(req: NextRequest) {
  if (!verifyAdminToken(cookies().get('admin_token')?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const {
      clientId, monthYear, leadsGenerated, costPerLead,
      rankingMovement, newReviews, adSpend, adBudget, nextSteps,
    } = await req.json()

    if (!clientId || !monthYear) {
      return NextResponse.json({ error: 'clientId and monthYear required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('monthly_metrics')
      .upsert(
        {
          client_id: clientId,
          month_year: monthYear,
          leads_generated: leadsGenerated ?? 0,
          cost_per_lead: costPerLead ?? 0,
          ranking_movement: rankingMovement ?? 0,
          new_reviews: newReviews ?? 0,
          ad_spend: adSpend ?? 0,
          ad_budget: adBudget ?? 0,
          next_steps: nextSteps || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'client_id,month_year' }
      )
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('update-metrics error:', err)
    return NextResponse.json({ error: 'Failed to update metrics' }, { status: 500 })
  }
}
