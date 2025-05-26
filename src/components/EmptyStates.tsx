
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Search, 
  Heart, 
  Clock,
  MapPin,
  AlertCircle,
  Wifi,
  RefreshCw
} from 'lucide-react';

interface EmptyStateProps {
  type: 'no-bookings' | 'no-results' | 'no-favorites' | 'no-history' | 'no-connection' | 'error';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyStates: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className = ""
}) => {
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'no-bookings':
        return {
          icon: Calendar,
          title: title || 'Nenhum agendamento futuro',
          description: description || 'Você não possui agendamentos marcados. Que tal explorar os serviços disponíveis?',
          actionLabel: actionLabel || 'Explorar Serviços',
          illustration: 'calendar'
        };
      
      case 'no-results':
        return {
          icon: Search,
          title: title || 'Nenhum resultado encontrado',
          description: description || 'Não encontramos nada com os filtros aplicados. Tente ajustar sua busca.',
          actionLabel: actionLabel || 'Limpar Filtros',
          illustration: 'search'
        };
      
      case 'no-favorites':
        return {
          icon: Heart,
          title: title || 'Nenhum favorito ainda',
          description: description || 'Favorite estabelecimentos para encontrá-los rapidamente aqui.',
          actionLabel: actionLabel || 'Descobrir Estabelecimentos',
          illustration: 'heart'
        };
      
      case 'no-history':
        return {
          icon: Clock,
          title: title || 'Sem histórico de agendamentos',
          description: description || 'Seus agendamentos anteriores aparecerão aqui para consulta.',
          actionLabel: actionLabel || 'Fazer Primeiro Agendamento',
          illustration: 'history'
        };
      
      case 'no-connection':
        return {
          icon: Wifi,
          title: title || 'Sem conexão com a internet',
          description: description || 'Verifique sua conexão e tente novamente.',
          actionLabel: actionLabel || 'Tentar Novamente',
          illustration: 'connection'
        };
      
      case 'error':
        return {
          icon: AlertCircle,
          title: title || 'Ops, algo deu errado',
          description: description || 'Ocorreu um erro inesperado. Tente recarregar a página.',
          actionLabel: actionLabel || 'Recarregar',
          illustration: 'error'
        };
      
      default:
        return {
          icon: AlertCircle,
          title: 'Estado não definido',
          description: 'Este estado vazio não foi configurado.',
          actionLabel: 'Voltar',
          illustration: 'default'
        };
    }
  };

  const config = getEmptyStateConfig();
  const IconComponent = config.icon;

  // Ilustrações personalizadas para cada tipo
  const renderIllustration = (illustrationType: string) => {
    const baseClasses = "w-32 h-32 mx-auto mb-6 relative";
    
    switch (illustrationType) {
      case 'calendar':
        return (
          <div className={baseClasses}>
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-ice to-brand-gray-soft/30 rounded-2xl relative">
              <div className="absolute inset-4 bg-white rounded-lg shadow-minimal">
                <div className="h-2 bg-brand-primary rounded-t-lg"></div>
                <div className="p-2 space-y-1">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`h-2 rounded ${i === 4 ? 'bg-brand-secondary' : 'bg-brand-gray-soft/50'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <Calendar className="absolute -bottom-2 -right-2 h-8 w-8 text-brand-primary bg-white rounded-full p-1 shadow-minimal" />
            </div>
          </div>
        );
      
      case 'search':
        return (
          <div className={baseClasses}>
            <div className="w-20 h-20 mx-auto bg-brand-gray-soft/30 rounded-full flex items-center justify-center mb-4 relative">
              <Search className="h-10 w-10 text-brand-primary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center">
                <span className="text-brand-primary text-xs font-bold">0</span>
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-brand-gray-soft/50 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        );
      
      case 'heart':
        return (
          <div className={baseClasses}>
            <div className="relative">
              <Heart className="h-20 w-20 mx-auto text-brand-gray-soft/50 mb-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-dashed border-brand-gray-soft rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-center space-x-3">
              <div className="w-3 h-3 bg-brand-secondary/30 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-primary/30 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-secondary/30 rounded-full"></div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className={baseClasses}>
            <div className="w-20 h-20 mx-auto bg-brand-ice rounded-full flex items-center justify-center relative">
              <Clock className="h-10 w-10 text-brand-primary" />
              <div className="absolute top-2 right-2 w-3 h-3 bg-brand-gray-soft/50 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-brand-secondary/50 rounded-full"></div>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-brand-gray-soft to-transparent rounded-full"></div>
            </div>
          </div>
        );
      
      case 'connection':
        return (
          <div className={baseClasses}>
            <div className="relative">
              <Wifi className="h-20 w-20 mx-auto text-brand-gray-soft/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-0.5 bg-red-500 rotate-45 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <RefreshCw className="h-6 w-6 text-brand-primary animate-spin" />
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className={baseClasses}>
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center relative">
              <AlertCircle className="h-10 w-10 text-red-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={baseClasses}>
            <IconComponent className="h-20 w-20 mx-auto text-brand-gray-soft" />
          </div>
        );
    }
  };

  return (
    <Card className={`brand-card border-none ${className}`}>
      <CardContent className="text-center py-12 px-6">
        {renderIllustration(config.illustration)}
        
        <h3 className="brand-text-hierarchy-2 mb-3">
          {config.title}
        </h3>
        
        <p className="brand-text-body mb-6 max-w-md mx-auto">
          {config.description}
        </p>
        
        {config.actionLabel && onAction && (
          <Button 
            onClick={onAction}
            className="brand-button-primary"
          >
            {config.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyStates;
