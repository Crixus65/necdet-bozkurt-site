import { siteConfig } from "@/config/site";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BookOpen,
  Building2,
  Calculator,
  Clock,
  Eye,
  FileText,
  Landmark,
  MessageCircle,
  Percent,
  Receipt,
  Scale,
  Shield,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Faydalı Linkler", href: "/faydali-linkler" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const HERO_SERVICES = [
  "Muhasebe",
  "Vergi Danışmanlığı",
  "Şirket Kuruluşu",
  "SGK İşlemleri",
  "Bordrolama",
  "Finansal Danışmanlık",
] as const;

export const WHY_US_ITEMS = [
  {
    title: "2012'den Beri Deneyim",
    description: "Yılların getirdiği birikim ve sektör tecrübesiyle yanınızdayız.",
  },
  {
    title: "Güvenilir Hizmet",
    description: "Mali süreçlerinizde şeffaf ve güvenilir bir iş ortağı.",
  },
  {
    title: "Güncel Vergi Takibi",
    description: "Mevzuat değişikliklerini anlık takip ediyoruz.",
  },
  {
    title: "Profesyonel Danışmanlık",
    description: "İşletmenize özel stratejik mali danışmanlık hizmeti.",
  },
  {
    title: "Hızlı İletişim",
    description: "Sorularınıza hızlı dönüş ve kesintisiz destek.",
  },
  {
    title: "Şeffaf Hizmet",
    description: "Net fiyatlandırma ve açık iletişim anlayışı.",
  },
] as const;

export const SERVICES_LIST: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Muhasebe Hizmetleri",
    description: "Defter tutma, mali tablolar ve dönemsel raporlama hizmetleri.",
    icon: Calculator,
  },
  {
    title: "Vergi Danışmanlığı",
    description: "Vergi planlaması ve mevzuata uyum danışmanlığı.",
    icon: Scale,
  },
  {
    title: "Şirket Kuruluşu",
    description: "Limited, anonim ve şahıs şirketi kuruluş işlemleri.",
    icon: Building2,
  },
  {
    title: "SGK İşlemleri",
    description: "Personel bildirimleri ve SGK uyum süreçleri.",
    icon: Shield,
  },
  {
    title: "Bordrolama",
    description: "Maaş hesaplama, bordro ve özlük işlemleri.",
    icon: Wallet,
  },
  {
    title: "Finansal Danışmanlık",
    description: "Nakit akışı ve finansal planlama desteği.",
    icon: TrendingUp,
  },
  {
    title: "E-Defter",
    description: "Elektronik defter uygulaması ve berat işlemleri.",
    icon: BookOpen,
  },
  {
    title: "E-Fatura",
    description: "E-fatura geçiş ve entegrasyon danışmanlığı.",
    icon: FileText,
  },
  {
    title: "E-Arşiv",
    description: "E-arşiv fatura düzenleme ve raporlama.",
    icon: Archive,
  },
  {
    title: "KDV Danışmanlığı",
    description: "KDV beyannamesi ve iade süreçleri danışmanlığı.",
    icon: Percent,
  },
  {
    title: "Kurumlar Vergisi",
    description: "Kurumlar vergisi beyan ve planlama hizmetleri.",
    icon: Landmark,
  },
  {
    title: "Gelir Vergisi",
    description: "Gelir vergisi beyannamesi ve danışmanlık.",
    icon: Receipt,
  },
];

export const STATS_ITEMS = [
  {
    value: siteConfig.foundedYear,
    label: "Başlangıç yılı",
    type: "number" as const,
    suffix: "",
  },
  {
    value: 100,
    label: "Müşteri Memnuniyeti",
    type: "number" as const,
    suffix: "%",
  },
  {
    value: "7/24",
    label: "İletişim Desteği",
    type: "text" as const,
    suffix: "",
  },
  {
    value: "Güncel",
    label: "Mevzuat Takibi",
    type: "text" as const,
    suffix: "",
  },
];

export const FOOTER_CORPORATE_LINKS = [
  { label: "Neden Biz?", href: "/#neden-biz" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Mevzuat", href: "/mevzuat" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "Faydalı Linkler", href: "/faydali-linkler" },
] as const;

export const FOOTER_SERVICE_LINKS = SERVICES_LIST.slice(0, 6).map((service) => ({
  label: service.title,
  href: "/hizmetler",
}));

export const WHATSAPP_URL = `${siteConfig.social.whatsapp}?text=${encodeURIComponent(
  "Merhaba, muhasebe ve vergi danışmanlığı hizmetleriniz hakkında bilgi almak istiyorum.",
)}`;

export const WHY_US_ICONS = [Clock, Shield, Zap, TrendingUp, MessageCircle, Eye] as const;
