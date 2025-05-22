
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from "lucide-react";

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            time_slot:time_slots(*),
            service:services(
              *,
              provider:service_providers(*)
            )
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error: any) {
        console.error('Erro ao buscar reservas:', error);
        toast({
          title: "Erro ao carregar reservas",
          description: error.message || "Não foi possível carregar suas reservas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getInitials = (name: string = '') => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleTimeString('pt-BR', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">TempoCerto</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>{getInitials(`${profile?.first_name} ${profile?.last_name}`)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {profile?.first_name} {profile?.last_name}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Minhas Reservas</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Minhas Reservas</h2>
              <Button>Agendar Novo Horário</Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tc-blue"></div>
              </div>
            ) : bookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhuma reserva encontrada</h3>
                  <p className="text-gray-500 mt-1">Agende seu primeiro horário e economize tempo!</p>
                  <Button className="mt-4">Agendar Agora</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardHeader className="bg-tc-blue text-white p-4">
                      <CardTitle className="text-lg">{booking.service.name}</CardTitle>
                      <CardDescription className="text-white text-opacity-90">
                        {booking.service.provider.business_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatDate(booking.time_slot.start_time)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatTime(booking.time_slot.start_time)} - {formatTime(booking.time_slot.end_time)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{booking.service.provider.address || 'Endereço não disponível'}</span>
                      </div>
                      <div className="pt-2 flex justify-between items-center">
                        <div className="text-sm font-medium">
                          Status: <span className="text-green-600 capitalize">{booking.status}</span>
                        </div>
                        <span className="text-sm font-medium">
                          R$ {booking.payment_amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{getInitials(`${profile?.first_name} ${profile?.last_name}`)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{profile?.first_name} {profile?.last_name}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="grid gap-4 pt-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Editar Perfil
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
