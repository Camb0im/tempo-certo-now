
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Star, Settings, User, CreditCard } from "lucide-react";
import ProfileEditForm from "@/components/ProfileEditForm";
import UserProfileAvatar from "@/components/UserProfileAvatar";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  // Dados de exemplo para agendamentos
  const upcomingBookings = [
    {
      id: 1,
      serviceName: "Corte de Cabelo",
      provider: "Barbearia Vintage",
      date: "2024-01-15",
      time: "14:00",
      location: "Centro, São Paulo",
      status: "confirmado"
    },
    {
      id: 2,
      serviceName: "Mesa para Jantar",
      provider: "Restaurante Italiano",
      date: "2024-01-20",
      time: "19:30",
      location: "Pinheiros, São Paulo",
      status: "pendente"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      serviceName: "Manicure",
      provider: "Beauty Salon",
      date: "2024-01-05",
      time: "10:00",
      location: "Itaim, São Paulo",
      status: "concluído",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserProfileAvatar size="xl" name={user?.email} />
            <div>
              <h1 className="text-3xl font-bold">Olá, {user?.email?.split('@')[0]}!</h1>
              <p className="text-muted-foreground">Gerencie seus agendamentos e perfil</p>
            </div>
          </div>
          <Button onClick={signOut} variant="outline">
            Sair
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full lg:w-[400px] grid-cols-3">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Próximos Agendamentos</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {booking.serviceName}
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </CardTitle>
                      <CardDescription>{booking.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {new Date(booking.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {booking.time}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {booking.location}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">Reagendar</Button>
                        <Button size="sm" variant="outline">Cancelar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Histórico</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pastBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {booking.serviceName}
                        {booking.rating && (
                          <div className="flex items-center">
                            {Array(booking.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}
                      </CardTitle>
                      <CardDescription>{booking.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {new Date(booking.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {booking.time}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {booking.location}
                      </div>
                      <Button size="sm" className="mt-2">Agendar Novamente</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileEditForm />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
                <CardDescription>
                  Gerencie suas preferências e configurações de conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações sobre seus agendamentos
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Forma de Pagamento</h4>
                    <p className="text-sm text-muted-foreground">
                      Gerencie seus métodos de pagamento
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Gerenciar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Excluir Conta</h4>
                    <p className="text-sm text-muted-foreground">
                      Remover permanentemente sua conta
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">Excluir</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
