
import React from "react";
import { Clock } from "lucide-react";

interface TempoCertoLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const TempoCertoLogo = ({ size = "md", showText = true, className = "" }: TempoCertoLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Clock className={`${sizeClasses[size]} text-tc-blue`} />
        <div className="absolute inset-0 bg-gradient-to-br from-tc-blue to-tc-blue-dark rounded-full opacity-10"></div>
      </div>
      {showText && (
        <span className={`font-bold text-tc-blue ${textSizeClasses[size]}`}>
          Tempo<span className="text-tc-blue-dark">Certo</span>
        </span>
      )}
    </div>
  );
};

export default TempoCertoLogo;
