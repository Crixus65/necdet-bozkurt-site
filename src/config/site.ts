export const siteConfig = {
  name: "SMMM Necdet Bozkurt",
  shortName: "SMMM Necdet Bozkurt",
  title: "SMMM Necdet Bozkurt | Serbest Muhasebeci Mali Müşavir",
  description:
    "Necdet Bozkurt — Serbest Muhasebeci Mali Müşavir. Muhasebe, vergi danışmanlığı, şirket kuruluşu, SGK işlemleri, bordrolama ve finansal danışmanlık hizmetleri.",
  url: "https://necdetbozkurt.com",
  ogImage: "/opengraph-image",
  locale: "tr_TR",
  language: "tr",
  author: "Necdet Bozkurt",
  foundedYear: 2012,
  keywords: [
    "serbest muhasebeci mali müşavir",
    "muhasebeci",
    "mali müşavir",
    "vergi danışmanlığı",
    "şirket kuruluşu",
    "SGK işlemleri",
    "bordrolama",
    "finansal danışmanlık",
    "Necdet Bozkurt",
    "SMMM",
  ],
  contact: {
    phone: "+905433147385",
    phoneDisplay: "0543 314 73 85",
    email: "necdetbozkurt@gmail.com",
    whatsapp: "905433147385",
    address: {
      lines: [
        "ŞEREFİYE MAHALLESİ",
        "HASTANE 2 CADDESİ",
        "MEHMET NUR ARVAS İŞ MERKEZİ",
        "KAT 1",
        "NO 7",
      ],
      city: "Türkiye",
    },
    workingHours: {
      start: "09:30",
      end: "17:00",
    },
  },
  social: {
    instagram: "https://www.instagram.com/necdetbozkurttt/",
    whatsapp: "https://wa.me/905433147385",
  },
  maps: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1561.1614193043335!2d43.39809776027885!3d38.50326461662346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401270168f6df1a7%3A0xf2e991a0f56e7be3!2sMehmet%20Nur%20Arvas%20%C4%B0%C5%9E%20Merkezi!5e0!3m2!1str!2str!4v1783464201905!5m2!1str!2str",
    query: "Mehmet Nur Arvas İş Merkezi, Van",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Mehmet%20Nur%20Arvas%20İş%20Merkezi,%20Van",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function getFullAddress(): string {
  return siteConfig.contact.address.lines.join(", ");
}
