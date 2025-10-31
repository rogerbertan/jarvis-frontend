"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  avatarUrl?: string;
  fullName: string;
  size?: "sm" | "md" | "lg";
}

export function ProfileAvatar({
  avatarUrl,
  fullName,
  size = "md",
}: ProfileAvatarProps) {
  const getInitials = (fullName: string) => {
    if (!fullName || fullName.trim() === "") {
      return "??";
    }
    return fullName
      .split(" ")
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(fullName);

  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-24 h-24 text-2xl",
    lg: "w-36 h-36 text-6xl",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={avatarUrl} alt={fullName} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
