export type PricingTier = "free" | "premium";

export interface IPricingFeature {
  text: string;
  included: boolean;
}

export interface IPricingPlan {
  id: PricingTier;
  name: string;
  description: string;
  price: number;
  period: string;
  featured: boolean;
  features: IPricingFeature[];
  ctaText: string;
  ctaLink: string;
}
