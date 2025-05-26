
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
  List,
  Filter,
  Settings,
  ChevronDown,
  Check,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MockupsPage = () => {
  const [selectedMockup, setSelectedMockup] = useState("home");
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [favoriteStates, setFavoriteStates] = useState<{[key: string]: boolean}>({});

  const toggleFavorite = (id: string) => {
    setFavoriteStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { 
      name: "Restaurantes", 
      icon: "🍽️", 
      color: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
      bgColor: "bg-gradient-to-br from-orange-100 to-red-100"
    },
    { 
      name: "Barbearias", 
      icon: "✂️", 
      color: "linear-gradient(135deg, #4ECDC4, #44A08D)",
      bgColor: "bg-gradient-to-br from-teal-100 to-cyan-100"
    },
    { 
      name: "Pet Shops", 
      icon: "🐕", 
      color: "linear-gradient(135deg, #A8E6CF, #7FCDCD)",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100"
    },
    { 
      name: "Salões", 
      icon: "💅", 
      color: "linear-gradient(135deg, #FFB6C1, #FFA07A)",
      bgColor: "bg-gradient-to-br from-pink-100 to-rose-100"
    },
    { 
      name: "Clínicas", 
      icon: "🏥", 
      color: "linear-gradient(135deg, #87CEEB, #98D8E8)",
      bgColor: "bg-gradient-to-br from-blue-100 to-sky-100"
    },
    { 
      name: "Academia", 
      icon: "💪", 
      color: "linear-gradient(135deg, #DDA0DD, #DA70D6)",
      bgColor: "bg-gradient-to-br from-purple-100 to-violet-100"
    }
  ];

  const establishments = [
    {
      id: "1",
      name: "Barbearia Moderna",
      category: "Barbearia",
      rating: 4.8,
      distance: "0.3km",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=100&h=100&fit=crop",
      isOpen: true,
      nextAvailable: "14:30"
    },
    {
      id: "2", 
      name: "Restaurante Italiano",
      category: "Restaurante",
      rating: 4.6,
      distance: "0.8km",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=100&h=100&fit=crop",
      isOpen: true,
      nextAvailable: "19:00"
    },
    {
      id: "3",
      name: "Pet Care Center", 
      category: "Pet Shop",
      rating: 4.9,
      distance: "1.2km",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
      logo: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop",
      isOpen: false,
      nextAvailable: "08:00 amanhã"
    }
  ];

  const timeSlots = [
    { time: "08:00", available: true },
    { time: "09:30", available: true },
    { time: "11:00", available: false },
    { time: "12:30", available: false },
    { time: "14:00", available: true },
    { time: "15:30", available: true },
    { time: "17:00", available: true },
    { time: "18:30", available: false }
  ];

  const MockupHome = () => (
    <div className="bg-brand-ice min-h-screen relative">
      {/* Status bar simulado */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span>100%</span>
        </div>
      </div>

      {/* Header com busca elegante */}
      <div className="bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-brand-primary">Olá, Ana!</h1>
          <p className="text-brand-gray-medium">O que você gostaria de agendar hoje?</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-4 h-5 w-5 text-brand-gray-medium" />
          <Input 
            placeholder="Buscar serviços ou estabelecimentos..." 
            className="pl-12 h-14 text-base border-brand-gray-soft focus:border-brand-secondary rounded-xl bg-brand-ice"
          />
          <Button 
            size="icon" 
            className="absolute right-2 top-2 h-10 w-10 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Categorias com estilo premium */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-brand-primary mb-4">Categorias Populares</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="text-center p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white hover:scale-105"
            >
              <div 
                className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm`}
                style={{ background: category.color }}
              >
                <span className="text-2xl filter drop-shadow-sm">{category.icon}</span>
              </div>
              <p className="text-sm font-semibold text-brand-primary">{category.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Estabelecimentos próximos com design premium */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-brand-primary">Próximos de Você</h2>
          <Button variant="ghost" className="text-brand-secondary font-medium">
            Ver todos
          </Button>
        </div>
        <div className="space-y-4">
          {establishments.map((establishment) => (
            <Card key={establishment.id} className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white group hover:scale-[1.02]">
              <div className="flex items-center p-4">
                <div className="relative">
                  <img 
                    src={establishment.image} 
                    alt={establishment.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <img 
                    src={establishment.logo}
                    alt={`${establishment.name} logo`}
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg border-2 border-white object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-brand-primary text-lg">{establishment.name}</h3>
                      <p className="text-sm text-brand-gray-medium mb-2">{establishment.category}</p>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold ml-1">{establishment.rating}</span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${establishment.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} font-medium`}
                        >
                          {establishment.isOpen ? 'Aberto' : 'Fechado'}
                        </Badge>
                        <span className="text-sm text-brand-gray-medium">{establishment.distance}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleFavorite(establishment.id)}
                      className="text-brand-gray-medium hover:text-red-500 transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${favoriteStates[establishment.id] ? 'fill-red-500 text-red-500' : ''} transition-all duration-300`} />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-brand-gray-medium">
                      Próximo horário: <span className="font-semibold text-brand-primary">{establishment.nextAvailable}</span>
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg font-semibold px-4"
                    >
                      Agendar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Navegação inferior com design moderno */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-brand-gray-soft">
        <div className="flex justify-around py-3">
          {[
            { icon: Home, label: "Início", active: true },
            { icon: List, label: "Agendamentos", active: false },
            { icon: Bell, label: "Notificações", active: false },
            { icon: User, label: "Perfil", active: false }
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center py-2 px-4 group">
              <div className={`p-2 rounded-xl transition-all duration-300 ${item.active ? 'bg-brand-secondary/20' : 'group-hover:bg-brand-gray-soft/20'}`}>
                <item.icon className={`h-6 w-6 transition-colors duration-300 ${item.active ? 'text-brand-secondary' : 'text-brand-gray-medium group-hover:text-brand-primary'}`} />
              </div>
              <span className={`text-xs mt-1 transition-colors duration-300 ${item.active ? 'text-brand-secondary font-semibold' : 'text-brand-gray-medium group-hover:text-brand-primary'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const MockupEstablishment = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Status bar */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span>100%</span>
        </div>
      </div>

      {/* Header com imagem hero */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=400&fit=crop"
          alt="Barbearia Moderna"
          className="h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Botões de ação flutuantes */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 left-4 bg-white/90 hover:bg-white backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5 text-brand-primary" />
        </Button>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white backdrop-blur-sm">
            <Heart className="h-4 w-4 text-brand-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white backdrop-blur-sm">
            <Settings className="h-4 w-4 text-brand-primary" />
          </Button>
        </div>
        
        {/* Card de informações principal */}
        <div className="absolute -bottom-12 left-4 right-4">
          <Card className="p-6 bg-white border-0 shadow-xl">
            <div className="flex items-start space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1621607512214-68297480165e?w=120&h=120&fit=crop"
                alt="Logo Barbearia Moderna"
                className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-brand-primary">Barbearia Moderna</h1>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold ml-1">4.8</span>
                    <span className="text-sm text-brand-gray-medium ml-1">(127 avaliações)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge className="bg-green-100 text-green-700 font-semibold">
                    Aberto até 20h
                  </Badge>
                  <span className="text-sm text-brand-gray-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    0.3km
                  </span>
                </div>
              </div>
            </div>
            
            {/* Ações rápidas */}
            <div className="flex space-x-3 mt-6">
              <Button className="flex-1 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold rounded-xl">
                <Phone className="h-4 w-4 mr-2" />
                Ligar
              </Button>
              <Button variant="outline" className="flex-1 border-brand-primary text-brand-primary rounded-xl">
                <MapPin className="h-4 w-4 mr-2" />
                Direções
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs de navegação */}
      <div className="mt-16 p-4">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-brand-ice border border-brand-gray-soft rounded-xl p-1">
            <TabsTrigger value="services" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Serviços</TabsTrigger>
            <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Informações</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="space-y-4 mt-6">
            {[
              { name: "Corte Masculino", duration: "30 min", price: "R$ 25,00", description: "Corte moderno com acabamento profissional" },
              { name: "Barba Completa", duration: "20 min", price: "R$ 15,00", description: "Modelagem e aparação completa da barba" },
              { name: "Corte + Barba", duration: "45 min", price: "R$ 35,00", description: "Combo completo com desconto especial", popular: true }
            ].map((service, index) => (
              <Card key={index} className="p-6 border-0 bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-brand-secondary text-brand-primary px-3 py-1 text-xs font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-brand-primary">{service.name}</h3>
                    <p className="text-sm text-brand-gray-medium mt-1">{service.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-sm text-brand-gray-medium flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </span>
                      <span className="text-2xl font-bold text-brand-primary">{service.price}</span>
                    </div>
                  </div>
                  <Button className="bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white rounded-xl font-semibold px-6">
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

  const MockupScheduling = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Status bar */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span>100%</span>
        </div>
      </div>

      {/* Header com progresso */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 ml-3">
            <h1 className="text-xl font-bold text-brand-primary">Escolher Data e Hora</h1>
            <div className="flex items-center mt-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-brand-gray-soft"></div>
              </div>
              <span className="text-sm text-brand-gray-medium ml-2">Passo 2 de 3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Resumo do serviço selecionado */}
        <Card className="p-6 border-0 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">✂️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-brand-primary">Corte Masculino</h3>
              <p className="text-sm text-brand-gray-medium">Barbearia Moderna • 30 min</p>
              <p className="text-xl font-bold text-brand-primary mt-1">R$ 25,00</p>
            </div>
          </div>
        </Card>

        {/* Seletor de data elegante */}
        <Card className="p-6 border-0 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-brand-secondary" />
            Selecionar Data
          </h3>
          
          {/* Header do calendário */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" className="text-brand-primary">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h4 className="text-lg font-semibold text-brand-primary">Dezembro 2024</h4>
            <Button variant="ghost" size="icon" className="text-brand-primary">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Grid do calendário com design premium */}
          <div className="grid grid-cols-7 gap-1 text-center mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-sm font-semibold text-brand-gray-medium py-3">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                className={`h-12 w-12 text-sm rounded-xl transition-all duration-300 font-medium ${
                  day.toString() === selectedDate
                    ? 'bg-brand-secondary text-brand-primary font-bold shadow-lg scale-105'
                    : day < 13
                    ? 'text-brand-gray-soft cursor-not-allowed'
                    : 'text-brand-primary hover:bg-brand-secondary/20 hover:scale-105'
                }`}
                disabled={day < 13}
                onClick={() => setSelectedDate(day.toString())}
              >
                {day}
              </button>
            ))}
          </div>
        </Card>

        {/* Seletor de horários premium */}
        <Card className="p-6 border-0 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-brand-secondary" />
            Horários Disponíveis
          </h3>
          
          {/* Filtros por período */}
          <div className="flex space-x-2 mb-6">
            {['Manhã', 'Tarde', 'Noite'].map((period) => (
              <Badge key={period} variant="outline" className="cursor-pointer hover:bg-brand-secondary/20 transition-colors border-brand-primary text-brand-primary px-4 py-2">
                {period}
              </Badge>
            ))}
          </div>

          {/* Grid de horários com feedback visual */}
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                className={`p-4 text-sm rounded-xl border-2 transition-all duration-300 font-semibold ${
                  slot.time === selectedTime
                    ? 'bg-brand-secondary text-brand-primary border-brand-secondary shadow-lg scale-105'
                    : slot.available
                    ? 'border-brand-gray-soft text-brand-primary hover:border-brand-secondary hover:bg-brand-secondary/10 hover:scale-105'
                    : 'border-brand-gray-soft text-brand-gray-soft cursor-not-allowed opacity-50'
                }`}
                onClick={() => slot.available && setSelectedTime(slot.time)}
              >
                {slot.time}
                {!slot.available && (
                  <div className="text-xs mt-1 text-red-500">
                    <X className="h-3 w-3 mx-auto" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Botão de continuar com estilo premium */}
        <Button 
          className="w-full h-14 bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={!selectedDate || !selectedTime}
        >
          Continuar para Confirmação
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const MockupConfirmation = () => (
    <div className="bg-brand-ice min-h-screen">
      {/* Status bar */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span>100%</span>
        </div>
      </div>

      {/* Header com progresso final */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 ml-3">
            <h1 className="text-xl font-bold text-brand-primary">Confirmar Agendamento</h1>
            <div className="flex items-center mt-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
              </div>
              <span className="text-sm text-brand-gray-medium ml-2">Passo 3 de 3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Card principal do agendamento */}
        <Card className="p-8 border-0 bg-white shadow-lg relative overflow-hidden">
          {/* Decoração visual */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-secondary/20 to-transparent rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative">
            <h3 className="text-xl font-bold text-brand-primary mb-6 flex items-center">
              <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-brand-primary" />
              </div>
              Resumo do Agendamento
            </h3>
            
            <div className="space-y-6">
              {/* Estabelecimento */}
              <div className="flex items-center space-x-4 p-4 bg-brand-ice rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1621607512214-68297480165e?w=80&h=80&fit=crop"
                  alt="Barbearia Moderna"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-brand-primary">Barbearia Moderna</h4>
                  <p className="text-sm text-brand-gray-medium">Rua das Flores, 123 - Centro</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold ml-1">4.8</span>
                  </div>
                </div>
              </div>

              {/* Detalhes do serviço */}
              <div className="border-l-4 border-brand-secondary pl-6 py-2">
                <h4 className="text-lg font-bold text-brand-primary">Corte Masculino</h4>
                <p className="text-brand-gray-medium">Duração estimada: 30 minutos</p>
                <p className="text-sm text-brand-gray-medium mt-1">Profissional: Carlos Silva</p>
              </div>

              {/* Data e hora com destaque visual */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 rounded-2xl">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                  <p className="text-sm text-brand-gray-medium font-medium">Data</p>
                  <p className="text-lg font-bold text-brand-primary">15 de Dezembro</p>
                  <p className="text-sm text-brand-gray-medium">Domingo</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                  <p className="text-sm text-brand-gray-medium font-medium">Horário</p>
                  <p className="text-lg font-bold text-brand-primary">14:30</p>
                  <p className="text-sm text-brand-gray-medium">Tarde</p>
                </div>
              </div>

              {/* Preço com destaque */}
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-brand-secondary/20 to-brand-primary/20 rounded-2xl">
                <span className="text-lg font-semibold text-brand-primary">Total a Pagar</span>
                <span className="text-3xl font-bold text-brand-primary">R$ 25,00</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Campo de observações */}
        <Card className="p-6 border-0 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-brand-primary mb-3">Observações (opcional)</h3>
          <textarea 
            placeholder="Ex: Prefiro corte mais baixo nas laterais..."
            className="w-full p-4 border-2 border-brand-gray-soft rounded-xl text-brand-primary placeholder-brand-gray-medium resize-none focus:border-brand-secondary transition-colors"
            rows={3}
          />
        </Card>

        {/* Política de cancelamento */}
        <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-orange-700 font-bold text-sm">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-orange-700 mb-1">Política de Cancelamento</h4>
              <p className="text-sm text-orange-600">
                Cancelamentos podem ser feitos até 2 horas antes do horário agendado sem taxa adicional.
              </p>
            </div>
          </div>
        </Card>

        {/* Botão de confirmação premium */}
        <Button className="w-full h-16 bg-gradient-to-r from-brand-secondary to-brand-primary text-white hover:from-brand-primary hover:to-brand-secondary font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
          <Check className="h-6 w-6 mr-3" />
          Confirmar Agendamento
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header principal */}
      <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-8">
        <Link to="/" className="inline-flex items-center text-white hover:text-brand-ice mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar ao Início
        </Link>
        <div>
          <h1 className="text-4xl font-bold mb-3">Mockups de Alta Fidelidade</h1>
          <p className="text-brand-ice text-lg leading-relaxed">
            Design visual completo com identidade aplicada, microinterações e componentes finalizados
          </p>
        </div>
      </div>

      {/* Navegação dos mockups */}
      <div className="bg-white border-b border-brand-gray-soft sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: "home", label: "A: Dashboard Principal", description: "Explorar e buscar" },
              { id: "establishment", label: "B: Perfil Premium", description: "Estabelecimento detalhado" },
              { id: "scheduling", label: "C: Seleção Inteligente", description: "Data e hora" },
              { id: "confirmation", label: "D: Confirmação Final", description: "Resumo e pagamento" }
            ].map((mockup) => (
              <button
                key={mockup.id}
                onClick={() => setSelectedMockup(mockup.id)}
                className={`py-6 px-2 text-sm font-medium border-b-3 whitespace-nowrap transition-all duration-300 group ${
                  selectedMockup === mockup.id
                    ? 'border-brand-secondary text-brand-primary'
                    : 'border-transparent text-brand-gray-medium hover:text-brand-primary hover:border-brand-secondary/50'
                }`}
              >
                <div className="text-base font-semibold">{mockup.label}</div>
                <div className="text-xs text-brand-gray-medium mt-1 group-hover:text-brand-primary transition-colors">
                  {mockup.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Descrição da tela atual */}
      <div className="container mx-auto px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 p-8 bg-gradient-to-r from-brand-ice to-white rounded-2xl border border-brand-gray-soft">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">
              {selectedMockup === "home" && "Dashboard Principal - Experiência de Descoberta"}
              {selectedMockup === "establishment" && "Perfil Premium - Apresentação Completa do Estabelecimento"}
              {selectedMockup === "scheduling" && "Seleção Inteligente - Interface Intuitiva de Agendamento"}
              {selectedMockup === "confirmation" && "Confirmação Final - Revisão Detalhada e Segura"}
            </h2>
            <p className="text-brand-gray-medium text-lg leading-relaxed">
              {selectedMockup === "home" && "Interface principal otimizada para descoberta de serviços com busca inteligente, categorias visuais atrativas e estabelecimentos personalizados. Design clean com navegação intuitiva e microinterações que guiam o usuário naturalmente."}
              {selectedMockup === "establishment" && "Página de estabelecimento com layout imersivo, usando hero images, cards informativos organizados e CTAs estrategicamente posicionados. Tabs para organização de conteúdo e ações rápidas para engajamento."}
              {selectedMockup === "scheduling" && "Fluxo de agendamento simplificado com calendário visual elegante, seleção de horários com feedback imediato e indicadores de progresso. Microinterações suaves para uma experiência fluida e sem fricção."}
              {selectedMockup === "confirmation" && "Tela de confirmação que transmite confiança com layout estruturado, resumo visual claro, políticas transparentes e CTA de confirmação destacado. Design que reduz ansiedade e aumenta conversão."}
            </p>
          </div>

          {/* Simulador mobile premium */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Moldura do dispositivo */}
              <div className="w-[375px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Tela do dispositivo */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch simulado */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                  
                  {/* Conteúdo da tela */}
                  <div className="relative">
                    {selectedMockup === "home" && <MockupHome />}
                    {selectedMockup === "establishment" && <MockupEstablishment />}
                    {selectedMockup === "scheduling" && <MockupScheduling />}
                    {selectedMockup === "confirmation" && <MockupConfirmation />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Especificações de Design */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Componentes UI */}
            <Card className="p-8 border-0 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-brand-primary mb-6">Componentes UI Aplicados</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-brand-primary mb-3">Botões</h4>
                  <div className="space-y-3">
                    <Button className="bg-brand-secondary text-brand-primary hover:bg-brand-primary hover:text-white rounded-xl">
                      Primário - CTA Principal
                    </Button>
                    <Button variant="outline" className="border-brand-primary text-brand-primary rounded-xl w-full">
                      Secundário - Ação Alternativa
                    </Button>
                    <Button variant="ghost" className="text-brand-primary w-full">
                      Textual - Link Sutil
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-brand-primary mb-3">Cards</h4>
                  <div className="space-y-2">
                    <div className="p-4 border border-brand-gray-soft rounded-xl bg-white">
                      Card Padrão - Fundo branco, borda sutil
                    </div>
                    <div className="p-4 bg-brand-ice rounded-xl">
                      Card Destaque - Fundo gelo para hierarquia
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Microinterações */}
            <Card className="p-8 border-0 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-brand-primary mb-6">Microinterações Implementadas</h3>
              <div className="space-y-4">
                <div className="p-4 bg-brand-ice rounded-xl">
                  <h4 className="font-semibold text-brand-primary mb-2">Hover Effects</h4>
                  <p className="text-sm text-brand-gray-medium">
                    Escala sutil (1.02-1.05) em cards e botões, mudança de sombra e cores suaves
                  </p>
                </div>
                <div className="p-4 bg-brand-ice rounded-xl">
                  <h4 className="font-semibold text-brand-primary mb-2">Estados de Seleção</h4>
                  <p className="text-sm text-brand-gray-medium">
                    Feedback visual imediato com cores da marca, bordas destacadas e ícones
                  </p>
                </div>
                <div className="p-4 bg-brand-ice rounded-xl">
                  <h4 className="font-semibold text-brand-primary mb-2">Transições</h4>
                  <p className="text-sm text-brand-gray-medium">
                    Duração 300ms para fluidez, easing natural para sensação orgânica
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Paleta de cores aplicada */}
          <div className="mt-8">
            <Card className="p-8 border-0 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-brand-primary mb-6">Identidade Visual Aplicada</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary rounded-xl mx-auto mb-2"></div>
                  <p className="text-xs font-medium text-brand-primary">Azul Ardósia</p>
                  <p className="text-xs text-brand-gray-medium">#3A506B</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-secondary rounded-xl mx-auto mb-2"></div>
                  <p className="text-xs font-medium text-brand-primary">Verde Menta</p>
                  <p className="text-xs text-brand-gray-medium">#6FFFB0</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-ice rounded-xl mx-auto mb-2 border border-brand-gray-soft"></div>
                  <p className="text-xs font-medium text-brand-primary">Branco Gelo</p>
                  <p className="text-xs text-brand-gray-medium">#F0F7F4</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-gray-soft rounded-xl mx-auto mb-2"></div>
                  <p className="text-xs font-medium text-brand-primary">Cinza Suave</p>
                  <p className="text-xs text-brand-gray-medium">#BCCCDC</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-gray-medium rounded-xl mx-auto mb-2"></div>
                  <p className="text-xs font-medium text-brand-primary">Cinza Médio</p>
                  <p className="text-xs text-brand-gray-medium">#8A9BA8</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockupsPage;
