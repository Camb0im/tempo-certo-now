
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, ShieldCheck, UserCheck, DollarSign } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-tc-gray rounded-full px-4 py-1.5 mb-6">
              <Clock className="h-4 w-4 text-tc-blue" />
              <span className="text-sm font-medium">Economize tempo no dia a dia</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Diga adeus às filas e esperas desnecessárias
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              O TempoCerto permite que você economize tempo em pequenos compromissos do dia a dia, com agendamentos inteligentes e micro pagamentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cadastro">
                <Button className="btn-primary w-full sm:w-auto">Comece agora</Button>
              </Link>
              <Link to="/como-funciona">
                <Button variant="outline" className="btn-outline w-full sm:w-auto">Como funciona</Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:flex justify-center hidden">
            <div className="relative h-[500px] w-[350px] bg-gradient-to-br from-tc-blue to-tc-blue-dark rounded-3xl shadow-xl overflow-hidden">
              <div className="absolute inset-1 bg-white rounded-2xl p-4">
                <div className="bg-tc-gray rounded-lg h-12 mb-4 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-tc-blue mr-2" />
                  <span className="font-semibold">TempoCerto</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-1">Barbearia Stylus</h3>
                    <p className="text-sm text-gray-500">Corte de cabelo - 30min</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="bg-tc-blue bg-opacity-10 text-tc-blue rounded-md p-2 text-xs text-center">9:30</div>
                      <div className="bg-tc-blue text-white rounded-md p-2 text-xs text-center animate-pulse-subtle">10:00</div>
                      <div className="bg-tc-blue bg-opacity-10 text-tc-blue rounded-md p-2 text-xs text-center">10:30</div>
                    </div>
                    <div className="mt-3 text-center py-2 bg-tc-green rounded text-white text-sm">
                      Comprar horário R$ 0,99
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-1">Clínica Bem Estar</h3>
                    <p className="text-sm text-gray-500">Consulta rápida - 15min</p>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      <div className="bg-tc-blue bg-opacity-10 text-tc-blue rounded-md p-2 text-xs text-center">13:15</div>
                      <div className="bg-tc-blue bg-opacity-10 text-tc-blue rounded-md p-2 text-xs text-center">13:30</div>
                      <div className="bg-tc-blue bg-opacity-10 text-tc-blue rounded-md p-2 text-xs text-center">13:45</div>
                      <div className="bg-tc-blue bg-opacity-10 text-tc-blue rounded-md p-2 text-xs text-center">14:00</div>
                    </div>
                  </div>
                  
                  <div className="bg-tc-gray rounded-lg p-4">
                    <h3 className="font-medium text-sm mb-2">Próximos agendamentos</h3>
                    <div className="space-y-2">
                      <div className="flex items-center bg-white rounded-md p-2 text-xs">
                        <div className="h-8 w-8 rounded-full bg-tc-blue flex items-center justify-center text-white mr-2">BS</div>
                        <div>
                          <p className="font-medium">Barbearia Stylus</p>
                          <p className="text-gray-500">Hoje, 10:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-tc-blue" />
            </div>
            <h3 className="text-xl font-medium mb-2">Economize tempo</h3>
            <p className="text-gray-600">Agende seus compromissos sem esperas desnecessárias por apenas R$ 0,99.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-tc-green bg-opacity-10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-tc-green" />
            </div>
            <h3 className="text-xl font-medium mb-2">Garantia de horário</h3>
            <p className="text-gray-600">Seu slot é garantido e exclusivo, sem surpresas de última hora.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6 text-tc-blue" />
            </div>
            <h3 className="text-xl font-medium mb-2">Fácil de usar</h3>
            <p className="text-gray-600">Busque serviços próximos, selecione um horário e pronto!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
