
import React, { memo } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ExploreFilters from "./ExploreFilters";

interface ExploreHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  onApplyFilters: () => void;
}

const searchSuggestions = [
  "Corte de cabelo masculino",
  "Mesa para 4 pessoas",
  "Café da manhã especial", 
  "Consulta médica",
  "Manicure e pedicure"
];

const SearchSuggestions = memo(({ onSuggestionClick }: { onSuggestionClick: (suggestion: string) => void }) => (
  <div className="text-sm text-gray-600 mb-6">
    <span className="font-medium">Sugestões populares:</span>
    {searchSuggestions.map((suggestion, index) => (
      <button
        key={index}
        className="ml-2 text-tc-blue hover:underline transition-colors"
        onClick={() => onSuggestionClick(suggestion)}
      >
        {suggestion}
        {index < searchSuggestions.length - 1 ? "," : ""}
      </button>
    ))}
  </div>
));

const ExploreHeader = memo(({
  searchTerm,
  onSearchChange,
  onSearch,
  selectedCategory,
  onCategorySelect,
  filters,
  onFiltersChange,
  onApplyFilters
}: ExploreHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Explore os Serviços</h1>
      <p className="text-muted-foreground mb-4">
        Encontre os melhores serviços e economize seu tempo
      </p>
      
      <SearchSuggestions onSuggestionClick={onSearchChange} />
      
      <div className="flex flex-wrap gap-4 mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
          placeholder="O que você está procurando?"
        />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden transition-all hover:scale-105">
              <Filter className="h-4 w-4 mr-2" /> Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ExploreFilters
                filters={filters}
                onFiltersChange={onFiltersChange}
                onApplyFilters={onApplyFilters}
                isCollapsed={false}
                onToggleCollapse={() => {}}
              />
            </div>
          </SheetContent>
        </Sheet>
        
        <Button 
          onClick={onSearch} 
          className="bg-tc-blue hover:bg-tc-blue-dark transition-all hover:scale-105"
        >
          Buscar
        </Button>
      </div>

      <CategoryGrid
        onCategorySelect={onCategorySelect}
        selectedCategory={selectedCategory}
      />
    </div>
  );
});

ExploreHeader.displayName = "ExploreHeader";
SearchSuggestions.displayName = "SearchSuggestions";

export default ExploreHeader;
