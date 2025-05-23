
import React from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-tc-blue to-tc-blue-dark p-1.5">
        <Clock className={`${sizeClasses[size]} text-white`} />
      </div>
      {showText && (
        <span className={`font-bold text-tc-blue ${textClasses[size]}`}>
          TempoCerto
        </span>
      )}
    </Link>
  );
};

export default Logo;
