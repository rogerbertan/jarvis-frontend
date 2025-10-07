"use client";

import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Bem-vindo ao Jarvis
        </h1>
        <p className="text-muted-foreground">
          Seu assistente pessoal de controle de despesas
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Início Rápido</h2>
          <p className="text-muted-foreground">
            Navegue até a seção Despesas para começar a rastrear seus gastos.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Análises</h2>
          <p className="text-muted-foreground">
            Visualize análises detalhadas e insights sobre suas despesas (em
            breve).
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Configurações</h2>
          <p className="text-muted-foreground">
            Personalize suas preferências e gerencie as configurações da sua
            conta.
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
