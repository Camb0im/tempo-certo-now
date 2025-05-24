import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useBookingFlow } from "@/hooks/useBookingFlow";

// Dados de exemplo
const serviceDetails = {
  id: "service-123",
  name: "Corte de Cabelo",
  provider: {
    id: "provider-456",
    name: "Barbearia Vintage",
    image: "/placeholder.svg",
    address: "Rua Augusta, 1500, Consolação",
    city: "São Paulo",
    rating: 4.8,
    reviews: 45
  },
  description: "Corte de cabelo profissional com barbeiro especializado. Inclui lavagem e finalização.",
  duration: 30,
  price: 45,
  images: [
    "/placeholder.svg", 
    "/placeholder.svg", 
    "/placeholder.svg"
  ],
  reviews: [
    {
      id: 1,
      user: "Carlos Silva",
      avatar: null,
      rating: 5,
      comment: "Excelente serviço, rápido e profissional. Recomendo!",
      date: "2023-05-10"
    },
    {
      id: 2,
      user: "Ana Costa",
      avatar: null,
      rating: 4,
      comment: "Muito bom atendimento, ambiente agradável. Voltarei mais vezes.",
      date: "2023-05-05"
    }
  ],
  availableDates: [
    {
      date: "2023-05-25",
      slots: [
        { id: "slot-1", time: "10:00", available: true },
        { id: "slot-2", time: "11:00", available: true },
        { id: "slot-3", time: "14:00", available: true },
        { id: "slot-4", time: "15:00", available: true },
        { id: "slot-5", time: "16:00", available: false }
      ]
    },
    {
      date: "2023-05-26",
      slots: [
        { id: "slot-6", time: "09:00", available: true },
        { id: "slot-7", time: "10:00", available: true },
        { id: "slot-8", time: "11:00", available: false },
        { id: "slot-9", time: "14:00", available: true },
        { id: "slot-10", time: "15:00", available: true }
      ]
    },
    {
      date: "2023-05-27",
      slots: [
        { id: "slot-11", time: "09:00", available: true },
        { id: "slot-12", time: "10:00", available: true },
        { id: "slot-13", time: "11:00", available: true },
        { id: "slot-14", time: "14:00", available: true },
        { id: "slot-15", time: "15:00", available: true }
      ]
    }
  ]
};

const ServiceDetailsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createBooking, confirmBooking, loading: bookingLoading } = useBookingFlow();
  
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleDateNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedDate > 0) {
      setSelectedDate(selectedDate - 1);
    } else if (direction === 'next' && selectedDate < serviceDetails.availableDates.length - 1) {
      setSelectedDate(selectedDate + 1);
    }
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleNextStep = async () => {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    if (bookingStep === 1 && selectedSlot) {
      // Criar agendamento
      const selectedSlotDetails = serviceDetails.availableDates
        .flatMap(date => date.slots)
        .find(slot => slot.id === selectedSlot);
      
      const selectedDateDetails = serviceDetails.availableDates[selectedDate];
      
      if (selectedSlotDetails && selectedDateDetails) {
        const booking = await createBooking({
          serviceId: serviceDetails.id,
          providerId: serviceDetails.provider.id,
          date: selectedDateDetails.date,
          time: selectedSlotDetails.time,
          totalAmount: serviceDetails.price * 1.05 // Incluindo taxa
        });
        
        if (booking) {
          setBookingId(booking.id);
          setBookingStep(2);
        }
      }
    }
  };

  const handleConfirmBooking = async () => {
    if (bookingId) {
      await confirmBooking(bookingId);
    }
  };

  const handlePreviousStep = () => {
    setBookingStep(1);
    setSelectedSlot(null);
    setBookingId(null);
  };

  // Formatar a data
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    });
  };

  // Encontrar o slot selecionado
  const selectedSlotDetails = selectedSlot 
    ? serviceDetails.availableDates.flatMap(date => date.slots).find(slot => slot.id === selectedSlot)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center hover:bg-transparent hover:text-tc-blue pl-0"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Coluna da esquerda */}
          <div className="md:col-span-3 space-y-6">
            <Carousel>
              <CarouselContent>
                {serviceDetails.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${serviceDetails.name} - imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div>
              <h1 className="text-3xl font-bold mb-2">{serviceDetails.name}</h1>
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <span className="inline-block bg-yellow-100 p-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </span>
                  <span className="ml-1 font-medium">{serviceDetails.provider.rating}</span>
                  <span className="text-sm text-gray-500">({serviceDetails.provider.reviews} avaliações)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{serviceDetails.provider.address}</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="bg-tc-blue/10 text-tc-blue rounded-full px-3 py-1 text-sm font-medium flex items-center mr-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {serviceDetails.duration} minutos
                </div>
                <div className="text-lg font-bold">
                  R$ {serviceDetails.price.toFixed(2)}
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="mb-4">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Sobre o serviço</h3>
                    <p className="text-gray-700">{serviceDetails.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Sobre o local</h3>
                    <div className="flex items-start space-x-3">
                      <div className="h-16 w-16 rounded-lg overflow-hidden">
                        <img 
                          src={serviceDetails.provider.image} 
                          alt={serviceDetails.provider.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{serviceDetails.provider.name}</h4>
                        <p className="text-sm text-gray-500">{serviceDetails.provider.address}</p>
                        <p className="text-sm text-gray-500">{serviceDetails.provider.city}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    {serviceDetails.reviews.map(review => (
                      <div key={review.id} className="border-b pb-4 mb-4 last:border-0">
                        <div className="flex items-center mb-2">
                          <UserAvatar 
                            src={review.avatar}
                            name={review.user}
                            size="sm"
                            className="mr-3"
                          />
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Coluna da direita */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {bookingStep === 1 ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Agende seu horário</h2>
                    
                    <div className="flex items-center justify-between mb-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDateNavigation('prev')}
                        disabled={selectedDate === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">
                        {formatDate(serviceDetails.availableDates[selectedDate].date)}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDateNavigation('next')}
                        disabled={selectedDate === serviceDetails.availableDates.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {serviceDetails.availableDates[selectedDate].slots.map(slot => (
                        <Button
                          key={slot.id}
                          variant={selectedSlot === slot.id ? "default" : "outline"}
                          className={slot.available ? "" : "opacity-50 cursor-not-allowed"}
                          disabled={!slot.available}
                          onClick={() => handleSlotSelect(slot.id)}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                    
                    {selectedSlot && (
                      <Button 
                        className="w-full mt-4" 
                        onClick={handleNextStep}
                        disabled={bookingLoading}
                      >
                        {bookingLoading ? "Criando agendamento..." : "Continuar"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Confirme sua reserva</h2>
                    
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded">
                        <div className="flex items-center text-sm mb-1">
                          <Calendar className="h-4 w-4 mr-2 text-tc-blue" />
                          <span className="font-medium">
                            {formatDate(serviceDetails.availableDates[selectedDate].date)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-tc-blue" />
                          <span className="font-medium">
                            {selectedSlotDetails?.time} - Duração: {serviceDetails.duration} min
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-b py-3">
                        <div className="flex justify-between items-center">
                          <span>{serviceDetails.name}</span>
                          <span className="font-medium">R$ {serviceDetails.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                          <span>Taxa de serviço</span>
                          <span>R$ {(serviceDetails.price * 0.05).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span>R$ {(serviceDetails.price * 1.05).toFixed(2)}</span>
                      </div>
                      
                      <div className="bg-green-50 text-green-700 p-3 rounded text-sm flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>
                          Ao confirmar sua reserva, você concorda com os 
                          termos de serviço e política de cancelamento.
                        </p>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <Button 
                          className="w-full bg-tc-green hover:bg-tc-green-dark text-white"
                          onClick={handleConfirmBooking}
                          disabled={bookingLoading}
                        >
                          {bookingLoading ? "Confirmando..." : "Confirmar Agendamento"}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handlePreviousStep}
                          disabled={bookingLoading}
                        >
                          Voltar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
