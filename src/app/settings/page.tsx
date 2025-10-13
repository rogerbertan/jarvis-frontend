"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Globe, Moon, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Personalize sua experiência no Jarvis
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Moon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>
                  Customize a aparência do aplicativo
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">
                  Modo Escuro
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ativar tema escuro no aplicativo
                </p>
              </div>
              <Switch id="dark-mode" disabled />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-mode" className="text-base">
                  Modo Compacto
                </Label>
                <p className="text-sm text-muted-foreground">
                  Reduzir espaçamento entre elementos
                </p>
              </div>
              <Switch id="compact-mode" disabled />
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Idioma e Região</CardTitle>
                <CardDescription>
                  Configure o idioma e formato de exibição
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma do Aplicativo</Label>
              <Select defaultValue="pt-br" disabled>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <Select defaultValue="brl" disabled>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Selecione a moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brl">Real (BRL)</SelectItem>
                  <SelectItem value="usd">Dólar (USD)</SelectItem>
                  <SelectItem value="eur">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="date-format">Formato de Data</Label>
              <Select defaultValue="dd/mm/yyyy" disabled>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Gerencie suas preferências de notificações
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="expense-notifications" className="text-base">
                  Notificações de Despesas
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas sobre novas despesas
                </p>
              </div>
              <Switch id="expense-notifications" disabled />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="budget-alerts" className="text-base">
                  Alertas de Orçamento
                </Label>
                <p className="text-sm text-muted-foreground">
                  Avisos quando atingir limites de gastos
                </p>
              </div>
              <Switch id="budget-alerts" disabled />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monthly-reports" className="text-base">
                  Relatórios Mensais
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receber resumo mensal de finanças
                </p>
              </div>
              <Switch id="monthly-reports" disabled />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Segurança e Privacidade</CardTitle>
                <CardDescription>Configure opções de segurança</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor" className="text-base">
                  Autenticação de Dois Fatores
                </Label>
                <p className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança
                </p>
              </div>
              <Switch id="two-factor" disabled />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="biometric" className="text-base">
                  Autenticação Biométrica
                </Label>
                <p className="text-sm text-muted-foreground">
                  Usar impressão digital ou Face ID
                </p>
              </div>
              <Switch id="biometric" disabled />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="session-timeout" className="text-base">
                  Timeout de Sessão
                </Label>
                <p className="text-sm text-muted-foreground">
                  Deslogar automaticamente após inatividade
                </p>
              </div>
              <Switch id="session-timeout" disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
