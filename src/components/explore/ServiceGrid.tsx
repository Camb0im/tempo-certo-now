
import React, { memo, useMemo } from "react";
import ServiceCard from "./ServiceCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceGridProps {
  services: any[];
  onClearFilters: () => void;
}

const EmptyState = memo(({ onClearFilters }: { onClearFilters: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <Search className="h-16 w-16 text-gray-300 mb-4" />
    <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum resultado encontrado</h3>
    <p className="text-gray-500 max-w-md text-center mb-4">
      Tente ajustar os termos da sua busca ou explorar outras categorias de serviços.
    </p>
    <Button 
      onClick={onClearFilters}
      className="transition-all hover:scale-105"
    >
      Limpar filtros
    </Button>
  </div>
));

const ServiceGrid = memo(({ services, onClearFilters }: ServiceGridProps) => {
  const memoizedServices = useMemo(() => services, [services]);

  if (memoizedServices.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {memoizedServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
});

ServiceGrid.displayName = "ServiceGrid";
EmptyState.displayName = "EmptyState";

export default ServiceGrid;
