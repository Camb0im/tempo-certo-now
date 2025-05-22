
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import CtaSection from "@/components/CtaSection";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-16 pb-12 bg-tc-gray bg-opacity-30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Planos e preços</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o plano que melhor atende às suas necessidades e comece a economizar tempo hoje mesmo.
            </p>
          </div>
        </div>
        
        <PricingSection />
        
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Comparativo de planos</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-4 text-left">Recursos</th>
                    <th className="py-4 px-4 text-center">Básico</th>
                    <th className="py-4 px-4 text-center bg-tc-blue bg-opacity-5 rounded-t-lg">Premium</th>
                    <th className="py-4 px-4 text-center">Negócios</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">Agendamentos</td>
                    <td className="py-4 px-4 text-center">Pagamento por uso</td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">10 por mês</td>
                    <td className="py-4 px-4 text-center">Ilimitados</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Cancelamentos</td>
                    <td className="py-4 px-4 text-center">Até 2h antes</td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">Até 30min antes</td>
                    <td className="py-4 px-4 text-center">Flexível</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Notificações</td>
                    <td className="py-4 px-4 text-center">Email</td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">Email + SMS</td>
                    <td className="py-4 px-4 text-center">Email + SMS + Push</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Integração com calendário</td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-tc-green mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">
                      <Check className="h-5 w-5 text-tc-green mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-tc-green mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Histórico de agendamentos</td>
                    <td className="py-4 px-4 text-center">30 dias</td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">6 meses</td>
                    <td className="py-4 px-4 text-center">Ilimitado</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Prioridade em horários</td>
                    <td className="py-4 px-4 text-center">-</td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">
                      <Check className="h-5 w-5 text-tc-green mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-5 w-5 text-tc-green mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Suporte</td>
                    <td className="py-4 px-4 text-center">Email</td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5">Email + Chat</td>
                    <td className="py-4 px-4 text-center">Dedicado</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4"></td>
                    <td className="py-4 px-4 text-center">
                      <Button variant="outline" className="w-full border-tc-blue text-tc-blue">Escolher</Button>
                    </td>
                    <td className="py-4 px-4 text-center bg-tc-blue bg-opacity-5 rounded-b-lg">
                      <Button className="w-full bg-tc-blue hover:bg-tc-blue-dark">Escolher</Button>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button variant="outline" className="w-full border-tc-blue text-tc-blue">Escolher</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
