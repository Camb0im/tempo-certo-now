
import React from "react";
import { Loader2, Check, AlertCircle, CreditCard } from "lucide-react";

interface BookingPaymentInterfaceProps {
  paymentStatus: "idle" | "processing" | "success" | "error";
  checkoutUrl: string | null;
  bookingAmount: number;
  serviceName: string;
}

const BookingPaymentInterface = ({ 
  paymentStatus, 
  checkoutUrl, 
  bookingAmount, 
  serviceName 
}: BookingPaymentInterfaceProps) => {
  if (paymentStatus === "processing") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="font-medium text-center">Processando seu pagamento...</p>
        <p className="text-sm text-muted-foreground text-center">
          Por favor, aguarde enquanto processamos sua transação.
        </p>
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
        <p className="text-sm text-muted-foreground text-center">
          Redirecionando para a confirmação...
        </p>
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
        <p className="text-sm text-muted-foreground text-center">
          Tente novamente ou entre em contato com o suporte.
        </p>
      </div>
    );
  }

  // Estado padrão - mostrar interface de pagamento
  return (
    <>
      <div className="border rounded-lg p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-2">{serviceName}</h3>
        <div className="flex justify-between items-center">
          <span>Total a pagar:</span>
          <span className="font-semibold">
            R$ {(bookingAmount / 100).toFixed(2).replace('.', ',')}
          </span>
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

export default BookingPaymentInterface;
