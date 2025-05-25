
import React, { memo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
        className={`h-4 w-4 transition-colors ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))}
  </div>
));

const ServiceCard = memo(({ service }: ServiceCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBookingClick = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa fazer login para agendar um serviço.",
      });
      navigate('/login', { state: { from: `/service/${service.id}` } });
      return;
    }
    
    // Se usuário está logado, redireciona para página de detalhes do serviço
    navigate(`/service/${service.id}`);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Business Logo */}
        {service.businessLogo && (
          <div className="absolute top-3 left-3 w-12 h-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-2">
            <img 
              src={service.businessLogo} 
              alt={`Logo ${service.provider}`}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        
        {/* Distance Badge */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300">
          {service.distance} km
        </div>
      </div>
      
      <CardHeader className="pb-3 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 text-gray-900 dark:text-gray-100">
              {service.name}
            </CardTitle>
            <CardDescription className="text-sm mt-1 text-gray-600 dark:text-gray-400">{service.provider}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0 px-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="line-clamp-1">{service.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={service.rating} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{service.rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({service.reviews})</span>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">R$ {service.price.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 p-6">
        <Button 
          onClick={handleBookingClick}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-xl transition-colors duration-200"
        >
          Agendar Agora
        </Button>
      </CardFooter>
    </Card>
  );
});

ServiceCard.displayName = "ServiceCard";
StarRating.displayName = "StarRating";

export default ServiceCard;
