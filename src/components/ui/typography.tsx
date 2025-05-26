
import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyH1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn("text-4xl font-bold text-[#3A506B] leading-tight", className)}>
    {children}
  </h1>
);

export const TypographyH2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn("text-2xl font-semibold text-[#3A506B] leading-tight", className)}>
    {children}
  </h2>
);

export const TypographyH3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn("text-xl font-medium text-[#3A506B] leading-tight", className)}>
    {children}
  </h3>
);

export const TypographyBody = ({ children, className }: TypographyProps) => (
  <p className={cn("text-base text-[#8A9BA8] leading-relaxed", className)}>
    {children}
  </p>
);

export const TypographyCaption = ({ children, className }: TypographyProps) => (
  <p className={cn("text-sm text-[#BCCCDC] leading-normal", className)}>
    {children}
  </p>
);

export const TypographyLead = ({ children, className }: TypographyProps) => (
  <p className={cn("text-lg text-[#8A9BA8] leading-relaxed", className)}>
    {children}
  </p>
);
