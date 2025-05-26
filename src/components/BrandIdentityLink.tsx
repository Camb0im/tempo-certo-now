
import React from "react";
import { Link } from "react-router-dom";
import { Palette, Layout, Smartphone, Sparkles, User, Bell } from "lucide-react";

const BrandIdentityLink = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Links de demonstração UX/UI */}
      <Link
        to="/onboarding"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg shadow-brand hover:shadow-xl transition-all duration-200 font-medium transform hover:scale-105"
      >
        <Sparkles className="h-4 w-4" />
        Ver Onboarding
      </Link>
      <Link
        to="/perfil"
        className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg shadow-brand hover:bg-brand-secondary hover:text-brand-primary transition-all duration-200 font-medium"
      >
        <User className="h-4 w-4" />
        Ver Perfil Usuário
      </Link>
      <Link
        to="/notificacoes"
        className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-brand-primary rounded-lg shadow-brand hover:bg-brand-primary hover:text-white transition-all duration-200 font-medium"
      >
        <Bell className="h-4 w-4" />
        Ver Notificações
      </Link>
      
      {/* Separador visual */}
      <div className="h-px bg-brand-gray-soft my-2"></div>
      
      {/* Links de design */}
      <Link
        to="/mockups"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-secondary to-brand-primary text-white rounded-lg shadow-brand hover:shadow-xl transition-all duration-200 font-medium transform hover:scale-105"
      >
        <Smartphone className="h-4 w-4" />
        Ver Mockups HD
      </Link>
      <Link
        to="/wireframes"
        className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-brand-primary rounded-lg shadow-brand hover:bg-brand-primary hover:text-white transition-all duration-200 font-medium"
      >
        <Layout className="h-4 w-4" />
        Ver Wireframes UX
      </Link>
      <Link
        to="/brand-identity"
        className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg shadow-brand hover:bg-brand-secondary hover:text-brand-primary transition-all duration-200 font-medium"
      >
        <Palette className="h-4 w-4" />
        Ver Identidade Visual
      </Link>
    </div>
  );
};

export default BrandIdentityLink;
