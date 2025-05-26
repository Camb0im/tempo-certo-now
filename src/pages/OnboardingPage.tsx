
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Clock, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      icon: Clock,
      title: "Organize seu Tempo",
      subtitle: "Agende serviços com facilidade",
      description: "Encontre e agende os melhores serviços da sua região em segundos. Sem filas, sem espera.",
      illustration: "time-organization"
    },
    {
      icon: Calendar,
      title: "Controle Total",
      subtitle: "Gerencie todos os seus agendamentos",
      description: "Visualize, reagende ou cancele seus compromissos quando quiser. Tudo na palma da sua mão.",
      illustration: "full-control"
    },
    {
      icon: User,
      title: "Experiência Personalizada",
      subtitle: "Favoritos e recomendações",
      description: "Salve seus estabelecimentos favoritos e receba sugestões personalizadas baseadas no seu perfil.",
      illustration: "personalized"
    }
  ];

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Ilustração personalizada baseada no step
  const renderIllustration = (type: string) => {
    const baseClasses = "w-48 h-48 mx-auto mb-8 relative";
    
    switch (type) {
      case "time-organization":
        return (
          <div className={baseClasses}>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="absolute top-4 right-8 w-4 h-4 bg-brand-secondary rounded-full animate-brand-pulse"></div>
            <div className="absolute bottom-8 left-4 w-6 h-6 bg-brand-secondary/60 rounded-full"></div>
          </div>
        );
      case "full-control":
        return (
          <div className={baseClasses}>
            <div className="w-40 h-32 mx-auto bg-gradient-to-r from-brand-ice to-brand-gray-soft/30 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-4 bg-white rounded-xl shadow-minimal">
                <div className="p-4">
                  <div className="h-2 bg-brand-primary/20 rounded mb-2"></div>
                  <div className="h-2 bg-brand-secondary rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-brand-primary/20 rounded w-1/2"></div>
                </div>
              </div>
              <Calendar className="absolute bottom-2 right-2 h-6 w-6 text-brand-primary" />
            </div>
          </div>
        );
      case "personalized":
        return (
          <div className={baseClasses}>
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-brand-primary rounded-full flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex justify-center space-x-4">
                <div className="w-16 h-16 bg-brand-secondary/30 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-brand-secondary rounded-lg"></div>
                </div>
                <div className="w-16 h-16 bg-brand-secondary/30 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg"></div>
                </div>
                <div className="w-16 h-16 bg-brand-secondary/30 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-brand-secondary rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-ice via-white to-brand-gray-soft/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8 space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-brand-secondary' 
                  : index < currentStep 
                    ? 'w-2 bg-brand-primary' 
                    : 'w-2 bg-brand-gray-soft'
              }`}
            />
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="brand-card border-none shadow-brand">
          <CardContent className="p-8 text-center">
            {/* Illustration */}
            {renderIllustration(currentStepData.illustration)}

            {/* Content */}
            <div className="space-y-4 mb-8">
              <h1 className="brand-text-hierarchy-1 text-2xl">
                {currentStepData.title}
              </h1>
              <h2 className="brand-text-hierarchy-3 text-brand-secondary">
                {currentStepData.subtitle}
              </h2>
              <p className="brand-text-body text-center max-w-sm mx-auto">
                {currentStepData.description}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="text-brand-gray-medium hover:text-brand-primary disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>

              {currentStep === onboardingSteps.length - 1 ? (
                <Link to="/cadastro">
                  <Button className="brand-button-primary">
                    Começar Agora
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextStep}
                  className="brand-button-primary"
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Link 
            to="/login" 
            className="brand-text-caption text-brand-gray-medium hover:text-brand-primary transition-colors"
          >
            Já tenho uma conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
