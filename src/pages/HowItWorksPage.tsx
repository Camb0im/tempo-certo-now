
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import CtaSection from "@/components/CtaSection";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-16 pb-12 bg-tc-gray bg-opacity-30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Como funciona o TempoCerto</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça o passo a passo para começar a economizar tempo nos seus pequenos compromissos do dia a dia.
            </p>
          </div>
        </div>
        
        <HowItWorks />
        
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-2">Como o TempoCerto funciona para prestadores de serviços?</h3>
                <p className="text-gray-600">
                  Os prestadores de serviços podem se cadastrar na plataforma, definir sua agenda e disponibilizar horários. 
                  Eles recebem os agendamentos feitos pelos usuários e podem gerenciar todo o fluxo de atendimento. Cada agendamento 
                  gera uma pequena taxa que é compartilhada entre o TempoCerto e o prestador.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-2">Preciso pagar para cada agendamento?</h3>
                <p className="text-gray-600">
                  No plano Básico, você paga R$ 0,99 por agendamento. Se você utiliza o serviço com frequência, 
                  recomendamos o plano Premium por R$ 7,99/mês, que inclui até 10 agendamentos mensais, além de 
                  benefícios extras como prioridade em horários populares.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-2">O que acontece se eu não comparecer ao horário agendado?</h3>
                <p className="text-gray-600">
                  Cancelamentos devem ser feitos com a antecedência mínima definida pelo prestador de serviço. 
                  Caso você não compareça sem cancelar, isso afeta sua reputação na plataforma, podendo limitar 
                  futuros agendamentos com determinados prestadores.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-2">Em quais cidades o TempoCerto está disponível?</h3>
                <p className="text-gray-600">
                  Atualmente estamos em fase de expansão, com operação inicialmente nas principais capitais brasileiras. 
                  Nossa meta é expandir para mais cidades em breve. Você pode verificar a disponibilidade na sua região 
                  utilizando o recurso de geolocalização do aplicativo.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
