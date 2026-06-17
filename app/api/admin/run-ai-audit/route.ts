import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const QUERY_TEMPLATES = [
  (i: string, l: string) => `Best ${i} in ${l}`,
  (i: string, l: string) => `Who should I hire for ${i} near ${l}?`,
  (i: string, l: string) => `Top rated ${i} businesses in ${l}`,
  (i: string, l: string) => `Recommend a ${i} company in the ${l} area`,
  (i: string, l: string) => `${l} ${i} — who do locals recommend?`,
]

export async function POST(req: Request) {
  try {
    const { business_name, location, industry } = await req.json()

    if (!business_name || !location || !industry) {
      return NextResponse.json({ error: 'Missing business_name, location, or industry' }, { status: 400 })
    }

    const results: { query: string; response: string; mentioned: boolean; competitors: string[] }[] = []

    for (const template of QUERY_TEMPLATES) {
      const query = template(industry, location)

      const message = await anthropic.messages.create({
        model: 'claude-opus-4-8',
        max_tokens: 700,
        thinking: { type: 'adaptive' },
        messages: [{
          role: 'user',
          content: `You are simulating an AI search assistant response (like ChatGPT or Perplexity). A user searched: "${query}"

Respond naturally as that AI assistant would — recommend 3-5 specific local businesses in that area. Use realistic-sounding business names. Be helpful and specific.

After your response, on a new line write exactly:
BUSINESSES_MENTIONED: comma-separated list of business names you mentioned
TARGET_MENTIONED: yes or no — did you mention "${business_name}" specifically?`,
        }],
      })

      const text = message.content.find(b => b.type === 'text')?.text ?? ''

      const targetMatch = text.match(/TARGET_MENTIONED:\s*(yes|no)/i)
      const bizMatch = text.match(/BUSINESSES_MENTIONED:\s*(.+)/i)

      const mentioned =
        targetMatch?.[1]?.toLowerCase() === 'yes' ||
        text.toLowerCase().includes(business_name.toLowerCase())

      const competitors = (bizMatch?.[1] ?? '')
        .split(',')
        .map((b: string) => b.trim())
        .filter((b: string) => b && !b.toLowerCase().includes(business_name.toLowerCase()))
        .slice(0, 5)

      const cleanResponse = text
        .replace(/BUSINESSES_MENTIONED:.+/is, '')
        .replace(/TARGET_MENTIONED:.+/is, '')
        .trim()

      results.push({ query, response: cleanResponse, mentioned, competitors })
    }

    const mentioned_in = results.filter(r => r.mentioned).length
    const visibility_score = Math.round((mentioned_in / results.length) * 100)
    const all_competitors = [...new Set(results.flatMap(r => r.competitors))].slice(0, 10)

    return NextResponse.json({
      business_name,
      location,
      industry,
      results,
      visibility_score,
      queries_run: results.length,
      mentioned_in,
      competitors: all_competitors,
    })
  } catch (err: any) {
    console.error('AI audit error:', err)
    return NextResponse.json({ error: err.message ?? 'Audit failed' }, { status: 500 })
  }
}
