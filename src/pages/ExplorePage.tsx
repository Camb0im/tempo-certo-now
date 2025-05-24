
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreFilters from "@/components/explore/ExploreFilters";
import ServiceGrid from "@/components/explore/ServiceGrid";
import { useExploreFilters } from "@/hooks/useExploreFilters";

const ExplorePage = () => {
  const {
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
  } = useExploreFilters();

  const handleSearch = () => {
    // A busca é realizada automaticamente através do useMemo no hook
    console.log("Busca realizada");
  };

  const handleApplyFilters = () => {
    // Os filtros são aplicados automaticamente através do useMemo no hook
    console.log("Filtros aplicados");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <ExploreHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={handleApplyFilters}
        />

        <div className="flex gap-6">
          <div className="hidden lg:block">
            <ExploreFilters
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={handleApplyFilters}
              isCollapsed={filtersCollapsed}
              onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
            />
          </div>
          
          <div className="flex-1">
            <ServiceGrid 
              services={filteredServices} 
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
