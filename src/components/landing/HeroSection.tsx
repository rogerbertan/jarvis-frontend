"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-16 h-16">
              <Image
                src="/jarvis_logo_nobg.svg"
                alt="Jarvis Logo"
                fill
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(27%) sepia(93%) saturate(5841%) hue-rotate(268deg) brightness(92%) contrast(120%)" }}
              />
            </div>
            <span className="text-4xl font-heading font-bold text-foreground">
              Jarvis
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight"
          >
            Gerencie Suas{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Finanças
            </span>{" "}
            com Inteligência
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-body"
          >
            Jarvis é seu assistente pessoal de controle de despesas. Rastreie
            gastos, analise padrões e tome decisões financeiras inteligentes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 group relative overflow-hidden"
            >
              <Link href="/register">
                <span className="relative z-10 flex items-center gap-2">
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 font-semibold text-lg px-8 py-6 group"
            >
              <Link href="#analytics-showcase">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>100% Gratuito para começar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Sem cartão de crédito</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full" />

            {/* Dashboard mockup placeholder - você pode substituir por uma imagem real */}
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 bg-primary/20 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-primary/20 rounded-full animate-pulse" />
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="bg-background border border-primary/20 rounded-lg p-4 space-y-2"
                    >
                      <div className="h-3 w-20 bg-muted-foreground/20 rounded" />
                      <div className="h-6 w-24 bg-primary/30 rounded" />
                    </motion.div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="h-40 bg-gradient-to-t from-primary/20 to-transparent rounded-lg flex items-end justify-around p-4 gap-2"
                >
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1.7 + i * 0.1, duration: 0.4 }}
                      className="w-full bg-primary/50 rounded-t"
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}