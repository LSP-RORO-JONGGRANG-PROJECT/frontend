import Image from "next/image";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Content from "@/components/content";
import Feature from "@/components/feature";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Header isActive = {true} />
      <HeroSection />
      <Feature />
    </main>
  );
}
