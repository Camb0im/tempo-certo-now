
import React, { useState } from "react";
import { Clock, CheckCircle, Target, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BrandIdentityPage = () => {
  const [selectedConcept, setSelectedConcept] = useState("A");

  const concepts = {
    A: {
      name: "Simbólico Abstrato",
      description: "Combina elemento temporal com símbolo de conclusão",
      icon: <Clock className="h-8 w-8" />,
      color: "#3A506B"
    },
    B: {
      name: "Tipográfico com Detalhe",
      description: "Nome com detalhe visual inteligente nas letras",
      icon: <Target className="h-8 w-8" />,
      color: "#3A506B"
    },
    C: {
      name: "Ícone + Nome",
      description: "Combinação harmoniosa de ícone e tipografia",
      icon: <Calendar className="h-8 w-8" />,
      color: "#3A506B"
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7F4] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[#3A506B] hover:text-[#6FFFB0] transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
          <h1 className="text-4xl font-bold text-[#3A506B] mb-2">Identidade Visual - Tempo Certo</h1>
          <p className="text-lg text-[#8A9BA8]">Fundações da marca: logotipos, cores e tipografia</p>
        </div>

        {/* Conceitos de Logotipo */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#3A506B] mb-8">Conceitos de Logotipo</h2>
          
          {/* Seletor de Conceitos */}
          <div className="flex gap-4 mb-8">
            {Object.entries(concepts).map(([key, concept]) => (
              <Button
                key={key}
                onClick={() => setSelectedConcept(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedConcept === key
                    ? "bg-[#3A506B] text-white"
                    : "bg-white text-[#3A506B] border border-[#BCCCDC] hover:bg-[#6FFFB0] hover:text-[#3A506B]"
                }`}
              >
                Conceito {key}
              </Button>
            ))}
          </div>

          {/* Conceito A - Simbólico Abstrato */}
          {selectedConcept === "A" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#3A506B]">Conceito A: Simbólico Abstrato</h3>
                <p className="text-[#8A9BA8]">
                  Combina de forma elegante um elemento temporal com um símbolo de conclusão, 
                  criando um ícone moderno, clean e facilmente reconhecível.
                </p>
                
                {/* Versões do Logo */}
                <div className="space-y-4">
                  <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                    <h4 className="text-lg font-medium text-[#3A506B] mb-4">Versão Principal</h4>
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#3A506B] flex items-center justify-center relative">
                          <Clock className="h-8 w-8 text-white" />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#6FFFB0] rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-[#3A506B]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg border border-[#BCCCDC]">
                      <h4 className="text-sm font-medium text-[#3A506B] mb-4">Fundo Claro</h4>
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#3A506B] flex items-center justify-center">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#3A506B] p-6 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-4">Fundo Escuro</h4>
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#6FFFB0] flex items-center justify-center">
                          <Clock className="h-6 w-6 text-[#3A506B]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                <h4 className="text-lg font-medium text-[#3A506B] mb-6">Ícone do Aplicativo</h4>
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3A506B] to-[#6FFFB0] flex items-center justify-center shadow-lg">
                    <Clock className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conceito B - Tipográfico */}
          {selectedConcept === "B" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#3A506B]">Conceito B: Tipográfico com Detalhe</h3>
                <p className="text-[#8A9BA8]">
                  Utiliza o nome "Tempo Certo" com detalhe visual inteligente no "T" de Tempo, 
                  remetendo a um marcador temporal.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                    <h4 className="text-lg font-medium text-[#3A506B] mb-4">Versão Principal</h4>
                    <div className="flex items-center justify-center">
                      <div className="text-3xl font-bold text-[#3A506B] relative">
                        <span className="relative">
                          T
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-[#6FFFB0] rounded-full"></div>
                        </span>
                        empo 
                        <span className="text-[#6FFFB0]">Certo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg border border-[#BCCCDC]">
                      <h4 className="text-sm font-medium text-[#3A506B] mb-4">Versão Compacta</h4>
                      <div className="flex justify-center">
                        <div className="text-xl font-bold text-[#3A506B]">TC</div>
                      </div>
                    </div>
                    
                    <div className="bg-[#3A506B] p-6 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-4">Fundo Escuro</h4>
                      <div className="flex justify-center">
                        <div className="text-xl font-bold text-[#6FFFB0]">
                          Tempo Certo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                <h4 className="text-lg font-medium text-[#3A506B] mb-6">Variações Tipográficas</h4>
                <div className="space-y-4 text-center">
                  <div className="text-2xl font-bold text-[#3A506B]">Tempo Certo</div>
                  <div className="text-xl font-semibold text-[#3A506B]">TEMPO CERTO</div>
                  <div className="text-lg font-medium text-[#3A506B]">tempo certo</div>
                </div>
              </div>
            </div>
          )}

          {/* Conceito C - Ícone + Nome */}
          {selectedConcept === "C" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#3A506B]">Conceito C: Ícone + Nome</h3>
                <p className="text-[#8A9BA8]">
                  Combinação harmoniosa de um ícone minimalista com o nome "Tempo Certo", 
                  garantindo legibilidade e memorabilidade.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                    <h4 className="text-lg font-medium text-[#3A506B] mb-4">Versão Horizontal</h4>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#3A506B] flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-[#3A506B]">
                        Tempo<span className="text-[#6FFFB0]">Certo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                    <h4 className="text-lg font-medium text-[#3A506B] mb-4">Versão Vertical</h4>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#3A506B] flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xl font-bold text-[#3A506B]">
                        Tempo<span className="text-[#6FFFB0]">Certo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
                <h4 className="text-lg font-medium text-[#3A506B] mb-6">Aplicações</h4>
                <div className="space-y-6">
                  <div className="p-4 bg-[#F0F7F4] rounded-lg">
                    <p className="text-sm text-[#8A9BA8] mb-2">App Icon</p>
                    <div className="w-16 h-16 rounded-2xl bg-[#3A506B] flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-[#3A506B] rounded-lg">
                    <p className="text-sm text-white mb-2">Fundo Escuro</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#6FFFB0] flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-[#3A506B]" />
                      </div>
                      <span className="text-white font-bold">TempoCerto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Paleta de Cores */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#3A506B] mb-8">Paleta de Cores Estratégica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cor Primária */}
            <div className="bg-white rounded-lg border border-[#BCCCDC] overflow-hidden">
              <div className="h-32 bg-[#3A506B]"></div>
              <div className="p-4">
                <h3 className="font-semibold text-[#3A506B] mb-2">Primária</h3>
                <p className="text-sm text-[#8A9BA8] mb-2">Azul Ardósia Profundo</p>
                <p className="text-xs font-mono text-[#8A9BA8]">#3A506B</p>
                <p className="text-xs text-[#8A9BA8] mt-2">
                  Confiança, profissionalismo e organização
                </p>
              </div>
            </div>
            
            {/* Cor Secundária */}
            <div className="bg-white rounded-lg border border-[#BCCCDC] overflow-hidden">
              <div className="h-32 bg-[#6FFFB0]"></div>
              <div className="p-4">
                <h3 className="font-semibold text-[#3A506B] mb-2">Secundária</h3>
                <p className="text-sm text-[#8A9BA8] mb-2">Verde Menta Vibrante</p>
                <p className="text-xs font-mono text-[#8A9BA8]">#6FFFB0</p>
                <p className="text-xs text-[#8A9BA8] mt-2">
                  Ação, destaque positivo e sucesso
                </p>
              </div>
            </div>
            
            {/* Branco Gelo */}
            <div className="bg-white rounded-lg border border-[#BCCCDC] overflow-hidden">
              <div className="h-32 bg-[#F0F7F4] border-b border-[#BCCCDC]"></div>
              <div className="p-4">
                <h3 className="font-semibold text-[#3A506B] mb-2">Base Clara</h3>
                <p className="text-sm text-[#8A9BA8] mb-2">Branco Gelo</p>
                <p className="text-xs font-mono text-[#8A9BA8]">#F0F7F4</p>
                <p className="text-xs text-[#8A9BA8] mt-2">
                  Fundos principais e clareza
                </p>
              </div>
            </div>
            
            {/* Cinzas */}
            <div className="bg-white rounded-lg border border-[#BCCCDC] overflow-hidden">
              <div className="h-32 flex">
                <div className="flex-1 bg-[#BCCCDC]"></div>
                <div className="flex-1 bg-[#8A9BA8]"></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#3A506B] mb-2">Neutros</h3>
                <p className="text-sm text-[#8A9BA8] mb-2">Cinzas de Suporte</p>
                <p className="text-xs font-mono text-[#8A9BA8]">#BCCCDC / #8A9BA8</p>
                <p className="text-xs text-[#8A9BA8] mt-2">
                  Textos e elementos secundários
                </p>
              </div>
            </div>
          </div>
          
          {/* Moodboard de Aplicação */}
          <div className="mt-8 bg-white p-8 rounded-lg border border-[#BCCCDC]">
            <h3 className="text-xl font-semibold text-[#3A506B] mb-6">Proporção de Uso</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="h-4 bg-[#3A506B] rounded"></div>
                <p className="text-sm text-[#8A9BA8]">60% - Azul Ardósia (Base)</p>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-[#6FFFB0] rounded"></div>
                <p className="text-sm text-[#8A9BA8]">20% - Verde Menta (Destaque)</p>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-[#BCCCDC] rounded"></div>
                <p className="text-sm text-[#8A9BA8]">20% - Neutros (Suporte)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sistema Tipográfico */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#3A506B] mb-8">Sistema Tipográfico</h2>
          
          <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Fonte Principal: Nunito Sans</h3>
              <p className="text-[#8A9BA8]">
                Escolhida por sua excelente legibilidade digital e variedade de pesos, 
                garantindo clareza e modernidade em toda a interface.
              </p>
            </div>
            
            {/* Hierarquia Tipográfica */}
            <div className="space-y-8">
              <div className="border-l-4 border-[#6FFFB0] pl-6">
                <h1 className="text-4xl font-bold text-[#3A506B] mb-2">
                  Títulos Principais (H1)
                </h1>
                <p className="text-sm text-[#8A9BA8]">
                  Nunito Sans Bold, 36px, Azul Ardósia Profundo
                </p>
              </div>
              
              <div className="border-l-4 border-[#6FFFB0] pl-6">
                <h2 className="text-2xl font-semibold text-[#3A506B] mb-2">
                  Subtítulos (H2)
                </h2>
                <p className="text-sm text-[#8A9BA8]">
                  Nunito Sans SemiBold, 24px, Azul Ardósia Profundo
                </p>
              </div>
              
              <div className="border-l-4 border-[#6FFFB0] pl-6">
                <p className="text-lg text-[#8A9BA8] mb-2">
                  Corpo de Texto - Descrições e informações principais que precisam de boa legibilidade
                </p>
                <p className="text-sm text-[#8A9BA8]">
                  Nunito Sans Regular, 16px, Cinza Médio
                </p>
              </div>
              
              <div className="border-l-4 border-[#6FFFB0] pl-6">
                <p className="text-sm text-[#BCCCDC] mb-2">
                  Textos Auxiliares - Labels, legendas e informações complementares
                </p>
                <p className="text-xs text-[#8A9BA8]">
                  Nunito Sans Regular/Medium, 14px, Cinza Suave
                </p>
              </div>
            </div>
            
            {/* Exemplo Prático */}
            <div className="mt-12 p-6 bg-[#F0F7F4] rounded-lg">
              <h3 className="text-xl font-semibold text-[#3A506B] mb-4">Exemplo de Aplicação</h3>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-[#3A506B]">Salão Beauty Style</h1>
                <h2 className="text-xl font-semibold text-[#3A506B]">Corte e Escova</h2>
                <p className="text-[#8A9BA8]">
                  Transforme seu visual com nosso serviço de corte e escova profissional. 
                  Nossa equipe especializada utiliza produtos de alta qualidade.
                </p>
                <div className="flex gap-4 text-sm text-[#BCCCDC]">
                  <span>Duração: 45min</span>
                  <span>Preço: R$ 35,00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aplicação em Interface */}
        <section>
          <h2 className="text-3xl font-semibold text-[#3A506B] mb-8">Aplicação em Interface</h2>
          
          <div className="bg-white p-8 rounded-lg border border-[#BCCCDC]">
            <h3 className="text-xl font-semibold text-[#3A506B] mb-6">Exemplo de Card de Serviço</h3>
            
            <div className="max-w-md mx-auto bg-white border border-[#BCCCDC] rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gradient-to-br from-[#3A506B] to-[#6FFFB0] flex items-center justify-center">
                <Clock className="h-16 w-16 text-white" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#3A506B] flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-[#3A506B]">TempoCerto</span>
                </div>
                
                <h3 className="text-xl font-semibold text-[#3A506B] mb-2">Salão Beleza Total</h3>
                <p className="text-[#8A9BA8] mb-4">
                  Corte, escova e tratamentos capilares com agendamento garantido.
                </p>
                
                <div className="flex justify-between items-center text-sm text-[#BCCCDC] mb-4">
                  <span>⭐ 4.8 (127 avaliações)</span>
                  <span>📍 2.1 km</span>
                </div>
                
                <Button className="w-full bg-[#6FFFB0] text-[#3A506B] hover:bg-[#3A506B] hover:text-white font-semibold">
                  Agendar Agora
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandIdentityPage;
