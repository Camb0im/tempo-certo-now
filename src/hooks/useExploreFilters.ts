
import { useState, useCallback, useMemo } from "react";

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

export const useExploreFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    date: undefined as Date | undefined,
    location: "",
    priceRange: "all",
    rating: "all"
  });

  const filteredServices = useMemo(() => {
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
    
    return filtered;
  }, [searchTerm, selectedCategory, filters]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("");
    setFilters({
      date: undefined,
      location: "",
      priceRange: "all",
      rating: "all"
    });
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filtersCollapsed,
    setFiltersCollapsed,
    filters,
    setFilters,
    filteredServices,
    clearFilters
  };
};
