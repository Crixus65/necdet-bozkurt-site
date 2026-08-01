import { HeroSection } from "@/components/sections/hero-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
