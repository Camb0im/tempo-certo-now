import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Calendar, BarChart, Settings, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessPage = () => {
  const { toast } = useToast();

  const handlePlanSelection = (planName: string) => {
    toast({
      title: `Plano ${planName} selecionado!`,
      description: "Redirecionando para o processo de cadastro...",
    });
    // Simular redirecionamento após 2 segundos
    setTimeout(() => {
      window.location.href = "/provider/register";
    }, 2000);
  };

  const handleContactSales = () => {
    toast({
      title: "Contato com vendas",
      description: "Em breve nossa equipe entrará em contato com você!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-tc-blue to-tc-blue-dark text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">TempoCerto para Negócios</h1>
                <p className="text-xl opacity-90 mb-8">
                  Transforme a experiência dos seus clientes e optimize sua agenda com agendamentos simplificados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-white text-tc-blue hover:bg-gray-100 font-semibold text-lg"
                    onClick={() => handlePlanSelection("Iniciante")}
                  >
                    Comece agora
                  </Button>
                  <Button 
                    className="bg-white text-tc-blue hover:bg-gray-100 font-semibold text-lg border-white"
                    onClick={handleContactSales}
                  >
                    Fale com vendas
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mr-3">
                      <Calendar className="h-6 w-6 text-tc-blue" />
                    </div>
                    <h3 className="text-tc-blue font-semibold text-lg">Agenda do Negócio</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">Carlos Mendes</p>
                        <p className="text-sm text-gray-500">Corte de cabelo - 30min</p>
                      </div>
                      <span className="bg-tc-green bg-opacity-10 text-tc-green text-sm px-3 py-1 rounded-full">
                        10:00
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">Ana Silva</p>
                        <p className="text-sm text-gray-500">Corte + Barba - 45min</p>
                      </div>
                      <span className="bg-tc-blue bg-opacity-10 text-tc-blue text-sm px-3 py-1 rounded-full">
                        11:00
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">Roberto Almeida</p>
                        <p className="text-sm text-gray-500">Barba - 20min</p>
                      </div>
                      <span className="bg-tc-blue bg-opacity-10 text-tc-blue text-sm px-3 py-1 rounded-full">
                        12:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefícios para o seu negócio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O TempoCerto ajuda a otimizar sua agenda, reduzir faltas e melhorar a experiência dos clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:z-10 relative">
              <div className="h-12 w-12 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-tc-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Gestão de Agenda</h3>
              <p className="text-gray-600">
                Controle total sobre sua disponibilidade. Defina horários, duração de serviços e intervalos entre atendimentos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:z-10 relative">
              <div className="h-12 w-12 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-tc-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Redução de Faltas</h3>
              <p className="text-gray-600">
                O micropagamento reduz drasticamente o número de faltas e desistências de última hora.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:z-10 relative">
              <div className="h-12 w-12 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-tc-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Análise de Dados</h3>
              <p className="text-gray-600">
                Relatórios detalhados sobre seus agendamentos, horários mais procurados e feedback dos clientes.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-tc-gray bg-opacity-30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Como funciona para negócios</h2>
                <ul className="space-y-6">
                  <li className="flex">
                    <div className="h-8 w-8 rounded-full bg-tc-blue flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Cadastre seu negócio</h3>
                      <p className="text-gray-600">
                        Crie uma conta para seu negócio e configure seu perfil com todas as informações relevantes.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="h-8 w-8 rounded-full bg-tc-blue flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Configure sua agenda</h3>
                      <p className="text-gray-600">
                        Defina seus horários de funcionamento, serviços oferecidos e a duração de cada um.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="h-8 w-8 rounded-full bg-tc-blue flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Receba agendamentos</h3>
                      <p className="text-gray-600">
                        Os clientes encontram seu negócio, pagam uma pequena taxa e agendam horários.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="h-8 w-8 rounded-full bg-tc-blue flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Gerencie seus atendimentos</h3>
                      <p className="text-gray-600">
                        Acompanhe seu calendário, confirme presenças e receba avaliações dos clientes.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="hidden lg:flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
                  alt="Atendente apertando a mão de um cliente"
                  className="rounded-xl shadow-lg object-cover h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Planos para negócios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Escolha o plano ideal para as necessidades do seu estabelecimento.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Iniciante</h3>
                  <p className="text-gray-600 text-sm mb-6">Para pequenos negócios</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$ 29,90</span>
                    <span className="text-gray-500 ml-1">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Até 50 agendamentos/mês</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Gestão básica de agenda</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Relatórios simples</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-white border border-tc-blue text-tc-blue hover:bg-tc-blue hover:text-white"
                    onClick={() => handlePlanSelection("Iniciante")}
                  >
                    Comece agora
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border-2 border-tc-blue overflow-hidden transition-all duration-300 hover:shadow-lg relative scale-105">
                <div className="bg-tc-blue text-white text-center text-sm font-medium py-1">
                  Mais Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Profissional</h3>
                  <p className="text-gray-600 text-sm mb-6">Para negócios em crescimento</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$ 69,90</span>
                    <span className="text-gray-500 ml-1">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Agendamentos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Gestão avançada de agenda</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Relatórios detalhados</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Integração com calendário</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Suporte prioritário</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-tc-blue hover:bg-tc-blue-dark text-white"
                    onClick={() => handlePlanSelection("Profissional")}
                  >
                    Escolher plano
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Empresarial</h3>
                  <p className="text-gray-600 text-sm mb-6">Para redes e franquias</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">R$ 149,90</span>
                    <span className="text-gray-500 ml-1">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Tudo do plano Profissional</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Múltiplas unidades</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">API personalizada</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Gerente de contas dedicado</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-white border border-tc-blue text-tc-blue hover:bg-tc-blue hover:text-white"
                    onClick={handleContactSales}
                  >
                    Fale com vendas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessPage;
