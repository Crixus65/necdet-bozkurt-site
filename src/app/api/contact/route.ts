import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";
import { getContactFormEmailTemplate } from "@/lib/email/templates/contact-form";
import { siteConfig } from "@/config/site";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(ip: string, maxRequests: number = 3, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyiniz." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate request data
    const validatedData = contactFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Geçersiz form verisi", details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, phone, email, subject, message } = validatedData.data;

    // Send email using Resend
    const data = await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: [siteConfig.contact.email],
      replyTo: email,
      subject: `İletişim Formu: ${subject}`,
      html: getContactFormEmailTemplate({
        name,
        phone,
        email,
        subject,
        message,
      }),
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json(
        { error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyiniz." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz." },
      { status: 500 }
    );
  }
}