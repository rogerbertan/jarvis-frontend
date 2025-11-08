"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PricingPlan } from "@/types/pricing";

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Gratuito",
    description: "Perfeito para começar a organizar suas finanças",
    price: 0,
    period: "para sempre",
    featured: false,
    features: [
      { text: "Até 50 transações por mês", included: true },
      { text: "Dashboard básico em tempo real", included: true },
      { text: "Categorização manual", included: true },
      { text: "Gráficos de tendências simples", included: true },
      { text: "Exportação de dados (CSV)", included: true },
      { text: "Suporte por email", included: true },
      { text: "Análises avançadas", included: false },
      { text: "Relatórios personalizados", included: false },
      { text: "Suporte prioritário", included: false },
    ],
    ctaText: "Começar Gratuitamente",
    ctaLink: "/register",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Para quem quer controle total e insights avançados",
    price: 29.90,
    period: "por mês",
    featured: true,
    features: [
      { text: "Transações ilimitadas", included: true },
      { text: "Dashboard completo com widgets personalizáveis", included: true },
      { text: "Categorização automática com IA", included: true },
      { text: "Análises avançadas e preditivas", included: true },
      { text: "Relatórios personalizados (PDF, Excel)", included: true },
      { text: "Metas financeiras e alertas inteligentes", included: true },
      { text: "Múltiplas contas e cartões", included: true },
      { text: "Histórico ilimitado de dados", included: true },
      { text: "Suporte prioritário 24/7", included: true },
    ],
    ctaText: "Assinar Premium",
    ctaLink: "/register?plan=premium",
  },
];

export function PricingSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Escolha o Plano{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Ideal
            </span>{" "}
            para Você
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Comece gratuitamente e faça upgrade quando precisar de mais poder.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Popular badge */}
              {plan.featured && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">
                      Mais Popular
                    </span>
                  </div>
                </motion.div>
              )}

              <Card
                className={`relative h-full p-8 ${
                  plan.featured
                    ? "border-2 border-primary bg-card shadow-2xl shadow-primary/20"
                    : "border border-border bg-card"
                } transition-all duration-300 hover:shadow-xl ${
                  plan.featured ? "hover:shadow-primary/30" : "hover:shadow-muted/20"
                } overflow-hidden group`}
              >
                {/* Background gradient for featured */}
                {plan.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-50" />
                )}

                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground font-body">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-heading font-bold text-foreground">
                      R$ {plan.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-muted-foreground font-body">
                      /{plan.period}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="lg"
                    className={`w-full font-semibold ${
                      plan.featured
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-secondary hover:bg-secondary/80 text-foreground"
                    } group/button`}
                  >
                    <Link href={plan.ctaLink}>
                      <span className="flex items-center justify-center gap-2">
                        {plan.ctaText}
                        {plan.featured && (
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            →
                          </motion.span>
                        )}
                      </span>
                    </Link>
                  </Button>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Features list */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground font-body">
                      O que está incluído:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                              feature.included
                                ? "bg-primary/20"
                                : "bg-muted/20"
                            }`}
                          >
                            <Check
                              className={`w-3 h-3 ${
                                feature.included
                                  ? "text-primary"
                                  : "text-muted-foreground/40"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-sm font-body ${
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground/60 line-through"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 right-0 w-32 h-32 ${
                    plan.featured
                      ? "bg-gradient-to-tl from-primary/20"
                      : "bg-gradient-to-tl from-muted/20"
                  } rounded-tl-full`}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground font-body">
            ✨ Garantia de 30 dias ou seu dinheiro de volta • Cancele a qualquer
            momento
          </p>
        </motion.div>
      </div>
    </section>
  );
}