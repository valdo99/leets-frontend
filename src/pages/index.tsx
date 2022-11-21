import { DiscoverSection } from "@components/Landing/DiscoverSection";
import { Hero } from "@components/Landing/Hero";
import { HunterFeatures } from "@components/Landing/HuntersSection";

export default function Home() {
  return (
    <>
      <Hero />
      <HunterFeatures />
      <DiscoverSection />
    </>
  );
}
