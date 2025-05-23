
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface BookingPaymentButtonProps {
  bookingId: string;
  bookingAmount?: number;
  serviceName?: string;
  disabled?: boolean;
  className?: string;
}

const BookingPaymentButton = ({ 
  bookingId, 
  bookingAmount = 0, 
  serviceName = "Reserva", 
  disabled, 
  className 
}: BookingPaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenPayment = () => {
    setOpen(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { bookingId },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Abrir o checkout em um iframe ou modal dentro da aplicação
        // Por limitações do Stripe, ainda precisamos redirecionar, mas podemos criar uma experiência
        // mais integrada com uma tela de transição
        
        toast({
          title: "Redirecionando para pagamento",
          description: "Você será redirecionado para a plataforma segura de pagamento.",
        });
        
        setTimeout(() => {
          window.location.href = data.url;
        }, 1000);
      } else {
        throw new Error("Não foi possível gerar o link de pagamento");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast({
        title: "Erro ao processar pagamento",
        description: "Ocorreu um erro ao iniciar o processo de pagamento. Tente novamente mais tarde.",
        variant: "destructive",
      });
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenPayment}
        disabled={disabled}
        className={className}
      >
        Pagar agora
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento</DialogTitle>
            <DialogDescription>
              Você está prestes a realizar o pagamento para a sua reserva.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="text-sm font-medium mb-2">{serviceName}</h3>
              <div className="flex justify-between items-center">
                <span>Total a pagar:</span>
                <span className="font-semibold">R$ {(bookingAmount / 100).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                Seu pagamento será processado com segurança pelo Stripe.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CreditCard className="h-4 w-4" />
                <span>Pagamento seguro e criptografado</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 sm:justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handlePayment} 
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pagar R$ {(bookingAmount / 100).toFixed(2).replace('.', ',')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingPaymentButton;
