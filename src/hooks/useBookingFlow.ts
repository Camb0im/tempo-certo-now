
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface BookingData {
  serviceId: string;
  timeSlotId: string;
  paymentAmount: number;
}

export const useBookingFlow = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const createBooking = async (bookingData: BookingData) => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para fazer um agendamento.",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);

    try {
      // Criar o agendamento no banco de dados usando os campos corretos
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          service_id: bookingData.serviceId,
          time_slot_id: bookingData.timeSlotId,
          payment_amount: bookingData.paymentAmount,
          status: 'confirmed',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Agendamento criado!",
        description: "Prossiga para o pagamento para confirmar seu agendamento.",
      });

      return booking;
    } catch (error: any) {
      console.error('Erro ao criar agendamento:', error);
      toast({
        title: "Erro ao criar agendamento",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (bookingId: string) => {
    setLoading(true);

    try {
      // Atualizar status do agendamento
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          payment_status: 'paid'
        })
        .eq('id', bookingId);

      if (error) {
        throw error;
      }

      // Enviar notificação (simulado)
      await sendBookingNotification(bookingId);

      toast({
        title: "Agendamento confirmado!",
        description: "Seu agendamento foi confirmado com sucesso. Você receberá um lembrete por email.",
      });

      // Redirecionar para dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro ao confirmar agendamento:', error);
      toast({
        title: "Erro ao confirmar agendamento",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendBookingNotification = async (bookingId: string) => {
    try {
      // Aqui você pode chamar uma edge function para enviar email
      console.log(`Enviando notificação para agendamento ${bookingId}`);
      
      // Simulação de envio de notificação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      return false;
    }
  };

  return {
    loading,
    createBooking,
    confirmBooking,
  };
};
