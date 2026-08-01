import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Ad soyad en az 2 karakter olmalıdır")
    .max(100, "Ad soyad en fazla 100 karakter olabilir"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz")
    .max(20, "Telefon numarası çok uzun")
    .regex(/^[\d\s+()-]+$/, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  subject: z
    .string()
    .min(3, "Konu en az 3 karakter olmalıdır")
    .max(150, "Konu en fazla 150 karakter olabilir"),
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir"),
  _honeypot: z.string().max(0, "Spam tespit edildi"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
