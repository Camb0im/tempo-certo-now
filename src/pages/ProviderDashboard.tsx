
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ClockIcon, Plus, Settings, UserIcon, Users } from "lucide-react";

const ProviderDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderData = async () => {
      if (!user) return;
      
      try {
        // Busca dados do prestador
        const { data: providerData, error: providerError } = await supabase
          .from('service_providers')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (providerError) {
          // Se não encontrar prestador, redireciona para página de cadastro
          if (providerError.code === 'PGRST116') {
            navigate('/provider/register');
            return;
          }
          throw providerError;
        }
        
        setProvider(providerData);
        
        // Busca serviços do prestador
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('provider_id', providerData.id);
        
        if (servicesError) throw servicesError;
        setServices(servicesData || []);
        
        // Busca reservas para os serviços do prestador
        if (servicesData && servicesData.length > 0) {
          const serviceIds = servicesData.map(service => service.id);
          
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              *,
              time_slot:time_slots(*),
              service:services(*),
              user:profiles(*)
            `)
            .in('service_id', serviceIds)
            .order('created_at', { ascending: false });
          
          if (bookingsError) throw bookingsError;
          setBookings(bookingsData || []);
        }
      } catch (error: any) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: "Erro ao carregar dados",
          description: error.message || "Não foi possível carregar os dados do prestador.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [user, navigate]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tc-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 mr-2">TempoCerto</h1>
            <span className="text-sm bg-tc-blue text-white px-2 py-1 rounded">Painel Profissional</span>
          </div>
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{provider?.business_name}</h2>
          <p className="text-gray-500">{provider?.category}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total de Serviços</p>
                  <h3 className="text-3xl font-bold">{services.length}</h3>
                </div>
                <div className="h-12 w-12 bg-tc-blue bg-opacity-10 rounded-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-tc-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Reservas Hoje</p>
                  <h3 className="text-3xl font-bold">
                    {bookings.filter(b => new Date(b.time_slot.start_time).toDateString() === new Date().toDateString()).length}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total de Reservas</p>
                  <h3 className="text-3xl font-bold">{bookings.length}</h3>
                </div>
                <div className="h-12 w-12 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Clientes</p>
                  <h3 className="text-3xl font-bold">
                    {new Set(bookings.map(b => b.user_id)).size}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="business">Meu Negócio</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Reservas</h2>
            </div>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhuma reserva encontrada</h3>
                  <p className="text-gray-500 mt-1">Comece adicionando serviços para receber reservas.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow rounded-lg">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={booking.user?.avatar_url} />
                              <AvatarFallback>{getInitials(`${booking.user?.first_name} ${booking.user?.last_name}`)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.user?.first_name} {booking.user?.last_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.service.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(booking.time_slot.start_time)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(booking.time_slot.start_time)} - {formatTime(booking.time_slot.end_time)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {booking.payment_amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Serviços</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Serviço
              </Button>
            </div>

            {services.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Settings className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhum serviço cadastrado</h3>
                  <p className="text-gray-500 mt-1">Adicione serviços para começar a receber agendamentos.</p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Serviço
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader className="pb-2">
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>
                        Duração: {service.duration} minutos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">R$ {service.price.toFixed(2)}</span>
                        <Button variant="outline" size="sm">
                          Gerenciar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Negócio</CardTitle>
                <CardDescription>
                  Gerencie as informações do seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nome do Negócio</h3>
                    <p className="mt-1">{provider?.business_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Categoria</h3>
                    <p className="mt-1">{provider?.category}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                    <p className="mt-1">{provider?.description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                    <p className="mt-1">{provider?.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Cidade/Estado</h3>
                    <p className="mt-1">{provider?.city}, {provider?.state}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    Editar Informações
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

export default ProviderDashboard;
