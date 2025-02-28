import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { TestTube, Microscope, Beaker, Atom } from "lucide-react";

interface CategoryTabsProps {
  categories?: {
    id: string;
    name: string;
    icon: "apparatus" | "chemicals" | "measuring" | "glassware";
    count?: number;
  }[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const CategoryTabs = ({
  categories = [
    { id: "apparatus", name: "Apparatus", icon: "apparatus", count: 124 },
    { id: "chemicals", name: "Chemicals", icon: "chemicals", count: 87 },
    {
      id: "measuring",
      name: "Measuring Equipment",
      icon: "measuring",
      count: 45,
    },
    { id: "glassware", name: "Glassware", icon: "glassware", count: 62 },
  ],
  activeCategory = "apparatus",
  onCategoryChange = () => {},
}: CategoryTabsProps) => {
  // Function to render the appropriate icon based on category type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "apparatus":
        return <Microscope className="mr-2 h-4 w-4" />;
      case "chemicals":
        return <Beaker className="mr-2 h-4 w-4" />;
      case "measuring":
        return <Atom className="mr-2 h-4 w-4" />;
      case "glassware":
        return <TestTube className="mr-2 h-4 w-4" />;
      default:
        return <Microscope className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white w-full">
      <Tabs
        defaultValue={activeCategory}
        onValueChange={onCategoryChange}
        className="w-full"
      >
        <TabsList className="w-full flex justify-start overflow-x-auto bg-gray-50 p-1 rounded-md">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {renderIcon(category.icon)}
              <span>{category.name}</span>
              {category.count !== undefined && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {category.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
