
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface BookingActionsProps {
  bookingId: string;
  serviceName: string;
  currentDate: string;
  currentTime: string;
  onUpdate: (bookingId: string, action: "reschedule" | "cancel") => void;
}

const BookingActions = ({
  bookingId,
  serviceName,
  currentDate,
  currentTime,
  onUpdate
}: BookingActionsProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);
  const { toast } = useToast();

  const availableDates = [
    "2024-01-20",
    "2024-01-21", 
    "2024-01-22",
    "2024-01-23",
    "2024-01-24"
  ];

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data e horário.",
        variant: "destructive",
      });
      return;
    }

    setIsRescheduling(true);
    
    setTimeout(() => {
      onUpdate(bookingId, "reschedule");
      setIsRescheduling(false);
      toast({
        title: "Agendamento reagendado!",
        description: `Novo horário: ${selectedDate} às ${selectedTime}`,
      });
    }, 2000);
  };

  const handleCancel = () => {
    onUpdate(bookingId, "cancel");
    toast({
      title: "Agendamento cancelado",
      description: "Seu agendamento foi cancelado com sucesso.",
    });
  };

  const handleBookAgain = () => {
    toast({
      title: "Redirecionando...",
      description: "Levando você para fazer um novo agendamento.",
    });
    setTimeout(() => {
      window.location.href = "/explore";
    }, 1500);
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Reagendar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reagendar {serviceName}</DialogTitle>
            <DialogDescription>
              Agendamento atual: {currentDate} às {currentTime}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Nova data</Label>
              <select
                className="w-full p-2 border rounded mt-1"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Selecione uma data</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('pt-BR')}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Novo horário</Label>
              <select
                className="w-full p-2 border rounded mt-1"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Selecione um horário</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              onClick={handleReschedule}
              disabled={isRescheduling}
              className="bg-tc-blue hover:bg-tc-blue-dark"
            >
              {isRescheduling ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Reagendando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar reagendamento
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja cancelar?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Seu agendamento de "{serviceName}" 
              será cancelado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não, manter agendamento</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, cancelar agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleBookAgain}
        className="text-tc-blue hover:text-tc-blue-dark"
      >
        Agendar novamente
      </Button>
    </div>
  );
};

export default BookingActions;
