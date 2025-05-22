
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [verifying, setVerifying] = useState(true);
  
  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId || !user) return;
      
      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });
        
        if (error) throw error;
        
        if (data.success) {
          toast({
            title: "Pagamento confirmado!",
            description: "Seu agendamento está garantido.",
            variant: "default",
          });
        } else {
          toast({
            title: "Verificação de pagamento",
            description: "Status do pagamento: " + data.paymentStatus,
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error);
        toast({
          title: "Erro ao verificar pagamento",
          description: "Houve um problema ao confirmar seu pagamento. Verifique seu dashboard.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    }
    
    verifyPayment();
  }, [sessionId, user]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center">
          {verifying ? (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-tc-blue mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Confirmando seu pagamento</h1>
              <p className="text-gray-600 mb-8">Aguarde enquanto verificamos seu pagamento...</p>
            </>
          ) : (
            <>
              <CheckCircle className="h-16 w-16 text-tc-green mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Pagamento processado!</h1>
              <p className="text-gray-600 mb-8">
                Seu pagamento foi processado e seu agendamento está confirmado.
                Você pode ver os detalhes em seu dashboard.
              </p>
              <div className="space-y-4">
                <Button 
                  className="w-full bg-tc-blue hover:bg-tc-blue-dark"
                  onClick={() => navigate("/dashboard")}
                >
                  Ir para o Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
