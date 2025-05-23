
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import BookingPaymentInterface from "./BookingPaymentInterface";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";

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
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { loading, checkoutUrl, paymentStatus, handlePayment } = usePaymentFlow(bookingId);

  const PaymentButtons = () => {
    if (paymentStatus === "idle" && !checkoutUrl) {
      return (
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
      );
    }

    if (paymentStatus === "error") {
      return (
        <>
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Fechar
          </Button>
          <Button onClick={handlePayment} className="flex-1">
            Tentar novamente
          </Button>
        </>
      );
    }

    return null;
  };

  if (isMobile) {
    return (
      <>
        <Button onClick={() => setOpen(true)} disabled={disabled} className={className}>
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
              <BookingPaymentInterface 
                paymentStatus={paymentStatus}
                checkoutUrl={checkoutUrl}
                bookingAmount={bookingAmount}
                serviceName={serviceName}
              />
            </div>
            
            <DrawerFooter className="flex pt-2">
              <PaymentButtons />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={disabled} className={className}>
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
          
          <BookingPaymentInterface 
            paymentStatus={paymentStatus}
            checkoutUrl={checkoutUrl}
            bookingAmount={bookingAmount}
            serviceName={serviceName}
          />
          
          <DialogFooter className="flex space-x-2 sm:justify-between">
            <PaymentButtons />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingPaymentButton;
