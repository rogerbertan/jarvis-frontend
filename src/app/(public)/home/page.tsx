import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { AnalyticsShowcase } from "@/components/landing/AnalyticsShowcase";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata = {
  title: "Jarvis - Seu Assistente Pessoal de Controle de Despesas",
  description:
    "Gerencie suas finanças com inteligência. Jarvis ajuda você a rastrear despesas, analisar padrões e tomar decisões financeiras inteligentes.",
  keywords: [
    "controle financeiro",
    "gestão de despesas",
    "finanças pessoais",
    "orçamento",
    "economia",
    "análise financeira",
  ],
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Full viewport with primary CTA */}
      <HeroSection />

      {/* Features Section - Showcase 4 main features */}
      <FeaturesGrid />

      {/* Analytics Showcase - Demonstrate the power of analytics */}
      <AnalyticsShowcase />

      {/* Benefits Section - Why choose Jarvis */}
      <BenefitsSection />

      {/* Pricing Section - Free and Premium plans */}
      <PricingSection />

      {/* FAQ Section - Answer common questions */}
      <FAQSection />

      {/* Final CTA Section - Last chance to convert */}
      <CTASection />

      {/* Footer - Links and legal info */}
      <LandingFooter />
    </main>
  );
}
