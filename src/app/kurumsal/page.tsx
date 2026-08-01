import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { metadata as rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...rootMetadata,
  title: "Kurumsal | Necdet Bozkurt SMMM",
  description: "Necdet Bozkurt SMMM - 2012'den beri mali müşavirlik hizmeti. Misyon, vizyon ve değerlerimiz.",
};

export default function KurumsalPage() {
  return (
    <div className="section-spacing">
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Kurumsal"
            title="Hakkımızda"
            description="2012'den bu yana işletmenizin mali süreçlerinde güvenilir ortağınız."
          />
        </MotionWrapper>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <MotionWrapper variant="fade-left">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-2xl font-bold text-foreground">Misyonumuz</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                İşletmenizin mali süreçlerini profesyonelce yönetmek, vergi mevzuatına tam uyum sağlamak
                ve finansal sürdürülebilirlik için stratejik çözümler sunmak. Müşterilerimize şeffaf,
                güvenilir ve modern mali müşavirlik hizmeti ile yanında olmak.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-right">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h2 className="text-2xl font-bold text-foreground">Vizyonumuz</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Türkiye&#39;nin önde gelen ve tercih edilen serbest muhasebeci mali müşavirliği firması olmak.
                  Teknolojik yenilikleri takip ederek, müşterilerimize en güncel ve etkin mali danışmanlık
                  hizmetlerini sunmak.
                </p>
              </div>
          </MotionWrapper>
        </div>

        <MotionWrapper variant="fade-up" delay={0.2} className="mt-12">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Değerlerimiz</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">Güvenilirlik</h3>
                <p className="mt-2 text-sm text-muted">
                  Müşterilerimizin mali süreçlerinde şeffaf ve dürüst bir yaklaşım.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">Profesyonellik</h3>
                <p className="mt-2 text-sm text-muted">
                  Alanında uzman kadro ile en yüksek standartlarda hizmet.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">Yenilikçilik</h3>
                <p className="mt-2 text-sm text-muted">
                  Teknolojik gelişmeleri takip eden modern çözümler.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">Müşteri Odaklılık</h3>
                <p className="mt-2 text-sm text-muted">
                  Her müşterinin ihtiyaçlarına özel çözümler üretmek.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">Süreklilik</h3>
                <p className="mt-2 text-sm text-muted">
                  Kesintisiz destek ve uzun vadeli ilişkiler.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">Gelişim</h3>
                <p className="mt-2 text-sm text-muted">
                  Sürekli eğitim ve kendini geliştirme anlayışı.
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </div>
  );
}