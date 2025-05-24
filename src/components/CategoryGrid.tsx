
import React from "react";
import { Card } from "@/components/ui/card";
import { categories } from "@/data/categories";

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory?: string;
}

const CategoryGrid = ({ onCategorySelect, selectedCategory }: CategoryGridProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Categorias Populares</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.slice(0, 12).map((category) => (
          <Card
            key={category.id}
            className={`p-4 cursor-pointer hover:shadow-md transition-all text-center ${
              selectedCategory === category.id ? "ring-2 ring-tc-blue bg-blue-50" : ""
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <div className="text-sm font-medium">{category.name}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
