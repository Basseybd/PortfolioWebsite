import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Timeline from "@/components/Timeline";
import Photography from "@/components/Photography";
import Services from "@/components/Services";
import SideBuilds from "@/components/SideBuilds";
import Contact from "@/components/Contact";
import { timeline } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Timeline items={timeline} />
      <Photography />
      <Services />
      <SideBuilds />
      <Contact />
    </>
  );
}
