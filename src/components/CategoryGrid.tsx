
import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import { categories } from "@/data/categories";

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory?: string;
}

const CategoryCard = memo(({ 
  category, 
  isSelected, 
  onClick 
}: { 
  category: any; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <Card
    className={`p-4 cursor-pointer hover:shadow-md transition-all duration-300 text-center hover:scale-105 ${
      isSelected ? "ring-2 ring-tc-blue bg-blue-50" : ""
    }`}
    onClick={onClick}
  >
    <div className="text-2xl mb-2">{category.icon}</div>
    <div className="text-sm font-medium">{category.name}</div>
  </Card>
));

const CategoryGrid = memo(({ onCategorySelect, selectedCategory }: CategoryGridProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Categorias Populares</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.slice(0, 12).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </div>
    </div>
  );
});

CategoryGrid.displayName = "CategoryGrid";
CategoryCard.displayName = "CategoryCard";

export default CategoryGrid;
