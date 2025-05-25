
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

// Dados de exemplo - incluindo business logo
const serviceDetails = {
  id: "service-123",
  name: "Corte de Cabelo",
  provider: {
    id: "provider-456",
    name: "Barbearia Vintage",
    image: "/placeholder.svg",
    businessLogo: "/placeholder.svg", // Logo do empreendimento
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
      // Criar agendamento usando os campos corretos
      const booking = await createBooking({
        serviceId: serviceDetails.id,
        timeSlotId: selectedSlot,
        paymentAmount: serviceDetails.price * 1.05 // Incluindo taxa
      });
      
      if (booking) {
        setBookingId(booking.id);
        setBookingStep(2);
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 pl-0 text-gray-700 dark:text-gray-300"
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
                    <div className="h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl">
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
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{serviceDetails.name}</h1>
              <div className="flex items-center mb-4">
                <div className="mr-3 flex items-center">
                  {/* Logo do empreendimento */}
                  {serviceDetails.provider.businessLogo && (
                    <div className="w-10 h-10 mr-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1.5">
                      <img 
                        src={serviceDetails.provider.businessLogo} 
                        alt={`Logo ${serviceDetails.provider.name}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <span className="inline-block bg-yellow-100 dark:bg-yellow-900 p-1 rounded mr-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{serviceDetails.provider.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({serviceDetails.provider.reviews} avaliações)</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{serviceDetails.provider.address}</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl px-3 py-1 text-sm font-medium flex items-center mr-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {serviceDetails.duration} minutos
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  R$ {serviceDetails.price.toFixed(2)}
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="mb-4 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="info" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Informações</TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Avaliações</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Sobre o serviço</h3>
                    <p className="text-gray-700 dark:text-gray-300">{serviceDetails.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Sobre o local</h3>
                    <div className="flex items-start space-x-3">
                      <div className="h-16 w-16 rounded-xl overflow-hidden">
                        <img 
                          src={serviceDetails.provider.image} 
                          alt={serviceDetails.provider.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{serviceDetails.provider.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{serviceDetails.provider.address}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{serviceDetails.provider.city}</p>
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
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
              <CardContent className="p-6">
                {bookingStep === 1 ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Agende seu horário</h2>
                    
                    <div className="flex items-center justify-between mb-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDateNavigation('prev')}
                        disabled={selectedDate === 0}
                        className="rounded-lg border-gray-200 dark:border-gray-700"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatDate(serviceDetails.availableDates[selectedDate].date)}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDateNavigation('next')}
                        disabled={selectedDate === serviceDetails.availableDates.length - 1}
                        className="rounded-lg border-gray-200 dark:border-gray-700"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {serviceDetails.availableDates[selectedDate].slots.map(slot => (
                        <Button
                          key={slot.id}
                          variant={selectedSlot === slot.id ? "default" : "outline"}
                          className={`rounded-lg h-11 ${
                            selectedSlot === slot.id 
                              ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" 
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          } ${
                            slot.available ? "" : "opacity-50 cursor-not-allowed"
                          }`}
                          disabled={!slot.available}
                          onClick={() => handleSlotSelect(slot.id)}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                    
                    {selectedSlot && (
                      <Button 
                        className="w-full mt-4 h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl font-medium" 
                        onClick={handleNextStep}
                        disabled={bookingLoading}
                      >
                        {bookingLoading ? "Criando agendamento..." : "Continuar"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Confirme sua reserva</h2>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                        <div className="flex items-center text-sm mb-1">
                          <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(serviceDetails.availableDates[selectedDate].date)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {selectedSlotDetails?.time} - Duração: {serviceDetails.duration} min
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900 dark:text-gray-100">{serviceDetails.name}</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">R$ {serviceDetails.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>Taxa de serviço</span>
                          <span>R$ {(serviceDetails.price * 0.05).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold text-gray-900 dark:text-gray-100">
                        <span>Total</span>
                        <span>R$ {(serviceDetails.price * 1.05).toFixed(2)}</span>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-xl text-sm flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <p>
                          Ao confirmar sua reserva, você concorda com os 
                          termos de serviço e política de cancelamento.
                        </p>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <Button 
                          className="w-full h-11 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-xl font-medium"
                          onClick={handleConfirmBooking}
                          disabled={bookingLoading}
                        >
                          {bookingLoading ? "Confirmando..." : "Confirmar Agendamento"}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full h-11 rounded-xl border-gray-200 dark:border-gray-700"
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
