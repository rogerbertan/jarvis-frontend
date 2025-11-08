"use client";

import { motion } from "framer-motion";
import {
  Target,
  Clock,
  Shield,
  Zap,
  Brain,
  LineChart,
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Alcance Suas Metas Financeiras",
    description:
      "Defina objetivos claros e acompanhe seu progresso em tempo real. Jarvis ajuda você a manter o foco no que realmente importa.",
  },
  {
    icon: Clock,
    title: "Economize Tempo Valioso",
    description:
      "Automatize o controle de gastos e receba insights instantâneos. Menos tempo preenchendo planilhas, mais tempo vivendo.",
  },
  {
    icon: Brain,
    title: "Decisões Mais Inteligentes",
    description:
      "Use dados reais do seu comportamento financeiro para tomar decisões informadas sobre onde cortar gastos e onde investir.",
  },
  {
    icon: LineChart,
    title: "Visualize Padrões Ocultos",
    description:
      "Descubra tendências e hábitos de consumo que você nunca percebeu. Transforme dados em ações concretas.",
  },
  {
    icon: Shield,
    title: "Seus Dados em Segurança",
    description:
      "Criptografia de ponta a ponta e conformidade com LGPD. Suas informações financeiras protegidas com tecnologia de banco.",
  },
  {
    icon: Zap,
    title: "Resultados Rápidos",
    description:
      "Comece a ver melhorias nas suas finanças já na primeira semana. Interface intuitiva que qualquer pessoa pode usar.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

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
            Por Que Escolher{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Jarvis
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Mais do que um aplicativo de controle financeiro, Jarvis é seu
            parceiro inteligente para uma vida financeira saudável.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

                  <div className="relative h-full bg-card border border-border rounded-xl p-6 space-y-4 hover:border-primary/50 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-400 border-2 border-card flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-foreground">
              Junte-se a centenas de usuários que já transformaram suas
              finanças
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}