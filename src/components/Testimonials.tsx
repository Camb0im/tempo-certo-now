
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Silva",
    role: "Profissional de Marketing",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "O TempoCerto mudou minha rotina! Consigo encaixar um corte de cabelo no horário de almoço sem perder tempo em filas.",
    stars: 5
  },
  {
    name: "Carlos Mendes",
    role: "Empresário",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Como dono de barbearia, o TempoCerto ajudou a organizar minha agenda e a reduzir desistências de última hora.",
    stars: 5
  },
  {
    name: "Juliana Costa",
    role: "Médica",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Fantástico! Consigo organizar meus pequenos compromissos sem conflitos com a agenda do consultório.",
    stars: 4
  },
  {
    name: "Roberto Almeida",
    role: "Designer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "A melhor parte é poder agendar consultas rápidas sem ficar horas esperando. Vale cada centavo!",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-tc-gray bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">O que dizem nossos usuários</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pessoas e negócios que economizam tempo todos os dias com o TempoCerto.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
