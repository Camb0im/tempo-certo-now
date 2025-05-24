
import React, { memo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    provider: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    location: string;
    distance: number;
  };
}

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex">
    {Array(5).fill(0).map((_, i) => (
      <svg 
        key={i}
        className={`h-4 w-4 transition-colors ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
));

const ServiceCard = memo(({ service }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 group">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
          {service.distance} km
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg group-hover:text-tc-blue transition-colors">
          {service.name}
        </CardTitle>
        <CardDescription>{service.provider}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
          {service.location}
        </div>
        <div className="flex items-center">
          <StarRating rating={service.rating} />
          <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
          <span className="text-xs text-gray-400 ml-1">({service.reviews})</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="font-medium text-lg">R$ {service.price.toFixed(2)}</div>
        <Button className="transition-all hover:scale-105">Agendar</Button>
      </CardFooter>
    </Card>
  );
});

ServiceCard.displayName = "ServiceCard";
StarRating.displayName = "StarRating";

export default ServiceCard;
