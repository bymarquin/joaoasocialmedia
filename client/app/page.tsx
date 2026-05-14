import SectionNav from "@/components/layout/section-nav";
import ImmersiveCursor from "@/components/motion/immersive-cursor";
import Contact from "@/components/sections/contact";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/hero";
import Process from "@/components/sections/process";
import SelectedWork from "@/components/sections/selected-work";
import Services from "@/components/sections/services";
import SocialProof from "@/components/sections/social-proof";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      <ImmersiveCursor />
      <SectionNav />
      <Hero />
      <SelectedWork />
      <Contact />
      <Services />
      <Process />
      <SocialProof />
      <Faq />
    </main>
  );
}
