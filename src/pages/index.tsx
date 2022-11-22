import { ContactSection } from "@components/Landing/ContactSection";
import { DiscoverSection } from "@components/Landing/DiscoverSection";
import { Hero } from "@components/Landing/Hero";
import { HuntersSection } from "@components/Landing/HuntersSection";

export default function Home() {
  return (
    <>
      <Hero />
      <HuntersSection />
      <DiscoverSection />
      <ContactSection />
    </>
  );
}
