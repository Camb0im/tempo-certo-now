
import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const PaymentLoadingCard = () => {
  return (
    <Card className="max-w-md w-full">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-tc-blue mb-4" />
        <CardTitle className="text-2xl mb-2">Confirmando seu pagamento</CardTitle>
        <CardDescription className="mb-8">
          Aguarde enquanto verificamos seu pagamento...
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PaymentLoadingCard;
