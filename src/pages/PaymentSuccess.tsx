
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, Calendar, MapPin, Clock } from "lucide-react";
import Logo from "@/components/Logo";

// Define flat types to avoid deep nesting and circular references
type BookingDetails = {
  id: string;
  payment_status: string;
  status: string;
  time_slot_id?: string;
  time_slot_start_time?: string;
  time_slot_end_time?: string;
  time_slot_is_booked?: boolean;
  service_id?: string;
  service_name?: string;
  service_duration?: number;
  provider_id?: string;
  provider_business_name?: string;
  provider_address?: string | null;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  
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
          
          // Use flat query with explicit column selection to avoid deep nesting
          const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .select(`
              id, status, payment_status,
              time_slot_id
            `)
            .eq('stripe_session_id', sessionId)
            .single();
            
          if (bookingError) {
            console.error("Error fetching booking:", bookingError);
            return;
          }
          
          // If we found a booking, get the related data separately to avoid deep nesting
          if (booking) {
            // Get time slot details
            const { data: timeSlot } = await supabase
              .from('time_slots')
              .select('id, start_time, end_time, is_booked, service_id')
              .eq('id', booking.time_slot_id)
              .single();
              
            // Get service details
            if (timeSlot?.service_id) {
              const { data: service } = await supabase
                .from('services')
                .select('id, name, duration, provider_id')
                .eq('id', timeSlot.service_id)
                .single();
                
              // Get provider details
              if (service?.provider_id) {
                const { data: provider } = await supabase
                  .from('service_providers')
                  .select('id, business_name, address')
                  .eq('id', service.provider_id)
                  .single();
                  
                // Combine all the data into a flat structure
                setBookingDetails({
                  id: booking.id,
                  status: booking.status,
                  payment_status: booking.payment_status,
                  time_slot_id: timeSlot?.id,
                  time_slot_start_time: timeSlot?.start_time,
                  time_slot_end_time: timeSlot?.end_time,
                  time_slot_is_booked: timeSlot?.is_booked,
                  service_id: service?.id,
                  service_name: service?.name,
                  service_duration: service?.duration,
                  provider_id: provider?.id,
                  provider_business_name: provider?.business_name,
                  provider_address: provider?.address
                });
              }
            }
          }
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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return '';
    
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleTimeString('pt-BR', options);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50">
        <Card className="max-w-md w-full">
          {verifying ? (
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-tc-blue mb-4" />
              <CardTitle className="text-2xl mb-2">Confirmando seu pagamento</CardTitle>
              <CardDescription className="mb-8">
                Aguarde enquanto verificamos seu pagamento...
              </CardDescription>
            </CardContent>
          ) : (
            <>
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
                        {bookingDetails.service_name}
                      </h3>
                      <p className="text-muted-foreground">
                        {bookingDetails.provider_business_name}
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
                            {bookingDetails.provider_business_name}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {bookingDetails.provider_address || "Endereço não disponível"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-tc-blue flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            Duração estimada
                          </p>
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
              
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  className="w-full bg-tc-blue hover:bg-tc-blue-dark"
                  onClick={() => navigate("/dashboard")}
                >
                  Ir para o Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/explore")}
                >
                  Agendar Outro Serviço
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
