
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const usePaymentFlow = (bookingId: string) => {
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus("processing");
    
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { bookingId },
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        setCheckoutUrl(data.url);
        startPaymentStatusCheck(bookingId);
      } else {
        throw new Error("Não foi possível gerar o link de pagamento");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      setPaymentStatus("error");
      toast({
        title: "Erro ao processar pagamento",
        description: "Ocorreu um erro ao iniciar o processo de pagamento. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startPaymentStatusCheck = (bookingId: string) => {
    const checkInterval = setInterval(async () => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("payment_status")
          .eq("id", bookingId)
          .single();

        if (error) throw error;
        
        if (data?.payment_status === "paid") {
          clearInterval(checkInterval);
          setPaymentStatus("success");
          toast({
            title: "Pagamento confirmado!",
            description: "Seu pagamento foi processado com sucesso.",
          });
          
          setTimeout(() => {
            navigate("/payment-success");
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
      }
    }, 3000);

    return () => clearInterval(checkInterval);
  };

  return {
    loading,
    checkoutUrl,
    paymentStatus,
    handlePayment,
  };
};
