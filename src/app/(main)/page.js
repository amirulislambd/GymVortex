import EliteTrainers from "@/components/home/EliteTrainers";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";


export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedClasses />
        <EliteTrainers />
      </main>
    </>
  );
}
