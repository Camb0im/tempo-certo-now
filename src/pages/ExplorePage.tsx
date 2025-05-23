
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, MapPin, StarIcon, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Dados de exemplo para serviços
const servicesData = [
  {
    id: 1,
    name: "Corte de Cabelo",
    provider: "Barbearia Vintage",
    category: "Barbearias",
    rating: 4.8,
    reviews: 45,
    price: 45,
    image: "/placeholder.svg",
    location: "Centro, São Paulo",
  },
  {
    id: 2,
    name: "Mesa para Jantar",
    provider: "Restaurante Italiano",
    category: "Restaurantes",
    rating: 4.5,
    reviews: 120,
    price: 60,
    image: "/placeholder.svg",
    location: "Pinheiros, São Paulo",
  },
  {
    id: 3,
    name: "Café da Manhã",
    provider: "Café Aurora",
    category: "Cafés",
    rating: 4.7,
    reviews: 36,
    price: 28,
    image: "/placeholder.svg",
    location: "Vila Madalena, São Paulo",
  },
  {
    id: 4,
    name: "Tosa para Pet",
    provider: "Pet Shop Amigo Fiel",
    category: "Pet",
    rating: 4.6,
    reviews: 67,
    price: 55,
    image: "/placeholder.svg",
    location: "Moema, São Paulo",
  },
  {
    id: 5,
    name: "Consulta Médica",
    provider: "Clínica Saúde Plena",
    category: "Saúde",
    rating: 4.9,
    reviews: 92,
    price: 150,
    image: "/placeholder.svg",
    location: "Jardins, São Paulo",
  },
  {
    id: 6,
    name: "Manicure",
    provider: "Beauty Salon",
    category: "Beleza",
    rating: 4.4,
    reviews: 28,
    price: 40,
    image: "/placeholder.svg",
    location: "Itaim, São Paulo",
  },
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState(servicesData);

  const handleSearch = () => {
    let filtered = servicesData;
    
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(service => 
        service.category === category
      );
    }
    
    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore os Serviços</h1>
          <p className="text-muted-foreground">
            Encontre os melhores serviços e economize seu tempo
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar serviços..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas categorias</SelectItem>
              <SelectItem value="Restaurantes">Restaurantes</SelectItem>
              <SelectItem value="Barbearias">Barbearias</SelectItem>
              <SelectItem value="Cafés">Cafés</SelectItem>
              <SelectItem value="Beleza">Beleza</SelectItem>
              <SelectItem value="Saúde">Saúde</SelectItem>
              <SelectItem value="Pet">Pet</SelectItem>
            </SelectContent>
          </Select>
          
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
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Preço</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">Até R$ 50</Button>
                    <Button variant="outline" size="sm" className="justify-start">R$ 50 - R$ 100</Button>
                    <Button variant="outline" size="sm" className="justify-start">R$ 100 - R$ 200</Button>
                    <Button variant="outline" size="sm" className="justify-start">Acima de R$ 200</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Avaliação</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      ⭐⭐⭐⭐⭐ (5)
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      ⭐⭐⭐⭐ (4+)
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      ⭐⭐⭐ (3+)
                    </Button>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={handleSearch}>Aplicar Filtros</Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button onClick={handleSearch}>Buscar</Button>
        </div>

        <div className="hidden lg:block lg:w-1/4 float-left mr-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Preço</h3>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="justify-start">Até R$ 50</Button>
                  <Button variant="outline" size="sm" className="justify-start">R$ 50 - R$ 100</Button>
                  <Button variant="outline" size="sm" className="justify-start">R$ 100 - R$ 200</Button>
                  <Button variant="outline" size="sm" className="justify-start">Acima de R$ 200</Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Avaliação</h3>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    ⭐⭐⭐⭐⭐ (5)
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    ⭐⭐⭐⭐ (4+)
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    ⭐⭐⭐ (3+)
                  </Button>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={handleSearch}>Aplicar Filtros</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${filteredServices.length > 0 ? "lg:w-3/4 lg:pl-6" : ""}`}>
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium">
                  {service.category}
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
          
          {filteredServices.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <Search className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-500 max-w-md text-center mb-4">
                Tente ajustar os termos da sua busca ou explorar outras categorias de serviços.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setCategory("");
                setFilteredServices(servicesData);
              }}>
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
