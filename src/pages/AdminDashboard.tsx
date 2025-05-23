
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Calendar,
  CreditCard,
  DollarSign,
  Settings,
  User,
  Users,
  Menu,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import Logo from "@/components/Logo";
import UserAvatar from "@/components/UserAvatar";

// Dados de exemplo
const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Fev", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Abr", revenue: 3908 },
  { month: "Mai", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
];

const bookingsData = [
  {
    id: "b1",
    customerName: "João Silva",
    service: "Corte de Cabelo",
    date: "2023-05-24",
    time: "14:00",
    status: "confirmed",
    payment: "paid",
    amount: 45
  },
  {
    id: "b2",
    customerName: "Maria Santos",
    service: "Barba",
    date: "2023-05-24",
    time: "15:30",
    status: "confirmed",
    payment: "paid",
    amount: 25
  },
  {
    id: "b3",
    customerName: "Pedro Lima",
    service: "Corte e Barba",
    date: "2023-05-25",
    time: "10:00",
    status: "pending",
    payment: "pending",
    amount: 65
  },
  {
    id: "b4",
    customerName: "Ana Costa",
    service: "Tratamento Capilar",
    date: "2023-05-25",
    time: "16:00",
    status: "confirmed",
    payment: "paid",
    amount: 80
  },
  {
    id: "b5",
    customerName: "Carlos Oliveira",
    service: "Corte de Cabelo",
    date: "2023-05-26",
    time: "11:00",
    status: "confirmed",
    payment: "pending",
    amount: 45
  }
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBookings = searchTerm.length > 0 
    ? bookingsData.filter(booking => 
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : bookingsData;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'canceled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'text-green-600';
      case 'pending': return 'text-amber-600';
      case 'canceled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPaymentText = (payment: string) => {
    switch(payment) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'failed': return 'Falhou';
      default: return payment;
    }
  };

  const getPaymentColor = (payment: string) => {
    switch(payment) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-amber-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const todayBookings = bookingsData.filter(
    booking => booking.date === new Date().toISOString().split('T')[0]
  ).length;
  
  const totalRevenue = bookingsData
    .filter(booking => booking.payment === 'paid')
    .reduce((sum, booking) => sum + booking.amount, 0);
  
  const pendingPayments = bookingsData
    .filter(booking => booking.payment === 'pending')
    .reduce((sum, booking) => sum + booking.amount, 0);

  const mainContent = (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie seus agendamentos e visualize o desempenho do seu negócio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <UserAvatar 
            name="Barbearia Vintage"
            size="sm"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Barbearia Vintage</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Agendamentos de Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings}</div>
            <p className="text-xs text-muted-foreground">
              +2.1% em relação à semana passada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +19% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagamentos Pendentes
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {pendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {bookingsData.filter(b => b.payment === 'pending').length} pagamentos aguardando
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings">
        <TabsList>
          <TabsTrigger value="bookings">Agendamentos</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos</CardTitle>
              <CardDescription>
                Gerencie todos os seus agendamentos em um só lugar.
              </CardDescription>
              <div className="mt-2">
                <Input
                  type="search"
                  placeholder="Buscar agendamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div className="col-span-2">Cliente / Serviço</div>
                  <div>Data / Hora</div>
                  <div>Status</div>
                  <div>Pagamento</div>
                  <div className="text-right">Ações</div>
                </div>
                {filteredBookings.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum agendamento encontrado.
                  </div>
                ) : (
                  <div>
                    {filteredBookings.map((booking) => (
                      <div key={booking.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0 items-center">
                        <div className="col-span-2">
                          <div className="font-medium">{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground">{booking.service}</div>
                        </div>
                        <div>
                          <div>{formatDate(booking.date)}</div>
                          <div className="text-sm text-muted-foreground">{booking.time}</div>
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)} bg-opacity-10`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        <div>
                          <span className={`${getPaymentColor(booking.payment)}`}>
                            {getPaymentText(booking.payment)}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            R$ {booking.amount.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Serviços</CardTitle>
              <CardDescription>
                Gerencie seus serviços, preços e disponibilidade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta seção está em desenvolvimento. Em breve você poderá gerenciar seus serviços aqui.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>
                Visualize o desempenho do seu negócio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta seção está em desenvolvimento. Em breve você poderá visualizar análises detalhadas aqui.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Logo />
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Agendamentos
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Pagamentos
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Clientes
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </ScrollArea>
      <div className="border-t mt-auto p-4">
        <div className="flex items-center gap-2">
          <UserAvatar name="Barbearia Vintage" size="sm" />
          <div>
            <p className="text-sm font-medium">Barbearia Vintage</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de topo (móvel) */}
      {isMobile && (
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b bg-background">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              {sidebarContent}
            </SheetContent>
          </Sheet>
          <Logo />
          <UserAvatar name="Barbearia Vintage" size="sm" />
        </header>
      )}

      <div className="flex">
        {/* Barra lateral (desktop) */}
        {!isMobile && (
          <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r lg:block">
            {sidebarContent}
          </aside>
        )}

        {/* Conteúdo principal */}
        <div className={`flex-1 ${!isMobile ? "pl-64" : ""}`}>
          <main className="container py-6">{mainContent}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
