import { UserCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import type { IUserProfile } from "@/types/profile";

interface ProfileAvatarCardProps {
  user: IUserProfile;
}

export function ProfileAvatarCard({ user }: ProfileAvatarCardProps) {
  return (
    <Card className="relative">
      <div className="absolute top-4 left-4 p-2 bg-primary/10 rounded-lg">
        <UserCircle className="w-4 h-4 text-primary" />
      </div>
      <CardContent className="flex flex-col items-center gap-4 pt-6">
        <ProfileAvatar
          avatarUrl={user.avatar_url}
          fullName={user.full_name}
          size="lg"
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold font-heading">
            {user.full_name}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Perfil do usuário
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
