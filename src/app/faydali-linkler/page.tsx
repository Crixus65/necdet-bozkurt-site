import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";
import { ExternalLink } from "lucide-react";
import { metadata as rootMetadata } from "@/lib/metadata";

const faydaliLinkler = [
  {
    id: "1",
    title: "Gelir İdaresi Başkanlığı (GİB)",
    description: "Vergi beyannameleri, tarife bilgileri ve mevzuat duyuruları için resmî kaynak.",
    url: "https://www.gib.gov.tr",
  },
  {
    id: "2",
    title: "GİB Dijital Portal",
    description: "Vergi ve mali işlemlerinizi online olarak gerçekleştirebileceğiniz dijital platform.",
    url: "https://dijital.gib.gov.tr",
  },
  {
    id: "3",
    title: "Türkiye İş Kurumu (İŞKUR)",
    description: "Güncel iş ilanları, iş bulma ve işveren hizmetleri için resmî platform.",
    url: "https://www.iskur.gov.tr",
  },
  {
    id: "4",
    title: "Türkiye Muhasebeci Mali Müşavirler Odası (TÜRMOB)",
    description: "Mesleki yayınlar, eğitimler ve mevzuat değerlendirmeleri.",
    url: "https://www.turmob.com",
  },
  {
    id: "5",
    title: "Sosyal Güvenlik Kurumu (SGK)",
    description: "Prim tutarları, hizmet indirimleri ve SGK işlemleri için resmî kaynak.",
    url: "https://www.sgk.gov.tr",
  },
  {
    id: "6",
    title: "Resmî Gazete",
    description: "Yasalar, kanun hükümleri ve tebliğlerin yayınlandığı resmî yayın.",
    url: "https://www.resmigazete.gov.tr",
  },
  {
    id: "7",
    title: "Ticaret Bakanlığı",
    description: "Şirket kuruluşu, ticaret kayıtları ve bakanlık duyuruları.",
    url: "https://www.ticaret.gov.tr",
  },
  {
    id: "8",
    title: "Türkiye İstatistik Kurumu (TÜİK)",
    description: "Ekonomik veriler, enflasyon oranları ve istatistiksel veriler.",
    url: "https://www.tuik.gov.tr",
  },
  {
    id: "9",
    title: "Maliye Bakanlığı",
    description: "Maliye politikaları, bütçe ve vergi düzenlemeleri.",
    url: "https://www.maliye.gov.tr",
  },
  {
    id: "10",
    title: "E-Fatura Portalı",
    description: "E-fatura, e-arşiv ve e-defter sistemleri için giriş portalı.",
    url: "https://www.efatura.gov.tr",
  },
];

export const metadata: Metadata = {
  ...rootMetadata,
  title: "Faydalı Linkler | Necdet Bozkurt SMMM",
  description: "Muhasebe, vergi ve mali mevzuat ile ilgili faydalı resmî kaynaklar ve linkler.",
};

export default function FaydaliLinklerPage() {
  return (
    <div className="section-spacing">
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Faydalı Linkler"
            title="Resmî Kaynaklar"
            description="Muhasebe, vergi ve mali mevzuat ile ilgili faydalı resmî kurum ve platformlar."
          />
        </MotionWrapper>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {faydaliLinkler.map((link) => (
            <StaggerItem key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <ExternalLink className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {link.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {link.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Ziyaret Et</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </div>
  );
}