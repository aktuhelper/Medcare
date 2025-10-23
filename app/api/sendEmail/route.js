import { KoalaWelcomeEmail } from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const response = await req.json();
    console.log("📨 Email API called with data:", JSON.stringify(response, null, 2));

    const emailData = response.data;

    // ✅ Send email with verified domain sender
    const result = await resend.emails.send({
      from: 'Medcare  <medcare@aktuhelper.com>',
      to: emailData.Email,
      subject: 'Appointment Confirmation - Medcare',
      react: KoalaWelcomeEmail({
        userFirstname: emailData.username || "Customer",
        doctorname: emailData.doctorname || "Unknown Doctor",
        date: emailData.Date || "Unknown Date",
        time: emailData.Time || "Unknown Time",
      }),
    });
    
    console.log('✅ Email sent:', result);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('🔥 Email route error:', err.message || err);
    return NextResponse.json({ error: err.message || 'Unexpected server error' }, { status: 500 });
  }
}
