
import React, { memo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

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
    businessLogo?: string;
  };
}

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 transition-colors ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-tc-gray-300"}`}
      />
    ))}
  </div>
));

const ServiceCard = memo(({ service }: ServiceCardProps) => {
  return (
    <Card className="minimal-card hover:shadow-card transition-all duration-300 hover:scale-[1.02] group overflow-hidden">
      <div className="h-48 bg-tc-gray-100 relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Business Logo */}
        {service.businessLogo && (
          <div className="absolute top-3 left-3 w-12 h-12 bg-white rounded-lg shadow-minimal p-2">
            <img 
              src={service.businessLogo} 
              alt={`Logo ${service.provider}`}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        
        {/* Distance Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-tc-gray-700">
          {service.distance} km
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-hierarchy-3 group-hover:text-tc-blue transition-colors line-clamp-1">
              {service.name}
            </CardTitle>
            <CardDescription className="text-body mt-1">{service.provider}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center text-caption">
          <MapPin className="h-4 w-4 mr-2 text-tc-gray-400 flex-shrink-0" />
          <span className="line-clamp-1">{service.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={service.rating} />
            <span className="text-sm font-medium text-tc-gray-700">{service.rating}</span>
            <span className="text-caption">({service.reviews})</span>
          </div>
          
          <div className="text-right">
            <div className="text-hierarchy-3 text-tc-blue">R$ {service.price.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button className="w-full minimal-button bg-tc-blue hover:bg-tc-blue-dark text-white">
          Agendar Agora
        </Button>
      </CardFooter>
    </Card>
  );
});

ServiceCard.displayName = "ServiceCard";
StarRating.displayName = "StarRating";

export default ServiceCard;
