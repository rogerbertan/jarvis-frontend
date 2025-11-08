"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Recursos", href: "#features" },
    { label: "Análises", href: "#analytics-showcase" },
    { label: "Preços", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "Sobre", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Carreiras", href: "/careers" },
    { label: "Contato", href: "/contact" },
  ],
  legal: [
    { label: "Privacidade", href: "/privacy" },
    { label: "Termos de Uso", href: "/terms" },
    { label: "Segurança", href: "/security" },
    { label: "LGPD", href: "/lgpd" },
  ],
  support: [
    { label: "Central de Ajuda", href: "/help" },
    { label: "Status", href: "/status" },
    { label: "Documentação", href: "/docs" },
  ],
};

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:contato@jarvis.com",
    label: "Email",
  },
];

export function LandingFooter() {
  return (
    <footer className="relative border-t border-border bg-card/50 backdrop-blur-sm">
      {/* Gradient decoration */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10">
                  <Image
                    src="/jarvis_logo_nobg.svg"
                    alt="Jarvis Logo"
                    fill
                    className="object-contain transition-transform group-hover:scale-110"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(27%) sepia(93%) saturate(5841%) hue-rotate(268deg) brightness(92%) contrast(120%)",
                    }}
                  />
                </div>
                <span className="text-2xl font-heading font-bold text-foreground">
                  Jarvis
                </span>
              </Link>

              <p className="text-muted-foreground font-body max-w-xs">
                Seu assistente pessoal de controle de despesas. Gerencie suas
                finanças com inteligência.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/20 border border-border hover:border-primary/50 flex items-center justify-center transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="font-heading font-semibold text-foreground capitalize">
                  {category === "product"
                    ? "Produto"
                    : category === "company"
                    ? "Empresa"
                    : category === "legal"
                    ? "Legal"
                    : "Suporte"}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors font-body text-sm group inline-flex items-center"
                      >
                        <span className="group-hover:translate-x-1 transition-transform inline-block">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground font-body text-center md:text-left">
              © {new Date().getFullYear()} Jarvis. Todos os direitos reservados.
            </p>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>no Brasil</span>
            </div>

            {/* Language/Region selector (optional) */}
            <div className="flex items-center gap-4">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                🇧🇷 Português (BR)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}