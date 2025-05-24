
import React, { memo } from "react";
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

interface ExploreFiltersProps {
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

const PriceRangeFilter = memo(({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const priceRanges = [
    { value: "all", label: "Todos os preços" },
    { value: "0-50", label: "Até R$ 50" },
    { value: "50-100", label: "R$ 50 - R$ 100" },
    { value: "100-200", label: "R$ 100 - R$ 200" },
    { value: "200+", label: "Acima de R$ 200" }
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {priceRanges.map((range) => (
        <Button
          key={range.value}
          variant={value === range.value ? "default" : "outline"}
          size="sm"
          className="justify-start transition-all hover:scale-105"
          onClick={() => onChange(range.value)}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
});

const RatingFilter = memo(({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const ratings = [
    { value: "all", label: "Todas as avaliações" },
    { value: "5", label: "⭐⭐⭐⭐⭐ (5)" },
    { value: "4", label: "⭐⭐⭐⭐ (4+)" },
    { value: "3", label: "⭐⭐⭐ (3+)" }
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {ratings.map((rating) => (
        <Button
          key={rating.value}
          variant={value === rating.value ? "default" : "outline"}
          size="sm"
          className="justify-start transition-all hover:scale-105"
          onClick={() => onChange(rating.value)}
        >
          {rating.label}
        </Button>
      ))}
    </div>
  );
});

const ExploreFilters = memo(({ 
  filters, 
  onFiltersChange, 
  onApplyFilters,
  isCollapsed,
  onToggleCollapse 
}: ExploreFiltersProps) => {
  return (
    <Card className={`transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-full lg:w-80'}`}>
      <Collapsible open={!isCollapsed} onOpenChange={onToggleCollapse}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              {!isCollapsed && "Filtros"}
              <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-90' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left hover:bg-muted/50 transition-colors">
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

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Localização
              </Label>
              <Input
                placeholder="Digite sua cidade ou bairro"
                value={filters.location}
                onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
                className="transition-all focus:scale-105"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Preço
              </Label>
              <PriceRangeFilter 
                value={filters.priceRange} 
                onChange={(priceRange) => onFiltersChange({ ...filters, priceRange })} 
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Avaliação
              </Label>
              <RatingFilter 
                value={filters.rating} 
                onChange={(rating) => onFiltersChange({ ...filters, rating })} 
              />
            </div>

            <Button 
              onClick={onApplyFilters} 
              className="w-full bg-tc-blue hover:bg-tc-blue-dark transition-all hover:scale-105"
            >
              Aplicar Filtros
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
});

ExploreFilters.displayName = "ExploreFilters";
PriceRangeFilter.displayName = "PriceRangeFilter";
RatingFilter.displayName = "RatingFilter";

export default ExploreFilters;
