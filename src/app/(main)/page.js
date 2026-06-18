import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
        <StatsSection />
      </main>
    </>
  );
}
