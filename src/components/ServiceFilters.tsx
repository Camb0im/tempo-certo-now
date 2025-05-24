
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Star, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ServiceFiltersProps {
  filters: {
    date?: Date;
    location: string;
    priceRange: string;
    rating: string;
  };
  onFiltersChange: (filters: any) => void;
  onApplyFilters: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ServiceFilters = ({ 
  filters, 
  onFiltersChange, 
  onApplyFilters,
  isCollapsed,
  onToggleCollapse 
}: ServiceFiltersProps) => {
  const priceRanges = [
    { value: "all", label: "Todos os preços" },
    { value: "0-50", label: "Até R$ 50" },
    { value: "50-100", label: "R$ 50 - R$ 100" },
    { value: "100-200", label: "R$ 100 - R$ 200" },
    { value: "200+", label: "Acima de R$ 200" }
  ];

  const ratings = [
    { value: "all", label: "Todas as avaliações" },
    { value: "5", label: "⭐⭐⭐⭐⭐ (5)" },
    { value: "4", label: "⭐⭐⭐⭐ (4+)" },
    { value: "3", label: "⭐⭐⭐ (3+)" }
  ];

  return (
    <Card className={`transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-full lg:w-80'}`}>
      <Collapsible open={!isCollapsed} onOpenChange={onToggleCollapse}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <CardTitle className="flex items-center justify-between">
              {!isCollapsed && "Filtros"}
              <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-90' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Data */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    {filters.date ? format(filters.date, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.date}
                    onSelect={(date) => onFiltersChange({ ...filters, date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Localização */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Localização
              </Label>
              <Input
                placeholder="Digite sua cidade ou bairro"
                value={filters.location}
                onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
              />
            </div>

            {/* Preço */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Preço
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant={filters.priceRange === range.value ? "default" : "outline"}
                    size="sm"
                    className="justify-start"
                    onClick={() => onFiltersChange({ ...filters, priceRange: range.value })}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Avaliação */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Avaliação
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {ratings.map((rating) => (
                  <Button
                    key={rating.value}
                    variant={filters.rating === rating.value ? "default" : "outline"}
                    size="sm"
                    className="justify-start"
                    onClick={() => onFiltersChange({ ...filters, rating: rating.value })}
                  >
                    {rating.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={onApplyFilters} className="w-full bg-tc-blue hover:bg-tc-blue-dark">
              Aplicar Filtros
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ServiceFilters;
