
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
    console.log("Busca realizada");
  };

  const handleApplyFilters = () => {
    console.log("Filtros aplicados");
  };

  return (
    <div className="min-h-screen flex flex-col bg-tc-gray-50 dark:bg-tc-dark-bg">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 py-8">
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

          <div className="flex gap-8 mt-8">
            {/* Sidebar com filtros */}
            <div className={`transition-all duration-300 ${filtersCollapsed ? 'w-16' : 'w-80'} hidden lg:block`}>
              <div className="sticky top-24">
                <ExploreFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onApplyFilters={handleApplyFilters}
                  isCollapsed={filtersCollapsed}
                  onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
                />
              </div>
            </div>
            
            {/* Grid de serviços */}
            <div className="flex-1 min-w-0">
              <ServiceGrid 
                services={filteredServices} 
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
