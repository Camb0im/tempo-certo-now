
export interface BookingData {
  date: string;
  time: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
  serviceId?: string;
  providerId?: string;
}

export interface ServiceData {
  id: number | string;
  name: string;
  provider: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  businessLogo: string;
  duration: string;
  location: string;
}

export interface BookingFormData {
  serviceId: string;
  timeSlotId: string;
  paymentAmount: number;
  userDetails?: {
    name: string;
    email: string;
    phone: string;
  };
}
