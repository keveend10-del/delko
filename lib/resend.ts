import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

export function welcomeEmailHtml(clientName: string, businessName: string, dashboardUrl: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Berk Growth Co.</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;padding:0 20px;">
    <div style="background:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:40px;">

      <div style="display:flex;align-items:center;gap:8px;margin-bottom:32px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#1EFF96;"></div>
        <span style="color:#F5F5F5;font-size:14px;font-weight:600;letter-spacing:-0.02em;">Berk Growth Co.</span>
      </div>

      <h1 style="color:#F5F5F5;font-size:28px;font-weight:700;letter-spacing:-0.03em;margin:0 0 8px;">
        You're in. Let's get to work.
      </h1>
      <p style="color:rgba(255,255,255,0.5);font-size:15px;line-height:1.6;margin:0 0 32px;">
        Hi ${clientName}, welcome to Berk Growth Co. We're excited to work on ${businessName}.
      </p>

      <div style="background:rgba(30,255,150,0.05);border:1px solid rgba(30,255,150,0.15);border-radius:12px;padding:24px;margin-bottom:32px;">
        <p style="color:#1EFF96;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 16px;">What happens next</p>
        ${[
          ['Kickoff call scheduled within 48 hours', 'We\'ll send a calendar invite shortly.'],
          ['Full audit delivered in week 1', 'You\'ll see exactly where the gaps are.'],
          ['Campaigns live by week 3', 'We move fast.'],
        ].map(([title, desc], i) => `
        <div style="display:flex;gap:16px;margin-bottom:${i < 2 ? '16px' : '0'};">
          <div style="width:24px;height:24px;border-radius:50%;background:rgba(30,255,150,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#1EFF96;font-size:12px;font-weight:700;">${i + 1}</div>
          <div>
            <p style="color:#F5F5F5;font-size:14px;font-weight:600;margin:0 0 2px;">${title}</p>
            <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0;">${desc}</p>
          </div>
        </div>`).join('')}
      </div>

      <a href="${dashboardUrl}" style="display:block;background:#1EFF96;color:#0A0A0A;text-decoration:none;text-align:center;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:-0.01em;">
        View Your Client Dashboard →
      </a>

      <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:32px 0 0;">
        Questions? Reply to this email or text us directly. We respond fast.
      </p>
    </div>
  </div>
</body>
</html>`
}
