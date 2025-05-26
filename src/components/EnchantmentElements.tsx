
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Heart, 
  Star, 
  Clock,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

// Animação de sucesso para agendamento
export const BookingSuccessAnimation = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 animate-fade-in">
      <Card className="brand-card max-w-sm mx-4 overflow-hidden">
        <CardContent className="text-center py-8">
          {/* Ícone animado */}
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-secondary to-brand-primary rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            
            {/* Efeito de ondas */}
            <div className="absolute inset-0 -m-4">
              <div className="w-24 h-24 border-2 border-brand-secondary/30 rounded-full animate-ping"></div>
            </div>
            <div className="absolute inset-0 -m-8">
              <div className="w-32 h-32 border border-brand-secondary/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          <h3 className="brand-text-hierarchy-2 text-brand-primary mb-2">
            Agendamento Confirmado! 🎉
          </h3>
          <p className="brand-text-body">
            Você receberá uma confirmação em instantes
          </p>

          {/* Sparkles animados */}
          <div className="absolute top-4 left-4">
            <Sparkles className="h-4 w-4 text-brand-secondary animate-bounce" />
          </div>
          <div className="absolute top-6 right-6">
            <Sparkles className="h-3 w-3 text-brand-primary animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Botão de favoritar com animação
export const AnimatedFavoriteButton = ({ isFavorited, onToggle }: { isFavorited: boolean; onToggle: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`relative transition-all duration-200 ${isAnimating ? 'animate-bounce' : ''}`}
    >
      <Heart 
        className={`h-5 w-5 transition-all duration-300 ${
          isFavorited 
            ? 'text-red-500 fill-current scale-110' 
            : 'text-brand-gray-medium hover:text-red-500'
        }`} 
      />
      
      {/* Efeito de coração flutuante */}
      {isAnimating && isFavorited && (
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="h-4 w-4 text-red-500 fill-current absolute top-0 left-1/2 transform -translate-x-1/2 animate-ping opacity-75" />
        </div>
      )}
    </Button>
  );
};

// Indicador de economia de tempo
export const TimeSavingIndicator = ({ minutesSaved }: { minutesSaved: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animate-slide-up">
      <Card className="brand-card border-brand-secondary/50 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="brand-text-hierarchy-3 text-brand-primary">
                Tempo Economizado
              </p>
              <p className="brand-text-caption">
                Você economizou <strong>{minutesSaved} minutos</strong> agendando pelo app!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Rating animado
export const AnimatedRating = ({ rating, onRate }: { rating: number; onRate: (rating: number) => void }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRate = (starRating: number) => {
    setIsAnimating(true);
    onRate(starRating);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className={`transition-all duration-200 ${
            isAnimating && star <= rating ? 'animate-bounce' : ''
          }`}
          style={{ animationDelay: `${star * 0.1}s` }}
        >
          <Star
            className={`h-6 w-6 transition-all duration-200 ${
              star <= (hoveredStar || rating)
                ? 'text-yellow-500 fill-current scale-110'
                : 'text-brand-gray-soft hover:text-yellow-400'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// Card de estabelecimento com hover elegante
export const EnchantedEstablishmentCard = ({ establishment }: { establishment: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`brand-card cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
        isHovered ? 'border-brand-secondary' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Imagem com overlay animado */}
        <div className="relative h-48 bg-brand-gray-soft rounded-t-lg overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 text-white">
              <Badge className="bg-white/20 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="brand-text-hierarchy-3">{establishment.name}</h3>
            <AnimatedFavoriteButton 
              isFavorited={establishment.isFavorited} 
              onToggle={() => {}} 
            />
          </div>
          
          <p className="brand-text-caption mb-3">{establishment.category}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="brand-text-caption">{establishment.rating}</span>
            </div>
            
            <Badge 
              className={`transition-all duration-300 ${
                isHovered 
                  ? 'bg-brand-secondary text-brand-primary transform scale-105' 
                  : 'bg-brand-primary/10 text-brand-primary'
              }`}
            >
              <Clock className="h-3 w-3 mr-1" />
              {establishment.distance}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Transição de página elegante
export const PageTransition = ({ children, isVisible }: { children: React.ReactNode; isVisible: boolean }) => {
  return (
    <div className={`transition-all duration-500 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    }`}>
      {children}
    </div>
  );
};
