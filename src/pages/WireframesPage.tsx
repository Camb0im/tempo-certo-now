
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  Heart, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Home,
  User,
  Bell,
  List
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WireframesPage = () => {
  const [selectedWireframe, setSelectedWireframe] = useState("home");
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("14:30");

  const categories = [
    { name: "Restaurantes", icon: "🍽️", color: "bg-orange-100" },
    { name: "Barbearias", icon: "✂️", color: "bg-blue-100" },
    { name: "Pet Shops", icon: "🐕", color: "bg-green-100" },
    { name: "Salões", icon: "💅", color: "bg-pink-100" },
    { name: "Clínicas", icon: "🏥", color: "bg-red-100" },
    { name: "Academia", icon: "💪", color: "bg-purple-100" }
  ];

  const timeSlots = [
    "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"
  ];

  const WireframeHome = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Header com busca */}
      <div className="bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-brand-gray-medium" />
          <Input 
            placeholder="Buscar serviços ou estabelecimentos..." 
            className="pl-10 h-12 text-base border-brand-gray-soft focus:border-brand-primary"
          />
        </div>
      </div>

      {/* Categorias */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-brand-primary mb-4">Categorias de Serviços</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category, index) => (
            <Card key={index} className="text-center p-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-xl">{category.icon}</span>
              </div>
              <p className="text-sm font-medium text-brand-primary">{category.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Estabelecimentos Próximos */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-brand-primary mb-4">Próximos de Você</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-brand-gray-soft rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-primary">Estabelecimento {item}</h3>
                  <div className="flex items-center space-x-1 text-sm text-brand-gray-medium">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.{item + 3}</span>
                    <span>•</span>
                    <span>0.{item}km</span>
                  </div>
                  <p className="text-sm text-brand-gray-medium">Categoria exemplo</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Navegação inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-gray-soft">
        <div className="flex justify-around py-2">
          {[
            { icon: Home, label: "Início", active: true },
            { icon: List, label: "Agendamentos", active: false },
            { icon: Bell, label: "Notificações", active: false },
            { icon: User, label: "Perfil", active: false }
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center py-2 px-4">
              <item.icon className={`h-6 w-6 ${item.active ? 'text-brand-secondary' : 'text-brand-gray-medium'}`} />
              <span className={`text-xs mt-1 ${item.active ? 'text-brand-secondary font-medium' : 'text-brand-gray-medium'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const WireframeEstablishment = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Header com imagem de capa */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 left-4 bg-white/80 hover:bg-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        {/* Logo/Info do estabelecimento */}
        <div className="absolute -bottom-8 left-4 right-4">
          <Card className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 bg-white border-2 border-brand-secondary rounded-lg shadow-sm"></div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-brand-primary">Barbearia Estilo</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">4.8</span>
                  </div>
                  <Badge variant="secondary" className="bg-brand-secondary text-brand-primary">
                    Aberto
                  </Badge>
                  <span className="text-sm text-brand-gray-medium">0.3km</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs de navegação */}
      <div className="mt-12 p-4">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-3 mt-4">
            {[
              { name: "Corte Masculino", duration: "30 min", price: "R$ 25,00" },
              { name: "Barba Completa", duration: "20 min", price: "R$ 15,00" },
              { name: "Corte + Barba", duration: "45 min", price: "R$ 35,00" }
            ].map((service, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-primary">{service.name}</h3>
                    <p className="text-sm text-brand-gray-medium mt-1">
                      Duração: {service.duration}
                    </p>
                    <p className="text-lg font-bold text-brand-primary mt-2">{service.price}</p>
                  </div>
                  <Button className="bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white">
                    Ver Horários
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const WireframeScheduling = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-brand-primary ml-3">Escolher Data e Hora</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Informações do serviço */}
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-brand-gray-soft rounded-lg"></div>
            <div>
              <h3 className="font-semibold text-brand-primary">Corte Masculino</h3>
              <p className="text-sm text-brand-gray-medium">Barbearia Estilo • 30 min • R$ 25,00</p>
            </div>
          </div>
        </Card>

        {/* Calendário */}
        <Card className="p-4">
          <h3 className="font-semibold text-brand-primary mb-4">Selecionar Data</h3>
          
          {/* Header do calendário */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h4 className="font-medium text-brand-primary">Dezembro 2024</h4>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-sm font-medium text-brand-gray-medium py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                className={`p-2 text-sm rounded-lg ${
                  day.toString() === selectedDate
                    ? 'bg-brand-secondary text-brand-primary font-semibold'
                    : day < 13
                    ? 'text-brand-gray-soft cursor-not-allowed'
                    : 'text-brand-primary hover:bg-brand-secondary/20'
                }`}
                disabled={day < 13}
                onClick={() => setSelectedDate(day.toString())}
              >
                {day}
              </button>
            ))}
          </div>
        </Card>

        {/* Horários disponíveis */}
        <Card className="p-4">
          <h3 className="font-semibold text-brand-primary mb-4">Horários Disponíveis</h3>
          
          {/* Filtros por período */}
          <div className="flex space-x-2 mb-4">
            {['Manhã', 'Tarde', 'Noite'].map((period) => (
              <Badge key={period} variant="outline" className="cursor-pointer">
                {period}
              </Badge>
            ))}
          </div>

          {/* Grid de horários */}
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  time === selectedTime
                    ? 'bg-brand-secondary text-brand-primary border-brand-secondary font-semibold'
                    : 'border-brand-gray-soft text-brand-primary hover:border-brand-secondary'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </Card>

        {/* Botão de continuar */}
        <Button 
          className="w-full h-12 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold"
          disabled={!selectedDate || !selectedTime}
        >
          Continuar para Confirmação
        </Button>
      </div>
    </div>
  );

  const WireframeConfirmation = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-brand-primary ml-3">Revise seu Agendamento</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Resumo do agendamento */}
        <Card className="p-6">
          <h3 className="font-semibold text-brand-primary mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Detalhes do Agendamento
          </h3>
          
          <div className="space-y-4">
            {/* Estabelecimento */}
            <div className="flex items-center space-x-3 p-3 bg-brand-ice rounded-lg">
              <div className="w-12 h-12 bg-brand-gray-soft rounded-lg"></div>
              <div>
                <h4 className="font-medium text-brand-primary">Barbearia Estilo</h4>
                <p className="text-sm text-brand-gray-medium">Rua das Flores, 123</p>
              </div>
            </div>

            {/* Serviço */}
            <div className="border-l-4 border-brand-secondary pl-4">
              <h4 className="font-medium text-brand-primary">Corte Masculino</h4>
              <p className="text-sm text-brand-gray-medium">Duração estimada: 30 minutos</p>
            </div>

            {/* Data e hora */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-brand-ice rounded-lg">
                <Calendar className="h-5 w-5 mx-auto mb-1 text-brand-primary" />
                <p className="text-sm text-brand-gray-medium">Data</p>
                <p className="font-semibold text-brand-primary">15 de Dezembro</p>
              </div>
              <div className="text-center p-3 bg-brand-ice rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-1 text-brand-primary" />
                <p className="text-sm text-brand-gray-medium">Horário</p>
                <p className="font-semibold text-brand-primary">14:30</p>
              </div>
            </div>

            {/* Preço */}
            <div className="flex justify-between items-center p-3 bg-brand-secondary/10 rounded-lg">
              <span className="font-medium text-brand-primary">Total</span>
              <span className="text-xl font-bold text-brand-primary">R$ 25,00</span>
            </div>
          </div>
        </Card>

        {/* Campo de observações */}
        <Card className="p-4">
          <h3 className="font-medium text-brand-primary mb-3">Observações (opcional)</h3>
          <textarea 
            placeholder="Adicione informações extras para o estabelecimento..."
            className="w-full p-3 border border-brand-gray-soft rounded-lg text-brand-primary placeholder-brand-gray-medium resize-none"
            rows={3}
          />
        </Card>

        {/* Política de cancelamento */}
        <Card className="p-4 bg-orange-50 border-orange-200">
          <p className="text-sm text-orange-700">
            <strong>Política de Cancelamento:</strong> Cancelamentos podem ser feitos até 2 horas antes do horário agendado.
          </p>
        </Card>

        {/* Botão de confirmação */}
        <Button className="w-full h-14 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-lg">
          Confirmar Agendamento
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-primary text-white p-6">
        <Link to="/" className="inline-flex items-center text-white hover:text-brand-secondary mb-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar ao Início
        </Link>
        <div>
          <h1 className="text-3xl font-bold mb-2">Wireframes UX/UI</h1>
          <p className="text-brand-ice">
            Arquitetura da informação e navegabilidade das telas críticas do aplicativo
          </p>
        </div>
      </div>

      {/* Navegação dos wireframes */}
      <div className="bg-white border-b border-brand-gray-soft sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex space-x-6 overflow-x-auto">
            {[
              { id: "home", label: "A: Início/Explorar" },
              { id: "establishment", label: "B: Perfil do Estabelecimento" },
              { id: "scheduling", label: "C: Seleção de Data/Hora" },
              { id: "confirmation", label: "D: Confirmação" }
            ].map((wireframe) => (
              <button
                key={wireframe.id}
                onClick={() => setSelectedWireframe(wireframe.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  selectedWireframe === wireframe.id
                    ? 'border-brand-secondary text-brand-primary'
                    : 'border-transparent text-brand-gray-medium hover:text-brand-primary'
                }`}
              >
                {wireframe.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo dos wireframes */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Descrição da tela atual */}
          <div className="mb-8 p-6 bg-brand-ice rounded-lg">
            <h2 className="text-xl font-semibold text-brand-primary mb-3">
              {selectedWireframe === "home" && "Tela A: Dashboard do Cliente - Início/Explorar"}
              {selectedWireframe === "establishment" && "Tela B: Perfil do Estabelecimento"}
              {selectedWireframe === "scheduling" && "Tela C: Seleção de Data e Hora"}
              {selectedWireframe === "confirmation" && "Tela D: Resumo e Confirmação"}
            </h2>
            <p className="text-brand-gray-medium">
              {selectedWireframe === "home" && "Ponto de entrada principal com busca proeminente, categorias organizadas e estabelecimentos próximos. Navegação inferior fixa para acesso rápido às principais funcionalidades."}
              {selectedWireframe === "establishment" && "Apresentação completa do estabelecimento com imagem de capa, informações essenciais, ações rápidas e listagem organizada de serviços disponíveis."}
              {selectedWireframe === "scheduling" && "Interface intuitiva para seleção de data via calendário limpo e horários disponíveis organizados por período, com feedback visual claro sobre disponibilidade."}
              {selectedWireframe === "confirmation" && "Revisão completa do agendamento com todas as informações organizadas hierarquicamente, campo opcional para observações e CTA de confirmação em destaque."}
            </p>
          </div>

          {/* Simulador mobile */}
          <div className="flex justify-center">
            <div className="w-80 bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
              <div className="bg-white rounded-[1.5rem] overflow-hidden">
                {selectedWireframe === "home" && <WireframeHome />}
                {selectedWireframe === "establishment" && <WireframeEstablishment />}
                {selectedWireframe === "scheduling" && <WireframeScheduling />}
                {selectedWireframe === "confirmation" && <WireframeConfirmation />}
              </div>
            </div>
          </div>

          {/* Anotações de UX */}
          <div className="mt-8 p-6 bg-white border border-brand-gray-soft rounded-lg">
            <h3 className="text-lg font-semibold text-brand-primary mb-4">Princípios UX Aplicados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-brand-primary mb-2">Simplicidade Radical</h4>
                <p className="text-sm text-brand-gray-medium">
                  Interface clean com foco na tarefa principal de agendamento, eliminando distrações desnecessárias.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-brand-primary mb-2">Clareza Absoluta</h4>
                <p className="text-sm text-brand-gray-medium">
                  Hierarquia visual clara, tipografia legível e uso consistente das cores da identidade visual.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-brand-primary mb-2">Feedback Constante</h4>
                <p className="text-sm text-brand-gray-medium">
                  Estados visuais para seleções, botões desabilitados quando necessário e confirmações de ações.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-brand-primary mb-2">Eficiência</h4>
                <p className="text-sm text-brand-gray-medium">
                  Fluxo otimizado de agendamento em apenas 4 passos: buscar → selecionar → agendar → confirmar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireframesPage;
