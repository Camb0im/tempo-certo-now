import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Star,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import { BookingData, ServiceData } from "@/types/booking";

interface CustomerJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type JourneyStep = 'search' | 'select' | 'book' | 'payment' | 'confirmation';

const CustomerJourneyModal = ({ isOpen, onClose }: CustomerJourneyModalProps) => {
  const [currentStep, setCurrentStep] = useState<JourneyStep>('search');
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    time: '',
    notes: '',
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    providerId: ''
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBooking, confirmBooking, loading } = useBookingFlow();

  const steps = [
    { id: 'search', title: 'Buscar', icon: Search },
    { id: 'select', title: 'Selecionar', icon: Calendar },
    { id: 'book', title: 'Agendar', icon: User },
    { id: 'payment', title: 'Pagamento', icon: CreditCard },
    { id: 'confirmation', title: 'Confirmação', icon: CheckCircle }
  ];

  const mockServices: ServiceData[] = [
    {
      id: 1,
      name: "Corte Masculino Premium",
      provider: "Barbearia Style",
      category: "Barbearia",
      rating: 4.8,
      reviews: 124,
      price: 45.00,
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
      businessLogo: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=100",
      duration: "45 min",
      location: "Centro, São Paulo"
    },
    {
      id: 2,
      name: "Jantar Romântico",
      provider: "Restaurante Bella Vista",
      category: "Restaurante",
      rating: 4.9,
      reviews: 87,
      price: 120.00,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      businessLogo: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=100",
      duration: "2 horas",
      location: "Jardins, São Paulo"
    }
  ];

  const handleServiceSelect = (service: ServiceData) => {
    setSelectedService(service);
    setBookingData(prev => ({
      ...prev,
      serviceId: service.id.toString(),
      providerId: 'mock-provider-id'
    }));
    setCurrentStep('book');
  };

  const handleBookingSubmit = async () => {
    if (!user) {
      onClose();
      navigate('/login', { state: { from: '/explore' } });
      return;
    }

    if (!bookingData.date || !bookingData.time || !selectedService) {
      return;
    }

    const booking = await createBooking({
      serviceId: selectedService.id.toString(),
      timeSlotId: 'mock-time-slot-id',
      paymentAmount: selectedService.price * 100
    });

    if (booking) {
      setCurrentStep('payment');
    }
  };

  const handlePaymentComplete = async () => {
    setCurrentStep('confirmation');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'search':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Encontre o serviço perfeito</h3>
              <p className="text-gray-600 dark:text-gray-400">Explore nossa seleção de serviços disponíveis</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Buscar serviços..." 
                  className="pl-10 h-12 rounded-xl border-gray-200 dark:border-gray-700"
                />
              </div>
              
              <div className="grid gap-4">
                {mockServices.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-all cursor-pointer rounded-xl border-gray-200 dark:border-gray-700" onClick={() => handleServiceSelect(service)}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-gray-100">{service.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{service.provider}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{service.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">R$ {service.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'book':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Agendar {selectedService?.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{selectedService?.provider}</p>
              {!user && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700">
                    Você precisará fazer login para continuar com o agendamento.
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                  <Input 
                    id="date"
                    type="date" 
                    className="h-12 rounded-xl border-gray-200 dark:border-gray-700 mt-2"
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="time" className="text-sm font-medium">Horário</Label>
                  <Input 
                    id="time"
                    type="time" 
                    className="h-12 rounded-xl border-gray-200 dark:border-gray-700 mt-2"
                    value={bookingData.time}
                    onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>

              {user && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
                    <Input 
                      id="name"
                      placeholder="Seu nome"
                      className="h-12 rounded-xl border-gray-200 dark:border-gray-700 mt-2"
                      value={bookingData.name}
                      onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                    <Input 
                      id="phone"
                      placeholder="(11) 99999-9999"
                      className="h-12 rounded-xl border-gray-200 dark:border-gray-700 mt-2"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
              )}
            </div>

            {user && (
              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Observações (opcional)</Label>
                <Textarea 
                  id="notes"
                  placeholder="Alguma informação adicional..."
                  className="rounded-xl border-gray-200 dark:border-gray-700 mt-2"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            )}

            <Button 
              onClick={handleBookingSubmit}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-medium"
              disabled={!bookingData.date || !bookingData.time || loading}
            >
              {loading ? "Processando..." : user ? "Continuar para Pagamento" : "Fazer Login para Continuar"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Finalizar Pagamento</h3>
              <p className="text-gray-600 dark:text-gray-400">Confirme os detalhes e realize o pagamento</p>
            </div>

            <Card className="rounded-xl border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Agendamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Serviço:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Data:</span>
                  <span className="font-medium">{new Date(bookingData.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Horário:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">R$ {selectedService?.price.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePaymentComplete}
              className="w-full h-12 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-xl font-medium"
              disabled={loading}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {loading ? "Processando..." : "Pagar Agora"}
            </Button>
          </div>
        );

      case 'confirmation':
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Agendamento Confirmado!</h3>
              <p className="text-gray-600 dark:text-gray-400">Seu agendamento foi realizado com sucesso.</p>
            </div>

            <Card className="rounded-xl border-gray-200 dark:border-gray-700">
              <CardContent className="p-6 space-y-3">
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Detalhes do agendamento:</p>
                  <div className="space-y-2">
                    <p><strong>Serviço:</strong> {selectedService?.name}</p>
                    <p><strong>Local:</strong> {selectedService?.provider}</p>
                    <p><strong>Data:</strong> {new Date(bookingData.date).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Horário:</strong> {bookingData.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-medium"
              >
                Ver Agendamentos
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="flex-1 h-12 rounded-xl border-gray-200 dark:border-gray-700"
              >
                Fechar
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl rounded-xl border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Faça seu primeiro agendamento</DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6 px-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-600 text-white' : 
                    'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 
                    isCompleted ? 'text-green-600 dark:text-green-500' : 
                    'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </DialogHeader>
        
        <div className="px-2">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerJourneyModal;
