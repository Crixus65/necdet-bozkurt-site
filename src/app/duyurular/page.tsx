import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsSection } from "@/components/sections/news-section";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { metadata as rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...rootMetadata,
  title: "Duyurular | Necdet Bozkurt SMMM",
  description: "Mali müşavirlik hizmetleri ile ilgili güncel duyurular ve haberler.",
};

export default function DuyurularPage() {
  return (
    <div className="section-spacing">
      <Container>
        <MotionWrapper variant="fade-up">
          <SectionHeading
            badge="Duyurular"
            title="Güncel Duyurular"
            description="Mali mevzuat, vergi ve muhasebe ile ilgili son duyurular ve haberler."
          />
        </MotionWrapper>
      </Container>

      <NewsSection />
    </div>
  );
}
