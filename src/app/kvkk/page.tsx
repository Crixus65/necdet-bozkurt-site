import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { metadata as rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...rootMetadata,
  title: "KVKK | Necdet Bozkurt SMMM",
  description: "Kişisel Verilerin Korunması Kanunu (KVKK) hakkında bilgilendirme sayfası.",
};

export default function KVKKPage() {
  return (
    <div className="section-spacing">
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="KVKK"
            title="Kişisel Verilerin Korunması"
            description="Kişisel verilerinizin korunması ve gizliliğiniz için alınan önlemler."
          />
        </MotionWrapper>

        <div className="mt-12 space-y-6">
          <MotionWrapper variant="fade-up" delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Veri Sorumlusu</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Serbest Muhasebeci Mali Müşavir Necdet Bozkurt olarak, kişisel verilerinizin korunmasına
                önem veriyoruz. KVKK kapsamında veri sorumlusu sıfatıyla hareket ediyoruz.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.2}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Toplanan Veriler</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                İletişim formları, randevu talepleri ve danışmanlık süreçlerinde adınız, soyadınız,
                telefon numaranız, e-posta adresiniz ve mali durumunuz ile ilgili bilgiler toplanmaktadır.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.3}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Verilerin Kullanım Amacı</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Toplanan kişisel veriler, sadece danışmanlık hizmeti sunmak, iletişim kurmak ve yasal
                yükümlülükleri yerine getirmek amacıyla kullanılmaktadır. Üçüncü taraflarla paylaşılmaz.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.4}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Haklarınız</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                KVKK kapsamında verilerinize erişim, düzeltme, silme ve itiraz etme haklarına sahipsiniz.
                Bu haklarınızı kullanmak için necdetbozkurt@gmail.com adresinden bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.5}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">İletişim</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                KVKK ile ilgili sorularınız için: necdetbozkurt@gmail.com
              </p>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </div>
  );
}