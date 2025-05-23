
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  src?: string | null;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const UserAvatar = ({ src, name, size = "md", className = "" }: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };
  
  const getInitials = (name: string = '') => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };
  
  const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];
  
  // Escolhe uma cor com base no nome (consistentemente)
  const getBgColor = (name: string = '') => {
    if (!name) return bgColors[0];
    const nameSum = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return bgColors[nameSum % bgColors.length];
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={src || undefined} />
      <AvatarFallback className={getBgColor(name)}>
        {name ? getInitials(name) : <User className="text-white h-1/2 w-1/2" />}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
