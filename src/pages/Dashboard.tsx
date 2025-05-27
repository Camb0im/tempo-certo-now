
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import BookingActions from "@/components/BookingActions";
import { useDashboardData } from "@/hooks/useDashboardData";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { upcomingBookings, bookingHistory, updateBooking } = useDashboardData();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-tc-green text-white min-w-[80px] justify-center">Confirmado</Badge>;
      case "completed":
        return <Badge className="bg-tc-blue text-white min-w-[80px] justify-center">Concluído</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="min-w-[80px] justify-center">Cancelado</Badge>;
      default:
        return <Badge variant="secondary" className="min-w-[80px] justify-center">{status}</Badge>;
    }
  };

  const handleRateService = (bookingId: string, serviceName: string) => {
    toast({
      title: "Avaliação",
      description: `Avaliando: ${serviceName}`,
    });
    // Aqui seria implementado o modal de avaliação
    console.log(`Rating service for booking ${bookingId}: ${serviceName}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-tc-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Agendamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus agendamentos e histórico de serviços
          </p>
        </div>

        {/* Próximos Agendamentos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Próximos Agendamentos</h2>
          
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Nenhum agendamento próximo
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  Você não tem agendamentos confirmados. Que tal explorar nossos serviços?
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{booking.serviceName}</CardTitle>
                        <CardDescription className="text-base">
                          {booking.providerName}
                        </CardDescription>
                      </div>
                      <div className="flex items-center justify-end min-w-[100px]">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-tc-blue mr-2" />
                        <span>{new Date(booking.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-tc-blue mr-2" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-tc-blue mr-2" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-tc-blue">
                        R$ {booking.price.toFixed(2)}
                      </div>
                      
                      <BookingActions
                        bookingId={booking.id}
                        serviceName={booking.serviceName}
                        currentDate={new Date(booking.date).toLocaleDateString('pt-BR')}
                        currentTime={booking.time}
                        onUpdate={updateBooking}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Histórico */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Histórico de Agendamentos</h2>
          
          {bookingHistory.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Clock className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Nenhum histórico ainda
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  Seus agendamentos passados aparecerão aqui.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {bookingHistory.map((booking) => (
                <Card key={booking.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                            <p className="text-gray-600 mb-2">{booking.providerName}</p>
                          </div>
                          <div className="flex items-center justify-end min-w-[100px] ml-4">
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(booking.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-tc-blue">
                            R$ {booking.price.toFixed(2)}
                          </div>
                          {booking.status === "completed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRateService(booking.id, booking.serviceName)}
                              className="mt-2 flex items-center gap-1 text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                            >
                              <Star className="h-4 w-4" />
                              Avaliar
                            </Button>
                          )}
                        </div>
                        
                        {booking.status === "completed" && (
                          <BookingActions
                            bookingId={booking.id}
                            serviceName={booking.serviceName}
                            currentDate={new Date(booking.date).toLocaleDateString('pt-BR')}
                            currentTime={booking.time}
                            onUpdate={updateBooking}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
