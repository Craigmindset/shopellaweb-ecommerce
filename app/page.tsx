import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AdBanner from "./components/AdBanner";
import CategorySection from "./components/CategorySection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CategorySection />
      <ProductGrid />
      <AdBanner />

      <ProductGrid />
      <Footer />
    </div>
  );
}
