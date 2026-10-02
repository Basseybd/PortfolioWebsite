import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import OffTheClock from "@/components/OffTheClock";
import SideBuilds from "@/components/SideBuilds";
import Contact from "@/components/Contact";
import { timeline } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Timeline items={timeline} />
      <Services />
      <SideBuilds />
      <OffTheClock />
      <Contact />
    </>
  );
}
