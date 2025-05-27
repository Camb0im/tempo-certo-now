
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
import ContactSalesModal from "@/components/ContactSalesModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PricingSection = () => {
  const plans = [
    {
      name: "Básico",
      price: "Gratuito",
      description: "Perfeito para começar",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Até 5 agendamentos por mês",
        "Busca de estabelecimentos",
        "Avaliações e comentários",
        "Notificações básicas",
        "Suporte por email"
      ],
      buttonText: "Começar Grátis",
      popular: false,
      cta: "signup"
    },
    {
      name: "Premium",
      price: "R$ 19,90/mês",
      description: "Máxima flexibilidade",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Agendamentos ilimitados",
        "Prioridade na busca",
        "Reagendamento gratuito",
        "Notificações avançadas",
        "Suporte prioritário",
        "Desconto em parceiros",
        "Estatísticas pessoais"
      ],
      buttonText: "Assinar Premium",
      popular: true,
      cta: "signup"
    },
    {
      name: "Empresarial",
      price: "Sob consulta",
      description: "Para grandes volumes",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Todas as funcionalidades Premium",
        "Múltiplos usuários",
        "API personalizada",
        "Relatórios avançados",
        "Gerente de conta dedicado",
        "Integração personalizada",
        "SLA garantido"
      ],
      buttonText: "Falar com Vendas",
      popular: false,
      cta: "contact"
    }
  ];

  const PlanComparisonModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-8 text-brand-primary border-brand-primary hover:bg-brand-secondary/20">
          Comparar Todos os Planos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-brand-primary text-xl">
            Comparação Detalhada de Planos
          </DialogTitle>
          <DialogDescription className="text-brand-gray-medium">
            Veja todas as funcionalidades disponíveis em cada plano
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-brand-gray-soft">
                <th className="text-left p-4 text-brand-primary font-semibold">Funcionalidade</th>
                <th className="text-center p-4 text-brand-primary font-semibold">Básico</th>
                <th className="text-center p-4 text-brand-primary font-semibold">Premium</th>
                <th className="text-center p-4 text-brand-primary font-semibold">Empresarial</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Agendamentos mensais", basic: "5", premium: "Ilimitado", enterprise: "Ilimitado" },
                { feature: "Busca de estabelecimentos", basic: "✓", premium: "✓", enterprise: "✓" },
                { feature: "Prioridade na busca", basic: "✗", premium: "✓", enterprise: "✓" },
                { feature: "Reagendamento gratuito", basic: "✗", premium: "✓", enterprise: "✓" },
                { feature: "Notificações", basic: "Básicas", premium: "Avançadas", enterprise: "Avançadas" },
                { feature: "Suporte", basic: "Email", premium: "Prioritário", enterprise: "Dedicado" },
                { feature: "Desconto em parceiros", basic: "✗", premium: "✓", enterprise: "✓" },
                { feature: "Múltiplos usuários", basic: "✗", premium: "✗", enterprise: "✓" },
                { feature: "API personalizada", basic: "✗", premium: "✗", enterprise: "✓" },
                { feature: "Relatórios avançados", basic: "✗", premium: "✗", enterprise: "✓" }
              ].map((row, index) => (
                <tr key={index} className="border-b border-brand-gray-soft/50">
                  <td className="p-4 text-brand-primary">{row.feature}</td>
                  <td className="p-4 text-center text-brand-gray-medium">{row.basic}</td>
                  <td className="p-4 text-center text-brand-gray-medium">{row.premium}</td>
                  <td className="p-4 text-center text-brand-gray-medium">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-brand-ice to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-primary mb-4">
            Escolha o Plano Ideal
          </h2>
          <p className="text-xl text-brand-gray-medium max-w-2xl mx-auto">
            Descomplicamos os preços para que você possa focar no que importa: 
            organizar seu tempo da melhor forma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-brand-secondary shadow-xl scale-105' : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-brand-primary">
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.popular ? 'bg-brand-secondary text-brand-primary' : 'bg-brand-primary text-white'
                }`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-brand-primary">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-brand-gray-medium">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-brand-primary">
                    {plan.price}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-brand-gray-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.cta === "contact" ? (
                  <ContactSalesModal>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white' 
                          : 'bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </ContactSalesModal>
                ) : (
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white' 
                        : 'bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary'
                    }`}
                    onClick={() => window.location.href = '/cadastro'}
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <PlanComparisonModal />
          <p className="text-brand-gray-medium mt-4 text-sm">
            Todos os planos incluem garantia de 30 dias. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
