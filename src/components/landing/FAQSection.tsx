"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface IFAQ {
  question: string;
  answer: string;
}

const faqs: IFAQ[] = [
  {
    question: "O Jarvis é realmente gratuito?",
    answer:
      "Sim! O plano gratuito do Jarvis oferece recursos essenciais para controle financeiro, incluindo até 50 transações por mês, dashboard básico, categorização manual e gráficos de tendências. Você pode usar gratuitamente para sempre. O plano Premium oferece recursos avançados como transações ilimitadas, IA para categorização automática e análises preditivas.",
  },
  {
    question: "Meus dados financeiros estão seguros?",
    answer:
      "Absolutamente! Usamos criptografia de ponta a ponta (AES-256) para proteger seus dados, a mesma tecnologia usada por bancos. Todos os dados são armazenados de forma segura em servidores certificados e estamos em conformidade com a LGPD (Lei Geral de Proteção de Dados). Nunca compartilhamos suas informações com terceiros.",
  },
  {
    question: "Posso cancelar minha assinatura Premium a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua assinatura Premium a qualquer momento, sem taxas ou multas. Se cancelar, você continuará tendo acesso aos recursos Premium até o final do período já pago, e depois voltará automaticamente para o plano gratuito sem perder seus dados.",
  },
  {
    question: "Como funciona a categorização automática com IA?",
    answer:
      "No plano Premium, nossa inteligência artificial aprende com seus padrões de gastos e categoriza automaticamente novas transações com base em descrições, valores e histórico. Com o tempo, a precisão melhora, economizando seu tempo e garantindo consistência na organização das suas finanças.",
  },
  {
    question: "Posso exportar meus dados?",
    answer:
      "Sim! No plano gratuito, você pode exportar seus dados em formato CSV. No plano Premium, oferecemos exportação em múltiplos formatos (CSV, Excel, PDF) com relatórios personalizáveis e formatação profissional para análises mais detalhadas.",
  },
  {
    question: "Preciso conectar minha conta bancária?",
    answer:
      "Não é necessário! O Jarvis funciona com registro manual de transações, dando a você total controle sobre quais informações inserir. Isso garante ainda mais privacidade e segurança. Você pode adicionar despesas e receitas manualmente de forma rápida e simples.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Perguntas{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Tudo o que você precisa saber sobre o Jarvis
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "border-primary/50 shadow-lg shadow-primary/10"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 group"
                >
                  <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        openIndex === index
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground font-body leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground font-body">
            Ainda tem dúvidas?{" "}
            <a
              href="mailto:suporte@jarvis.com"
              className="text-primary hover:underline font-semibold"
            >
              Entre em contato conosco
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}