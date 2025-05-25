import { useState, useCallback, useMemo } from "react";

const servicesData = [
  // Barbearias
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
    name: "Corte + Barba",
    provider: "Barbearia Moderna",
    category: "barbearias",
    rating: 4.7,
    reviews: 38,
    price: 65,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400",
    location: "Vila Olímpia, São Paulo",
    distance: 2.1,
  },
  {
    id: 3,
    name: "Barba Completa",
    provider: "Barbearia Clássica",
    category: "barbearias",
    rating: 4.6,
    reviews: 52,
    price: 35,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
    location: "Liberdade, São Paulo",
    distance: 1.8,
  },
  {
    id: 4,
    name: "Corte Infantil",
    provider: "Barbearia Kids",
    category: "barbearias",
    rating: 4.9,
    reviews: 29,
    price: 30,
    image: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=400",
    location: "Brooklin, São Paulo",
    distance: 3.2,
  },

  // Restaurantes
  {
    id: 5,
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
    id: 6,
    name: "Almoço Executivo",
    provider: "Bistro Central",
    category: "restaurantes",
    rating: 4.3,
    reviews: 85,
    price: 35,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    location: "Centro, São Paulo",
    distance: 1.5,
  },
  {
    id: 7,
    name: "Jantar de Negócios",
    provider: "Steakhouse Premium",
    category: "restaurantes",
    rating: 4.8,
    reviews: 156,
    price: 120,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    location: "Jardins, São Paulo",
    distance: 2.2,
  },
  {
    id: 8,
    name: "Brunch Especial",
    provider: "Café Gourmet",
    category: "restaurantes",
    rating: 4.4,
    reviews: 67,
    price: 45,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    location: "Vila Madalena, São Paulo",
    distance: 1.9,
  },

  // Cafés
  {
    id: 9,
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
    id: 10,
    name: "Coffee Break Premium",
    provider: "Café Especial",
    category: "cafes",
    rating: 4.5,
    reviews: 42,
    price: 22,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    location: "Itaim, São Paulo",
    distance: 2.5,
  },
  {
    id: 11,
    name: "Reunião de Trabalho",
    provider: "Co-Working Café",
    category: "cafes",
    rating: 4.6,
    reviews: 78,
    price: 35,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400",
    location: "Faria Lima, São Paulo",
    distance: 3.1,
  },
  {
    id: 12,
    name: "Degustação de Cafés",
    provider: "Torra Artesanal",
    category: "cafes",
    rating: 4.8,
    reviews: 24,
    price: 40,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    location: "Vila Olímpia, São Paulo",
    distance: 2.7,
  },

  // Pet
  {
    id: 13,
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
    id: 14,
    name: "Consulta Veterinária",
    provider: "Clínica Veterinária Vida",
    category: "pet",
    rating: 4.9,
    reviews: 134,
    price: 80,
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400",
    location: "Perdizes, São Paulo",
    distance: 2.3,
  },
  {
    id: 15,
    name: "Adestramento Individual",
    provider: "Escola Canina",
    category: "pet",
    rating: 4.7,
    reviews: 45,
    price: 120,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    location: "Campo Belo, São Paulo",
    distance: 4.2,
  },
  {
    id: 16,
    name: "SPA Canino",
    provider: "Pet Resort & SPA",
    category: "pet",
    rating: 4.8,
    reviews: 89,
    price: 95,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    location: "Morumbi, São Paulo",
    distance: 5.1,
  },

  // Saúde
  {
    id: 17,
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
    id: 18,
    name: "Consulta Dermatológica",
    provider: "Derma Center",
    category: "saude",
    rating: 4.8,
    reviews: 156,
    price: 200,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
    location: "Moema, São Paulo",
    distance: 3.5,
  },
  {
    id: 19,
    name: "Fisioterapia",
    provider: "Centro de Reabilitação",
    category: "saude",
    rating: 4.7,
    reviews: 78,
    price: 120,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    location: "Vila Mariana, São Paulo",
    distance: 2.8,
  },
  {
    id: 20,
    name: "Exame de Sangue",
    provider: "Laboratório Express",
    category: "saude",
    rating: 4.6,
    reviews: 234,
    price: 85,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
    location: "Liberdade, São Paulo",
    distance: 1.6,
  },

  // Beleza
  {
    id: 21,
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
  {
    id: 22,
    name: "Corte e Escova Feminina",
    provider: "Salão Glamour",
    category: "beleza",
    rating: 4.7,
    reviews: 112,
    price: 85,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    location: "Vila Olímpia, São Paulo",
    distance: 2.9,
  },
  {
    id: 23,
    name: "Limpeza de Pele",
    provider: "Estética Avançada",
    category: "beleza",
    rating: 4.8,
    reviews: 67,
    price: 120,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
    location: "Jardins, São Paulo",
    distance: 1.7,
  },
  {
    id: 24,
    name: "Massagem Relaxante",
    provider: "SPA Zen",
    category: "beleza",
    rating: 4.9,
    reviews: 89,
    price: 150,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
    location: "Moema, São Paulo",
    distance: 3.4,
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

  const handleCategorySelect = useCallback((categoryId: string) => {
    // Toggle: se a categoria já está selecionada, limpa o filtro
    setSelectedCategory(prev => prev === categoryId ? "" : categoryId);
  }, []);

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
    setSelectedCategory: handleCategorySelect,
    filtersCollapsed,
    setFiltersCollapsed,
    filters,
    setFilters,
    filteredServices,
    clearFilters
  };
};
