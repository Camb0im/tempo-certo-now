
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaymentSession {
  sessionId: string;
  url: string;
}

export interface BookingDetails {
  id: string;
  payment_status: string;
  status: string;
  service_name?: string;
  provider_business_name?: string;
  provider_address?: string | null;
  time_slot_start_time?: string;
  time_slot_end_time?: string;
  service_duration?: number;
}
