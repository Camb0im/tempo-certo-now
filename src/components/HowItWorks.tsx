
import React, { useEffect, useState } from "react";
import { Search, Calendar, CreditCard, Clock } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8 text-white" />,
    title: "Busque serviços próximos",
    description: "Encontre salões, barbearias, clínicas e outros serviços perto de você."
  },
  {
    icon: <Calendar className="h-8 w-8 text-white" />,
    title: "Escolha um horário",
    description: "Selecione o horário disponível que melhor se encaixa na sua agenda."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-white" />,
    title: "Pague uma taxa simbólica",
    description: "Apenas R$ 0,99 para garantir seu horário sem filas ou esperas."
  },
  {
    icon: <Clock className="h-8 w-8 text-white" />,
    title: "Economize seu tempo",
    description: "Chegue no horário marcado e seja atendido imediatamente."
  }
];

const HowItWorks = () => {
  const [iconScales, setIconScales] = useState([1, 1, 1, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.step-icon');
      const viewportCenter = window.innerHeight / 2;
      
      const newScales = Array.from(elements).map((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        const maxDistance = window.innerHeight / 2;
        
        // Calcular escala baseada na proximidade (1.0 a 1.3)
        const proximityRatio = Math.max(0, (maxDistance - distance) / maxDistance);
        return 1 + (proximityRatio * 0.3);
      });
      
      setIconScales(newScales);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Calcular escala inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Como funciona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Um processo simples e intuitivo para economizar seu tempo.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Line connector */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-tc-blue bg-opacity-20 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            <div className="space-y-12 md:space-y-24 relative">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className="md:w-1/2 p-6 flex justify-center">
                    <div 
                      className="step-icon h-16 w-16 rounded-full bg-tc-blue flex items-center justify-center z-10 shadow-lg transition-transform duration-300 ease-out"
                      style={{ transform: `scale(${iconScales[index] || 1})` }}
                    >
                      {step.icon}
                      <span className="absolute -bottom-1 -right-1 bg-white h-6 w-6 rounded-full border-2 border-tc-blue flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className={`md:w-1/2 p-6 mt-6 md:mt-0 text-center md:text-left ${index % 2 !== 0 && 'md:text-right'}`}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
