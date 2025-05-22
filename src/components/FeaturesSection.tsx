
import React from "react";
import { Calendar, Clock, MapPin, CreditCard, Bell, Star, Award, Users } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 border border-gray-100 rounded-xl shadow-sm card-hover-effect">
    <div className="h-12 w-12 rounded-full bg-tc-blue bg-opacity-10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-tc-blue" />,
      title: "Geolocalização",
      description: "Encontre serviços próximos a você com um simples toque."
    },
    {
      icon: <Calendar className="h-6 w-6 text-tc-blue" />,
      title: "Agenda Inteligente",
      description: "Slots dinâmicos e flexíveis para atender suas necessidades."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-tc-blue" />,
      title: "Micropagamentos",
      description: "Pague apenas R$ 0,99 para garantir seu horário exclusivo."
    },
    {
      icon: <Bell className="h-6 w-6 text-tc-blue" />,
      title: "Notificações",
      description: "Receba lembretes para nunca perder seus compromissos."
    },
    {
      icon: <Star className="h-6 w-6 text-tc-blue" />,
      title: "Avaliações",
      description: "Avalie e veja avaliações de outros usuários sobre os serviços."
    },
    {
      icon: <Award className="h-6 w-6 text-tc-blue" />,
      title: "Fidelidade",
      description: "Ganhe cashback e pontos a cada agendamento realizado."
    },
    {
      icon: <Users className="h-6 w-6 text-tc-blue" />,
      title: "Para Negócios",
      description: "Ofereça agendamentos para seus clientes com facilidade."
    },
    {
      icon: <Clock className="h-6 w-6 text-tc-blue" />,
      title: "Tempo Real",
      description: "Atualizações em tempo real sobre disponibilidade de horários."
    }
  ];

  return (
    <section className="py-16 bg-tc-gray bg-opacity-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recursos exclusivos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            O TempoCerto possui tudo que você precisa para economizar tempo nos pequenos compromissos do seu dia a dia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
