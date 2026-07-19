import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import B2BSection from "@/components/home/B2BSection";
import Achievements from "@/components/home/Achievements";
import CtaBand from "@/components/ui/CtaBand";

export default function HomePage() {
  return (
    <>
      <div id="home"><Hero /></div>
      <div id="about"><WhyChooseUs /></div>
      <div id="services"><ServicesSection /></div>
      <div id="categories"><CategoriesGrid /></div>
      <div id="hotels-restaurants"><B2BSection /></div>
      <Achievements />
      <div id="contact"><CtaBand /></div>
    </>
  );
}
