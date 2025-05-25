
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, CreditCard, MapPin, Star } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: {
    id: number;
    name: string;
    provider: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    location: string;
  };
}

const BookingFlowModal = ({ isOpen, onClose, service }: BookingFlowModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleConfirmBooking();
    }
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Agendamento confirmado!",
      description: `Seu horário foi agendado para ${format(selectedDate!, "dd/MM/yyyy", { locale: ptBR })} às ${selectedTime}`,
    });
    onClose();
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-tc-blue" />
            Agendar Serviço
          </DialogTitle>
          <DialogDescription>
            Etapa {step} de 3 - {step === 1 ? "Escolher data" : step === 2 ? "Escolher horário" : "Confirmar agendamento"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Resumo do serviço */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex gap-3">
              <img src={service.image} alt={service.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.provider}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs ml-1">{service.rating}</span>
                  </div>
                  <span className="text-tc-blue font-semibold text-sm">R$ {service.price}</span>
                </div>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </div>
              
              {isCalendarOpen && (
                <div className="border rounded-lg p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </div>
              )}
            </div>
          )}

          {step === 2 && selectedDate && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">
                  Horários disponíveis para {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`text-sm ${selectedTime === time ? "bg-tc-blue" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-tc-blue mb-2">Confirmar Agendamento</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(selectedDate!, "dd/MM/yyyy", { locale: ptBR })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>R$ {service.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                <p>✓ Confirmação por e-mail</p>
                <p>✓ Lembre-te será enviado por SMS</p>
                <p>✓ Cancelamento até 2h antes</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Voltar
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            className="flex-1 bg-tc-blue hover:bg-tc-blue-dark"
            disabled={step === 1 && !selectedDate || step === 2 && !selectedTime}
          >
            {step === 3 ? "Confirmar Agendamento" : "Próximo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFlowModal;
