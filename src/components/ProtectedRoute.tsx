
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAuth = true,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Se ainda está carregando, mostre um indicador de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tc-blue"></div>
      </div>
    );
  }

  // Se requer autenticação e o usuário não está autenticado
  if (requiresAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se não requer autenticação (como páginas de login) e o usuário está autenticado
  if (!requiresAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Caso contrário, renderize o conteúdo normalmente
  return <>{children}</>;
};

export default ProtectedRoute;
