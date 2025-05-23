
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface BookingDetails {
  id: string;
  payment_status: string;
  status: string;
  service_name?: string;
  provider_business_name?: string;
  provider_address?: string | null;
  time_slot_start_time?: string;
  time_slot_end_time?: string;
  service_duration?: number;
}

export const usePaymentVerification = (sessionId: string | null, userId: string | null) => {
  const [verifying, setVerifying] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !userId) return;
      
      try {
        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });
        
        if (error) {
          console.error("Error from verify-payment function:", error);
          toast({
            title: "Erro ao verificar pagamento",
            description: "Houve um problema ao confirmar seu pagamento.",
            variant: "destructive",
          });
          return;
        }
        
        if (data?.success && data?.bookingDetails) {
          toast({
            title: "Pagamento confirmado!",
            description: "Seu agendamento está garantido.",
          });
          setBookingDetails(data.bookingDetails);
        } else {
          toast({
            title: "Verificação de pagamento",
            description: "Status do pagamento: " + (data?.paymentStatus || "desconhecido"),
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
    };
    
    verifyPayment();
  }, [sessionId, userId]);

  return { verifying, bookingDetails };
};
