
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, MapPin, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import ServiceFilters from "@/components/ServiceFilters";
import { categories } from "@/data/categories";

// Dados de exemplo expandidos
const servicesData = [
  {
    id: 1,
    name: "Corte de Cabelo Masculino",
    provider: "Barbearia Vintage",
    category: "barbearias",
    rating: 4.8,
    reviews: 45,
    price: 45,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
    location: "Centro, São Paulo",
    distance: 1.2,
  },
  {
    id: 2,
    name: "Mesa para Jantar Romântico",
    provider: "Restaurante Italiano",
    category: "restaurantes",
    rating: 4.5,
    reviews: 120,
    price: 60,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    location: "Pinheiros, São Paulo",
    distance: 2.8,
  },
  {
    id: 3,
    name: "Café da Manhã Especial",
    provider: "Café Aurora",
    category: "cafes",
    rating: 4.7,
    reviews: 36,
    price: 28,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400",
    location: "Vila Madalena, São Paulo",
    distance: 0.8,
  },
  {
    id: 4,
    name: "Banho e Tosa Completa",
    provider: "Pet Shop Amigo Fiel",
    category: "pet",
    rating: 4.6,
    reviews: 67,
    price: 55,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400",
    location: "Moema, São Paulo",
    distance: 3.1,
  },
  {
    id: 5,
    name: "Consulta Médica Geral",
    provider: "Clínica Saúde Plena",
    category: "saude",
    rating: 4.9,
    reviews: 92,
    price: 150,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    location: "Jardins, São Paulo",
    distance: 1.9,
  },
  {
    id: 6,
    name: "Manicure e Pedicure",
    provider: "Beauty Salon",
    category: "beleza",
    rating: 4.4,
    reviews: 28,
    price: 40,
    image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400",
    location: "Itaim, São Paulo",
    distance: 2.3,
  },
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    date: undefined as Date | undefined,
    location: "",
    priceRange: "all",
    rating: "all"
  });

  const handleSearch = () => {
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = [...servicesData];
    
    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por categoria
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(service => 
        service.category === selectedCategory
      );
    }
    
    // Filtro por localização
    if (filters.location) {
      filtered = filtered.filter(service =>
        service.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filtro por preço
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (filters.priceRange === "200+") {
        filtered = filtered.filter(service => service.price >= 200);
      } else {
        filtered = filtered.filter(service => 
          service.price >= min && (max ? service.price <= max : true)
        );
      }
    }
    
    // Filtro por avaliação
    if (filters.rating !== "all") {
      const minRating = Number(filters.rating);
      filtered = filtered.filter(service => service.rating >= minRating);
    }
    
    // Ordenar por distância (mais próximos primeiro)
    filtered.sort((a, b) => a.distance - b.distance);
    
    setFilteredServices(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, filters]);

  const searchSuggestions = [
    "Corte de cabelo masculino",
    "Mesa para 4 pessoas",
    "Café da manhã especial", 
    "Consulta médica",
    "Manicure e pedicure"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore os Serviços</h1>
          <p className="text-muted-foreground mb-4">
            Encontre os melhores serviços e economize seu tempo
          </p>
          <div className="text-sm text-gray-600 mb-6">
            <span className="font-medium">Sugestões populares:</span>
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="ml-2 text-tc-blue hover:underline"
                onClick={() => setSearchTerm(suggestion)}
              >
                {suggestion}
                {index < searchSuggestions.length - 1 ? "," : ""}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              placeholder="O que você está procurando?"
            />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" /> Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ServiceFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onApplyFilters={applyFilters}
                    isCollapsed={false}
                    onToggleCollapse={() => {}}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <Button onClick={handleSearch} className="bg-tc-blue hover:bg-tc-blue-dark">
              Buscar
            </Button>
          </div>

          <CategoryGrid
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="flex gap-6">
          {/* Filtros Desktop */}
          <div className="hidden lg:block">
            <ServiceFilters
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={applyFilters}
              isCollapsed={filtersCollapsed}
              onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
            />
          </div>
          
          {/* Lista de Serviços */}
          <div className="flex-1">
            {filteredServices.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-48 bg-gray-200 relative">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium">
                        {service.distance} km
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>{service.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {service.location}
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <svg 
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(service.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">({service.reviews})</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="font-medium">R$ {service.price.toFixed(2)}</div>
                      <Button>Agendar</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Search className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 max-w-md text-center mb-4">
                  Tente ajustar os termos da sua busca ou explorar outras categorias de serviços.
                </p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setFilters({
                    date: undefined,
                    location: "",
                    priceRange: "all",
                    rating: "all"
                  });
                  setFilteredServices(servicesData);
                }}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
