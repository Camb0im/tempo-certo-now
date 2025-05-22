
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProviderRegister from "./pages/ProviderRegister";
import ProviderDashboard from "./pages/ProviderDashboard";
import HowItWorksPage from "./pages/HowItWorksPage";
import BusinessPage from "./pages/BusinessPage";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/para-negocios" element={<BusinessPage />} />
            <Route path="/precos" element={<PricingPage />} />
            
            {/* Rotas de autenticação */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requiresAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cadastro" 
              element={
                <ProtectedRoute requiresAuth={false}>
                  <Register />
                </ProtectedRoute>
              } 
            />
            
            {/* Rotas protegidas de usuário */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Rotas protegidas de prestador */}
            <Route 
              path="/provider/register" 
              element={
                <ProtectedRoute>
                  <ProviderRegister />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/provider/dashboard" 
              element={
                <ProtectedRoute>
                  <ProviderDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
