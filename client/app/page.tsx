import SectionNav from "@/components/layout/section-nav";
import Contact from "@/components/sections/contact";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/hero";
import Process from "@/components/sections/process";
import SelectedWork from "@/components/sections/selected-work";
import Services from "@/components/sections/services";
import SocialProof from "@/components/sections/social-proof";
import Statement from "@/components/sections/statement";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      <SectionNav />
      <Hero />
      <Statement />
      <SelectedWork />
      <Services />
      <Process />
      <SocialProof />
      <Faq />
      <Contact />
    </main>
  );
}
