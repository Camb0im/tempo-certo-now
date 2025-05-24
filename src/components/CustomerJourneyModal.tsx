
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

interface CustomerJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type JourneyStep = 'search' | 'select' | 'book' | 'payment' | 'confirmation';

const CustomerJourneyModal = ({ isOpen, onClose }: CustomerJourneyModalProps) => {
  const [currentStep, setCurrentStep] = useState<JourneyStep>('search');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: '',
    name: '',
    email: '',
    phone: ''
  });
  const navigate = useNavigate();

  const steps = [
    { id: 'search', title: 'Buscar', icon: Search },
    { id: 'select', title: 'Selecionar', icon: Calendar },
    { id: 'book', title: 'Agendar', icon: User },
    { id: 'payment', title: 'Pagamento', icon: CreditCard },
    { id: 'confirmation', title: 'Confirmação', icon: CheckCircle }
  ];

  const mockServices = [
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

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentStep('book');
  };

  const handleBookingSubmit = () => {
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentStep('confirmation');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'search':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-hierarchy-2">Encontre o serviço perfeito</h3>
              <p className="text-body">Explore nossa seleção de serviços disponíveis</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tc-gray-400" />
                <Input 
                  placeholder="Buscar serviços..." 
                  className="minimal-input pl-10"
                />
              </div>
              
              <div className="grid gap-4">
                {mockServices.map((service) => (
                  <Card key={service.id} className="minimal-card hover:shadow-card transition-all cursor-pointer" onClick={() => handleServiceSelect(service)}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-hierarchy-3 line-clamp-1">{service.name}</h4>
                          <p className="text-body text-sm">{service.provider}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{service.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-hierarchy-3 text-tc-blue">R$ {service.price.toFixed(2)}</div>
                          <div className="text-caption">{service.duration}</div>
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
              <h3 className="text-hierarchy-2">Agendar {selectedService?.name}</h3>
              <p className="text-body">{selectedService?.provider}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                  <Input 
                    id="date"
                    type="date" 
                    className="minimal-input mt-2"
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="time" className="text-sm font-medium">Horário</Label>
                  <Input 
                    id="time"
                    type="time" 
                    className="minimal-input mt-2"
                    value={bookingData.time}
                    onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
                  <Input 
                    id="name"
                    placeholder="Seu nome"
                    className="minimal-input mt-2"
                    value={bookingData.name}
                    onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                  <Input 
                    id="phone"
                    placeholder="(11) 99999-9999"
                    className="minimal-input mt-2"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium">Observações (opcional)</Label>
              <Textarea 
                id="notes"
                placeholder="Alguma informação adicional..."
                className="minimal-input mt-2"
                value={bookingData.notes}
                onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <Button 
              onClick={handleBookingSubmit}
              className="w-full minimal-button bg-tc-blue hover:bg-tc-blue-dark text-white"
              disabled={!bookingData.date || !bookingData.time || !bookingData.name}
            >
              Continuar para Pagamento
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-hierarchy-2">Finalizar Pagamento</h3>
              <p className="text-body">Confirme os detalhes e realize o pagamento</p>
            </div>

            <Card className="minimal-card">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Agendamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-body">Serviço:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Data:</span>
                  <span className="font-medium">{new Date(bookingData.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">Horário:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-hierarchy-3">Total:</span>
                  <span className="text-hierarchy-3 text-tc-blue">R$ {selectedService?.price.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePaymentComplete}
              className="w-full minimal-button bg-tc-green hover:bg-tc-green-dark text-white"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pagar Agora
            </Button>
          </div>
        );

      case 'confirmation':
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-tc-green/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-tc-green" />
              </div>
              <h3 className="text-hierarchy-2">Agendamento Confirmado!</h3>
              <p className="text-body">Seu agendamento foi realizado com sucesso.</p>
            </div>

            <Card className="minimal-card">
              <CardContent className="p-6 space-y-3">
                <div className="text-left">
                  <p className="text-caption mb-2">Detalhes do agendamento:</p>
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
                className="flex-1 minimal-button bg-tc-blue hover:bg-tc-blue-dark text-white"
              >
                Ver Agendamentos
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="flex-1 minimal-button"
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
      <DialogContent className="sm:max-w-4xl minimal-card shadow-modal max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-hierarchy-1">Faça seu primeiro agendamento</DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6 px-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    isActive ? 'bg-tc-blue text-white' : 
                    isCompleted ? 'bg-tc-green text-white' : 
                    'bg-tc-gray-200 text-tc-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-tc-blue' : 
                    isCompleted ? 'text-tc-green' : 
                    'text-tc-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-tc-green' : 'bg-tc-gray-200'
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
