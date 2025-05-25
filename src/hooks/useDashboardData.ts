
import { useState, useCallback } from "react";

interface BookingData {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "completed";
  price: number;
  location: string;
}

export const useDashboardData = () => {
  const [bookings, setBookings] = useState<BookingData[]>([
    {
      id: "1",
      serviceName: "Corte de Cabelo Masculino",
      providerName: "Barbearia Vintage",
      date: "2024-01-15",
      time: "14:00",
      status: "confirmed",
      price: 45,
      location: "Centro, São Paulo"
    },
    {
      id: "2", 
      serviceName: "Mesa para Jantar",
      providerName: "Restaurante Italiano",
      date: "2024-01-10",
      time: "19:30",
      status: "completed",
      price: 60,
      location: "Pinheiros, São Paulo"
    },
    {
      id: "3",
      serviceName: "Consulta Médica",
      providerName: "Clínica Saúde Plena", 
      date: "2024-01-08",
      time: "10:00",
      status: "completed",
      price: 150,
      location: "Jardins, São Paulo"
    }
  ]);

  const updateBooking = useCallback((bookingId: string, action: "reschedule" | "cancel") => {
    setBookings(prev => 
      prev.map(booking => {
        if (booking.id === bookingId) {
          if (action === "cancel") {
            return { ...booking, status: "cancelled" as const };
          }
          // Para reagendamento, mantemos como confirmed mas poderíamos alterar data/hora
          return booking;
        }
        return booking;
      })
    );
  }, []);

  const upcomingBookings = bookings.filter(b => b.status === "confirmed");
  const bookingHistory = bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  return {
    bookings,
    upcomingBookings,
    bookingHistory,
    updateBooking
  };
};
