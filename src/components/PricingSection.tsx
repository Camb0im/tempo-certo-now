
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PricingSection = () => {
  const { toast } = useToast();

  const handlePlanSelection = (planName: string) => {
    toast({
      title: `Plano ${planName} selecionado!`,
      description: "Redirecionando para o processo de agendamento...",
    });
    
    if (planName === "Básico") {
      setTimeout(() => {
        window.location.href = "/explore";
      }, 2000);
    } else {
      setTimeout(() => {
        window.location.href = "/cadastro";
      }, 2000);
    }
  };

  const plans = [
    {
      name: "Básico",
      price: "0,99",
      period: "por agendamento",
      description: "Para uso eventual do TempoCerto",
      features: [
        "1 agendamento por vez",
        "Escolha de horários",
        "Confirmação por e-mail",
        "Avaliação de serviços"
      ],
      button: "Comece grátis",
      featured: false
    },
    {
      name: "Premium",
      price: "7,99",
      period: "por mês",
      description: "Para quem utiliza regularmente",
      features: [
        "10 agendamentos por mês",
        "Prioridade em horários populares",
        "Notificações por SMS",
        "Cancelamento flexível",
        "Histórico completo"
      ],
      button: "Assinar agora",
      featured: true
    },
    {
      name: "Negócios",
      price: "29,90",
      period: "por mês",
      description: "Para prestadores de serviços",
      features: [
        "Gerenciamento de agenda",
        "Personalização de horários",
        "Integração com calendários",
        "Relatórios e análises",
        "Suporte prioritário",
        "Página personalizada"
      ],
      button: "Contatar vendas",
      featured: false
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos e preços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às suas necessidades e economize tempo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.featured
                  ? "border-2 border-tc-blue shadow-lg scale-105 md:scale-110"
                  : "border border-gray-200"
              }`}
            >
              {plan.featured && (
                <div className="bg-tc-blue text-white text-center text-sm font-medium py-1">
                  Mais Popular
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-tc-green mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.featured
                      ? "bg-tc-blue hover:bg-tc-blue-dark"
                      : "bg-white border border-tc-blue text-tc-blue hover:bg-tc-blue hover:text-white"
                  }`}
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {plan.button}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
