import { createClient } from '../node_modules/@supabase/supabase-js/dist/index.mjs'

const SUPABASE_URL = 'https://kyrfhwyrehmbcqnywgsf.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5cmZod3lyZWhtYmNxbnl3Z3NmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI3NjM2NywiZXhwIjoyMDkzODUyMzY3fQ.rW0dQR0OrQ9Ys6HA__ZdyEhkXpFaYuByZv7SZUP4ZXY'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// ── Categories ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'c1000000-0000-0000-0000-000000000001', name: 'Kickoff & Onboarding',   sort_order: 1  },
  { id: 'c1000000-0000-0000-0000-000000000002', name: 'Brand & Assets',          sort_order: 2  },
  { id: 'c1000000-0000-0000-0000-000000000003', name: 'Website Audit',           sort_order: 3  },
  { id: 'c1000000-0000-0000-0000-000000000004', name: 'Website Build / Updates', sort_order: 4  },
  { id: 'c1000000-0000-0000-0000-000000000005', name: 'Google Business Profile', sort_order: 5  },
  { id: 'c1000000-0000-0000-0000-000000000006', name: 'Local SEO',               sort_order: 6  },
  { id: 'c1000000-0000-0000-0000-000000000007', name: 'Review Generation',       sort_order: 7  },
  { id: 'c1000000-0000-0000-0000-000000000008', name: 'Lead Capture',            sort_order: 8  },
  { id: 'c1000000-0000-0000-0000-000000000009', name: 'CRM Setup',               sort_order: 9  },
  { id: 'c1000000-0000-0000-0000-000000000010', name: 'Email & SMS Automation',  sort_order: 10 },
  { id: 'c1000000-0000-0000-0000-000000000011', name: 'Paid Advertising',        sort_order: 11 },
  { id: 'c1000000-0000-0000-0000-000000000012', name: 'Social Media',            sort_order: 12 },
  { id: 'c1000000-0000-0000-0000-000000000013', name: 'Analytics & Tracking',    sort_order: 13 },
  { id: 'c1000000-0000-0000-0000-000000000014', name: 'Content',                 sort_order: 14 },
  { id: 'c1000000-0000-0000-0000-000000000015', name: 'Monthly Reporting',       sort_order: 15 },
  { id: 'c1000000-0000-0000-0000-000000000016', name: 'Launch & Handover',       sort_order: 16 },
]

// ── Template items ──────────────────────────────────────────────────────────
const c = (n) => `c1000000-0000-0000-0000-${String(n).padStart(12, '0')}`
const ITEMS = [
  // Kickoff & Onboarding
  { category_id: c(1), label: 'Kickoff call completed',                        sort_order: 1 },
  { category_id: c(1), label: 'Client contract signed',                        sort_order: 2 },
  { category_id: c(1), label: 'Onboarding questionnaire received',             sort_order: 3 },
  { category_id: c(1), label: 'Project scope confirmed in writing',            sort_order: 4 },
  { category_id: c(1), label: 'Client added to portal',                        sort_order: 5 },
  // Brand & Assets
  { category_id: c(2), label: 'Logo files received (SVG/PNG)',                 sort_order: 1 },
  { category_id: c(2), label: 'Brand colors confirmed',                        sort_order: 2 },
  { category_id: c(2), label: 'Brand fonts confirmed',                         sort_order: 3 },
  { category_id: c(2), label: 'Photo/video assets received',                   sort_order: 4 },
  { category_id: c(2), label: 'Brand voice notes documented',                  sort_order: 5 },
  // Website Audit
  { category_id: c(3), label: 'Website login credentials received',            sort_order: 1 },
  { category_id: c(3), label: 'Site speed tested (PageSpeed Insights)',        sort_order: 2 },
  { category_id: c(3), label: 'Mobile responsiveness checked',                 sort_order: 3 },
  { category_id: c(3), label: 'Broken links scanned',                          sort_order: 4 },
  { category_id: c(3), label: 'On-page SEO reviewed (titles, metas, H1s)',     sort_order: 5 },
  { category_id: c(3), label: 'Audit report delivered to client',              sort_order: 6 },
  // Website Build / Updates
  { category_id: c(4), label: 'Homepage copy written and approved',            sort_order: 1 },
  { category_id: c(4), label: 'Service pages created',                         sort_order: 2 },
  { category_id: c(4), label: 'Contact / lead form live and tested',           sort_order: 3 },
  { category_id: c(4), label: 'CTA buttons in place on all key pages',         sort_order: 4 },
  { category_id: c(4), label: 'Client review and sign-off received',           sort_order: 5 },
  { category_id: c(4), label: 'Site published / changes pushed live',          sort_order: 6 },
  // Google Business Profile
  { category_id: c(5), label: 'GBP manager access granted',                    sort_order: 1 },
  { category_id: c(5), label: 'Business info fully filled out',                sort_order: 2 },
  { category_id: c(5), label: 'Photos uploaded (exterior, interior, team)',    sort_order: 3 },
  { category_id: c(5), label: 'Services and products listed',                  sort_order: 4 },
  { category_id: c(5), label: 'Q&A section seeded',                            sort_order: 5 },
  { category_id: c(5), label: 'GBP posting schedule set',                      sort_order: 6 },
  // Local SEO
  { category_id: c(6), label: 'Target keywords researched and confirmed',      sort_order: 1 },
  { category_id: c(6), label: 'Service-area pages created',                    sort_order: 2 },
  { category_id: c(6), label: 'Citation audit run',                            sort_order: 3 },
  { category_id: c(6), label: 'NAP consistency fixed across directories',      sort_order: 4 },
  { category_id: c(6), label: 'Schema markup added (LocalBusiness)',           sort_order: 5 },
  { category_id: c(6), label: 'Internal linking structure optimized',          sort_order: 6 },
  // Review Generation
  { category_id: c(7), label: 'Google review link created and tested',         sort_order: 1 },
  { category_id: c(7), label: 'Review request script written',                 sort_order: 2 },
  { category_id: c(7), label: 'QR code or NFC card created',                   sort_order: 3 },
  { category_id: c(7), label: 'Automated review request SMS/email set up',     sort_order: 4 },
  { category_id: c(7), label: 'Client trained on asking for reviews',          sort_order: 5 },
  // Lead Capture
  { category_id: c(8), label: 'Lead capture form live on site',                sort_order: 1 },
  { category_id: c(8), label: 'Form submissions routing to CRM or email',      sort_order: 2 },
  { category_id: c(8), label: 'Confirmation / thank-you message set up',       sort_order: 3 },
  { category_id: c(8), label: 'Lead magnet or offer on page',                  sort_order: 4 },
  { category_id: c(8), label: 'Form tested end-to-end',                        sort_order: 5 },
  // CRM Setup
  { category_id: c(9), label: 'CRM account created for client',                sort_order: 1 },
  { category_id: c(9), label: 'Lead pipeline stages configured',               sort_order: 2 },
  { category_id: c(9), label: 'Lead capture form connected to CRM',            sort_order: 3 },
  { category_id: c(9), label: 'Client trained on CRM use',                     sort_order: 4 },
  // Email & SMS Automation
  { category_id: c(10), label: 'Welcome / follow-up sequence written',         sort_order: 1 },
  { category_id: c(10), label: 'Sequence live and triggered on form submit',   sort_order: 2 },
  { category_id: c(10), label: 'SMS follow-up message live',                   sort_order: 3 },
  { category_id: c(10), label: 'Unsubscribe / opt-out compliant',              sort_order: 4 },
  { category_id: c(10), label: 'Test submission run through full flow',        sort_order: 5 },
  // Paid Advertising
  { category_id: c(11), label: 'Ad account access granted',                    sort_order: 1 },
  { category_id: c(11), label: 'Campaign goal and budget confirmed',           sort_order: 2 },
  { category_id: c(11), label: 'Ad copy and creative approved',                sort_order: 3 },
  { category_id: c(11), label: 'Landing page live and conversion-ready',       sort_order: 4 },
  { category_id: c(11), label: 'Conversion tracking confirmed',                sort_order: 5 },
  { category_id: c(11), label: 'Ads live and first results reviewed',          sort_order: 6 },
  // Social Media
  { category_id: c(12), label: 'Social profiles audited and optimized',        sort_order: 1 },
  { category_id: c(12), label: 'Content calendar created',                     sort_order: 2 },
  { category_id: c(12), label: 'First month of posts drafted',                 sort_order: 3 },
  { category_id: c(12), label: 'Posts scheduled in tool',                      sort_order: 4 },
  { category_id: c(12), label: 'Client approved content batch',                sort_order: 5 },
  // Analytics & Tracking
  { category_id: c(13), label: 'Google Analytics 4 installed and verified',   sort_order: 1 },
  { category_id: c(13), label: 'Google Search Console connected',              sort_order: 2 },
  { category_id: c(13), label: 'Call tracking number set up',                  sort_order: 3 },
  { category_id: c(13), label: 'Goal / conversion events firing correctly',    sort_order: 4 },
  { category_id: c(13), label: 'Baseline metrics documented',                  sort_order: 5 },
  // Content
  { category_id: c(14), label: 'Content topics researched and approved',       sort_order: 1 },
  { category_id: c(14), label: 'Blog / service page articles drafted',         sort_order: 2 },
  { category_id: c(14), label: 'Content reviewed and edited',                  sort_order: 3 },
  { category_id: c(14), label: 'Content published on site',                    sort_order: 4 },
  { category_id: c(14), label: 'Internal links added',                         sort_order: 5 },
  // Monthly Reporting
  { category_id: c(15), label: 'Reporting dashboard set up',                   sort_order: 1 },
  { category_id: c(15), label: 'Monthly report template created',              sort_order: 2 },
  { category_id: c(15), label: 'First report delivered',                       sort_order: 3 },
  { category_id: c(15), label: 'Monthly strategy call scheduled',              sort_order: 4 },
  // Launch & Handover
  { category_id: c(16), label: 'All deliverables QA checked',                  sort_order: 1 },
  { category_id: c(16), label: 'Client walkthrough call completed',            sort_order: 2 },
  { category_id: c(16), label: 'Credentials and assets handed over securely', sort_order: 3 },
  { category_id: c(16), label: 'Retainer or next steps confirmed',             sort_order: 4 },
  { category_id: c(16), label: 'Project marked complete in system',            sort_order: 5 },
]

async function run() {
  console.log('── Clearing existing categories (cascades to template items) ──')
  const { error: delErr } = await supabase
    .from('checklist_categories')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // delete all

  if (delErr) {
    console.error('Delete failed:', delErr.message)
    console.error('Tables may not exist yet. Run CREATE TABLE SQL in Supabase dashboard first.')
    process.exit(1)
  }

  console.log('── Inserting 16 categories ──')
  const { error: catErr } = await supabase.from('checklist_categories').insert(CATEGORIES)
  if (catErr) { console.error('Category insert failed:', catErr.message); process.exit(1) }
  console.log(`  ✓ ${CATEGORIES.length} categories inserted`)

  console.log('── Inserting template items ──')
  const { error: itemErr } = await supabase.from('checklist_template_items').insert(ITEMS)
  if (itemErr) { console.error('Template item insert failed:', itemErr.message); process.exit(1) }
  console.log(`  ✓ ${ITEMS.length} template items inserted`)

  console.log('── Fetching first project to apply templates ──')
  const { data: projects, error: projErr } = await supabase
    .from('projects')
    .select('id, project_name')
    .order('created_at', { ascending: false })
    .limit(1)

  if (projErr || !projects?.length) {
    console.log('No projects found. Create one in admin then click "Apply templates".')
    return
  }

  const project = projects[0]
  console.log(`  → Applying to: "${project.project_name}" (${project.id})`)

  const { data: rpcResult, error: rpcErr } = await supabase.rpc(
    'apply_checklist_templates_to_project',
    { _project_id: project.id }
  )

  if (rpcErr) {
    console.error('RPC error:', rpcErr.message)
    if (rpcErr.message.includes('does not exist') || rpcErr.code === '42883') {
      console.log('\n⚠  The apply_checklist_templates_to_project function is missing.')
      console.log('   Run the CREATE FUNCTION SQL from the previous message in your Supabase SQL editor,')
      console.log('   then click "Apply templates" in the UI.')
    }
    process.exit(1)
  }

  console.log(`  ✓ ${rpcResult} checklist items applied to "${project.project_name}"`)
  console.log('\nDone. Go to Admin → Checklists to see the result.')
}

run()
