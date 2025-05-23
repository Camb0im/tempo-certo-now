import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, Check, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const navigate = useNavigate();

  const handleOpenPayment = () => {
    setOpen(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus("processing");
    
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { bookingId },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Armazenar a URL do checkout para exibir no drawer/dialog
        setCheckoutUrl(data.url);
        
        // Iniciar verificação de status periodicamente
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
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  // Verifica o status do pagamento a cada 3 segundos
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
          
          // Após 2 segundos, redireciona para a página de sucesso
          setTimeout(() => {
            setOpen(false);
            navigate("/payment-success");
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
      }
    }, 3000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(checkInterval);
  };

  const PaymentConfirmation = () => (
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
  );

  const PaymentInterface = () => {
    if (paymentStatus === "processing") {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="font-medium text-center">Processando seu pagamento...</p>
          <p className="text-sm text-muted-foreground text-center">Por favor, aguarde enquanto processamos sua transação.</p>
        </div>
      );
    }

    if (paymentStatus === "success") {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <p className="font-medium text-center">Pagamento realizado com sucesso!</p>
          <p className="text-sm text-muted-foreground text-center">Redirecionando para a confirmação...</p>
        </div>
      );
    }

    if (paymentStatus === "error") {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <p className="font-medium text-center">Erro no processamento do pagamento</p>
          <p className="text-sm text-muted-foreground text-center">Tente novamente ou entre em contato com o suporte.</p>
        </div>
      );
    }

    // Estado padrão - mostrar interface de pagamento
    return (
      <>
        {PaymentConfirmation()}
        
        {checkoutUrl && (
          <div className="mt-4 rounded-lg overflow-hidden border shadow-sm h-[450px] w-full">
            <iframe 
              src={checkoutUrl} 
              frameBorder="0"
              className="w-full h-full"
              title="Stripe Checkout"
            />
          </div>
        )}
      </>
    );
  };

  if (isMobile) {
    return (
      <>
        <Button
          onClick={handleOpenPayment}
          disabled={disabled}
          className={className}
        >
          Pagar agora
        </Button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Confirmar Pagamento</DrawerTitle>
              <DrawerDescription>
                {paymentStatus === "idle" ? "Você está prestes a realizar o pagamento para a sua reserva." : ""}
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4">
              <PaymentInterface />
            </div>
            
            <DrawerFooter className="flex pt-2">
              {paymentStatus === "idle" && !checkoutUrl ? (
                <>
                  <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handlePayment} 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
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
                </>
              ) : paymentStatus === "error" ? (
                <>
                  <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
                    Fechar
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    className="flex-1"
                  >
                    Tentar novamente
                  </Button>
                </>
              ) : null}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

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
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento</DialogTitle>
            <DialogDescription>
              {paymentStatus === "idle" ? "Você está prestes a realizar o pagamento para a sua reserva." : ""}
            </DialogDescription>
          </DialogHeader>
          
          <PaymentInterface />
          
          <DialogFooter className="flex space-x-2 sm:justify-between">
            {paymentStatus === "idle" && !checkoutUrl ? (
              <>
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
              </>
            ) : paymentStatus === "error" ? (
              <>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Fechar
                </Button>
                <Button 
                  onClick={handlePayment}
                >
                  Tentar novamente
                </Button>
              </>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingPaymentButton;
