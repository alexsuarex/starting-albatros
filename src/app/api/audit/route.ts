import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic server-side validation
    if (!data.name || !data.whatsapp || !data.email || !data.business || !data.industry || !data.city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Forward to n8n webhook if configured
    const webhookUrl = process.env.N8N_AUDIT_WEBHOOK;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (webhookError) {
        console.error('Webhook forward failed:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
