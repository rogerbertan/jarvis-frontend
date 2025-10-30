import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { SettingsToggle } from "@/components/settings/SettingsToggle";
import { SettingsSelect } from "@/components/settings/SettingsSelect";
import { Separator } from "@/components/ui/separator";
import { Globe, Moon, Bell, Lock } from "lucide-react";
import { getUserProfile } from "@/actions/profile";

export default async function SettingsPage() {
  const { data: user } = await getUserProfile();

  return (
    <AppLayout user={user || undefined}>
      <PageHeader
        title="Configurações"
        description="Personalize sua experiência no Jarvis"
      />

      <div className="grid gap-6 max-w-4xl">
        {/* Appearance Settings */}
        <SettingsCard
          icon={Moon}
          title="Aparência"
          description="Customize a aparência do aplicativo"
        >
          <SettingsToggle
            id="dark-mode"
            label="Modo Escuro"
            description="Ativar tema escuro no aplicativo"
            disabled
          />

          <Separator />

          <SettingsToggle
            id="compact-mode"
            label="Modo Compacto"
            description="Reduzir espaçamento entre elementos"
            disabled
          />
        </SettingsCard>

        {/* Language Settings */}
        <SettingsCard
          icon={Globe}
          title="Idioma e Região"
          description="Configure o idioma e formato de exibição"
        >
          <SettingsSelect
            id="language"
            label="Idioma do Aplicativo"
            placeholder="Selecione o idioma"
            defaultValue="pt-br"
            disabled
            options={[
              { value: "pt-br", label: "Português (Brasil)" },
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
            ]}
          />

          <Separator />

          <SettingsSelect
            id="currency"
            label="Moeda"
            placeholder="Selecione a moeda"
            defaultValue="brl"
            disabled
            options={[
              { value: "brl", label: "Real (BRL)" },
              { value: "usd", label: "Dólar (USD)" },
              { value: "eur", label: "Euro (EUR)" },
            ]}
          />

          <Separator />

          <SettingsSelect
            id="date-format"
            label="Formato de Data"
            placeholder="Selecione o formato"
            defaultValue="dd/mm/yyyy"
            disabled
            options={[
              { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
              { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
              { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
            ]}
          />
        </SettingsCard>

        {/* Notifications Settings */}
        <SettingsCard
          icon={Bell}
          title="Notificações"
          description="Gerencie suas preferências de notificações"
        >
          <SettingsToggle
            id="expense-notifications"
            label="Notificações de Despesas"
            description="Receber alertas sobre novas despesas"
            disabled
          />

          <Separator />

          <SettingsToggle
            id="budget-alerts"
            label="Alertas de Orçamento"
            description="Avisos quando atingir limites de gastos"
            disabled
          />

          <Separator />

          <SettingsToggle
            id="monthly-reports"
            label="Relatórios Mensais"
            description="Receber resumo mensal de finanças"
            disabled
          />
        </SettingsCard>

        {/* Security Settings */}
        <SettingsCard
          icon={Lock}
          title="Segurança e Privacidade"
          description="Configure opções de segurança"
        >
          <SettingsToggle
            id="two-factor"
            label="Autenticação de Dois Fatores"
            description="Adicione uma camada extra de segurança"
            disabled
          />

          <Separator />

          <SettingsToggle
            id="biometric"
            label="Autenticação Biométrica"
            description="Usar impressão digital ou Face ID"
            disabled
          />

          <Separator />

          <SettingsToggle
            id="session-timeout"
            label="Timeout de Sessão"
            description="Deslogar automaticamente após inatividade"
            disabled
          />
        </SettingsCard>
      </div>
    </AppLayout>
  );
}
