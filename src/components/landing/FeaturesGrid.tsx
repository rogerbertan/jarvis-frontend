"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Wallet,
    title: "Dashboard em Tempo Real",
    description:
      "Visualize seu saldo atual, receitas e despesas do mês em um dashboard intuitivo e atualizado em tempo real.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: DollarSign,
    title: "Gestão Inteligente de Despesas",
    description:
      "Registre e categorize suas despesas facilmente. Acompanhe para onde seu dinheiro está indo com precisão.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Análises Avançadas",
    description:
      "Obtenha insights profundos sobre seus hábitos financeiros com gráficos, tendências e relatórios detalhados.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: PiggyBank,
    title: "Controle de Receitas",
    description:
      "Gerencie todas as suas fontes de renda e entenda melhor sua capacidade de poupança e investimento.",
    color: "from-orange-500 to-yellow-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function FeaturesGrid() {
  return (
    <section className="py-24 px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

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
            Tudo que Você Precisa para{" "}
            <span className="text-primary">Controlar Suas Finanças</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Ferramentas poderosas e intuitivas para transformar a forma como
            você gerencia seu dinheiro.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card className="group relative h-full p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 overflow-hidden">
                  {/* Hover gradient effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} p-3 shadow-lg`}
                    >
                      <Icon className="w-full h-full text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground font-body">
            E muito mais recursos sendo desenvolvidos para você 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
