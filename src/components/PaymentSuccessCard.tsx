
import React from "react";
import { CheckCircle, Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingDetails {
  id: string;
  service_name?: string;
  provider_business_name?: string;
  provider_address?: string | null;
  time_slot_start_time?: string;
  time_slot_end_time?: string;
  service_duration?: number;
}

interface PaymentSuccessCardProps {
  bookingDetails?: BookingDetails;
}

const PaymentSuccessCard = ({ bookingDetails }: PaymentSuccessCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3 animate-scale-in">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-2xl">Pagamento Confirmado!</CardTitle>
        <CardDescription>
          Seu agendamento foi concluído e está garantido.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        {bookingDetails ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-medium text-lg">
                {bookingDetails.service_name || 'Serviço'}
              </h3>
              <p className="text-muted-foreground">
                {bookingDetails.provider_business_name || 'Prestador'}
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-tc-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {formatDate(bookingDetails.time_slot_start_time)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {formatTime(bookingDetails.time_slot_start_time)} - {formatTime(bookingDetails.time_slot_end_time)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-tc-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {bookingDetails.provider_business_name || 'Prestador'}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {bookingDetails.provider_address || "Endereço não disponível"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-tc-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Duração estimada</p>
                  <p className="text-muted-foreground text-sm">
                    {bookingDetails.service_duration || 30} minutos
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Um e-mail com os detalhes do seu agendamento foi enviado para você.
              </p>
              <p className="text-xs text-muted-foreground">
                ID da Reserva: {bookingDetails.id}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p>Seu pagamento foi processado com sucesso!</p>
            <p className="text-muted-foreground text-sm mt-2">
              Você pode visualizar todos os detalhes no seu dashboard.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSuccessCard;
