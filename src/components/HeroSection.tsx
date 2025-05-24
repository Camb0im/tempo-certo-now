
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerJourneyModal from "./CustomerJourneyModal";

const HeroSection = () => {
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-tc-gray-50 via-white to-tc-blue/5 dark:from-tc-dark-bg dark:via-tc-dark-card dark:to-tc-purple/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                <span className="text-tc-gray-900 dark:text-tc-gray-100">Agende seus serviços</span>
                <br />
                <span className="text-tc-blue">no tempo certo</span>
              </h1>
              
              <p className="text-xl text-body max-w-2xl mx-auto leading-relaxed">
                Conectamos você aos melhores profissionais da sua região. 
                Agende com facilidade e tenha a garantia de um atendimento excepcional.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <Button 
                  size="lg" 
                  className="minimal-button bg-tc-blue hover:bg-tc-blue-dark text-white px-8 py-4 text-lg"
                  onClick={() => setShowJourneyModal(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Começar Agora
                </Button>
                
                <Link to="/explore">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="minimal-button border-tc-gray-300 hover:border-tc-blue hover:text-tc-blue px-8 py-4 text-lg"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Explorar Serviços
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-tc-blue/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-tc-blue" />
                </div>
                <h3 className="text-hierarchy-3">Busca Inteligente</h3>
                <p className="text-body">Encontre profissionais próximos a você com base na sua localização</p>
              </div>
              
              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-tc-green/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-tc-green" />
                </div>
                <h3 className="text-hierarchy-3">Agendamento Fácil</h3>
                <p className="text-body">Reserve em poucos cliques e receba confirmação instantânea</p>
              </div>
              
              <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 bg-tc-purple/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-tc-purple" />
                </div>
                <h3 className="text-hierarchy-3">Tempo Real</h3>
                <p className="text-body">Acompanhe seus agendamentos e receba lembretes automáticos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomerJourneyModal 
        isOpen={showJourneyModal} 
        onClose={() => setShowJourneyModal(false)} 
      />
    </>
  );
};

export default HeroSection;
