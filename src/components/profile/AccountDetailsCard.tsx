import { Calendar, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IUserProfile } from "@/types/profile";

interface AccountDetailsCardProps {
  user: IUserProfile;
}

export function AccountDetailsCard({ user }: AccountDetailsCardProps) {
  const joinDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Não disponível";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes da Conta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">E-mail</p>
            <p className="font-medium truncate">{user.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Membro desde</p>
            <p className="font-medium">{joinDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
