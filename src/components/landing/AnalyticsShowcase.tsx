"use client";

import { motion, useInView } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";

const stats = [
  {
    label: "Despesas Rastreadas",
    value: 1247,
    suffix: "+",
    icon: BarChart3,
  },
  {
    label: "Taxa de Economia",
    value: 32,
    suffix: "%",
    icon: TrendingUp,
  },
  {
    label: "Categorias",
    value: 15,
    suffix: "+",
    icon: PieChart,
  },
  {
    label: "Dias Ativos",
    value: 180,
    suffix: "+",
    icon: Calendar,
  },
];

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function AnalyticsShowcase() {
  return (
    <section
      id="analytics-showcase"
      className="py-24 px-12 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

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
            Análises Que{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Transformam Dados
            </span>{" "}
            em Decisões
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Visualize seus hábitos financeiros com gráficos intuitivos e
            insights acionáveis.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-3xl font-heading font-bold text-foreground"
                    >
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </motion.div>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Analytics preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-8 bg-card border border-primary/20 shadow-2xl shadow-primary/10 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground mb-1">
                    Visão Geral Mensal
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Análise detalhada das suas finanças
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Atualizado agora
                  </span>
                </div>
              </div>

              {/* Chart visualization */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bar chart */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground font-body">
                    Despesas por Categoria
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        label: "Alimentação",
                        value: 75,
                        color: "bg-purple-500",
                      },
                      { label: "Transporte", value: 55, color: "bg-blue-500" },
                      { label: "Moradia", value: 90, color: "bg-green-500" },
                      { label: "Lazer", value: 40, color: "bg-orange-500" },
                    ].map((category, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="space-y-1"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {category.label}
                          </span>
                          <span className="text-foreground font-semibold">
                            {category.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${category.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                            className={`h-full ${category.color} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trend chart */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground font-body">
                    Tendência de Gastos (Últimos 7 dias)
                  </h4>
                  <div className="h-40 flex items-end justify-between gap-2">
                    {[45, 65, 55, 80, 60, 90, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-primary to-purple-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Seg</span>
                    <span>Ter</span>
                    <span>Qua</span>
                    <span>Qui</span>
                    <span>Sex</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>
                </div>
              </div>

              {/* Insight card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-foreground mb-1 font-body">
                      💡 Insight Inteligente
                    </h5>
                    <p className="text-sm text-muted-foreground font-body">
                      Você gastou 15% menos este mês comparado ao anterior.
                      Continue assim para atingir sua meta de economia!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
