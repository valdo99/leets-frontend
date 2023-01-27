import { ContactSection } from "@components/Landing/ContactSection";
import { DiscoverSection } from "@components/Landing/DiscoverSection";
import { Hero } from "@components/Landing/Hero";
import { HuntersSection } from "@components/Landing/HuntersSection";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { PageWithLayout } from "@types";

const Home: PageWithLayout = () => {
  return (
    <>
      <Hero />
      <DiscoverSection />
      <HuntersSection />
      <ContactSection />
    </>
  );
};

export default Home;

Home.getLayout = (page) => <DefaultLayout showFooter>{page}</DefaultLayout>;
