
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ClockIcon, MapPinIcon, CreditCard, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import Logo from "@/components/Logo";

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            time_slots(*),
            services(
              *,
              service_providers(*)
            )
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
        setFilteredBookings(data || []);
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

  useEffect(() => {
    if (searchTerm) {
      const filtered = bookings.filter(booking => 
        booking.services?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.services?.service_providers?.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchTerm, bookings]);

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
      case 'pending_confirmation':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <UserAvatar 
                src={profile?.avatar_url} 
                name={`${profile?.first_name || ''} ${profile?.last_name || ''}`}
                size="sm"
                className="mr-2"
              />
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="bookings">Minhas Reservas</TabsTrigger>
              <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar reservas..."
                  className="w-full pl-9 md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Link to="/explore">
                <Button>Agendar Novo Horário</Button>
              </Link>
            </div>
          </div>

          <TabsContent value="bookings" className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tc-blue"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhuma reserva encontrada</h3>
                  <p className="text-gray-500 mt-1">Agende seu primeiro horário e economize tempo!</p>
                  <Link to="/explore">
                    <Button className="mt-4">Agendar Agora</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-tc-blue text-white p-4">
                      <CardTitle className="text-lg">{booking.services?.name}</CardTitle>
                      <CardDescription className="text-white text-opacity-90">
                        {booking.services?.service_providers?.business_name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatDate(booking.time_slots?.start_time)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {formatTime(booking.time_slots?.start_time)} - {formatTime(booking.time_slots?.end_time)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{booking.services?.service_providers?.address || 'Endereço não disponível'}</span>
                      </div>
                      <div className="pt-2 flex justify-between items-center">
                        <div className="text-sm font-medium">
                          Status: 
                          <span className={`capitalize ml-1 ${getPaymentStatusColor(booking.payment_status)}`}>
                            {booking.payment_status === 'paid' ? 'Pago' : 
                             booking.payment_status === 'pending' ? 'Pendente' : 
                             booking.payment_status === 'pending_confirmation' ? 'Processando' : 
                             booking.payment_status}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          R$ {(booking.payment_amount || 0).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="pt-2 flex gap-2">
                        {booking.payment_status !== 'paid' && (
                          <div className="flex-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full flex items-center justify-center"
                              asChild
                            >
                              <Link to={`/booking/${booking.id}`}>
                                <CreditCard className="h-4 w-4 mr-1" />
                                Pagar
                              </Link>
                            </Button>
                          </div>
                        )}
                        <div className="flex-1">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link to={`/booking/${booking.id}`}>
                              Ver Detalhes
                            </Link>
                          </Button>
                        </div>
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
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <UserAvatar 
                    src={profile?.avatar_url} 
                    name={`${profile?.first_name || ''} ${profile?.last_name || ''}`}
                    size="xl"
                  />
                  <div className="space-y-4 text-center sm:text-left">
                    <div>
                      <h3 className="text-xl font-medium">
                        {profile?.first_name} {profile?.last_name || ''}
                      </h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <div className="grid gap-4 pt-2">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Editar Perfil
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Alterar Senha
                      </Button>
                    </div>
                  </div>
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
