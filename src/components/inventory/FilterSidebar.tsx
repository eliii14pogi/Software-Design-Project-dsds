import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  AlertTriangle,
  Beaker,
  FlaskConical,
  Microscope,
  Ruler,
  Thermometer,
} from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
  categoryType?: "apparatus" | "chemicals";
}

interface FilterState {
  search: string;
  categories: string[];
  availability: string[];
  priceRange: [number, number];
  hazardLevels: string[];
  locations: string[];
}

const FilterSidebar = ({
  onFilterChange = () => {},
  isOpen = true,
  onClose = () => {},
  categoryType = "apparatus",
}: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    availability: ["available"],
    priceRange: [0, 1000],
    hazardLevels: [],
    locations: [],
  });

  // Equipment categories based on category type
  const categories =
    categoryType === "apparatus"
      ? [
          { name: "Measuring Equipment", icon: <Ruler size={16} /> },
          { name: "Glasswares", icon: <FlaskConical size={16} /> },
          { name: "Microscopes", icon: <Microscope size={16} /> },
          { name: "Thermometers", icon: <Thermometer size={16} /> },
        ]
      : [
          { name: "Acids", icon: <Beaker size={16} /> },
          { name: "Bases", icon: <Beaker size={16} /> },
          { name: "Solvents", icon: <FlaskConical size={16} /> },
          { name: "Indicators", icon: <Beaker size={16} /> },
        ];

  // Availability options
  const availabilityOptions = ["available", "low-stock", "unavailable"];

  // Hazard levels (only relevant for chemicals)
  const hazardLevels = [
    { level: "low", color: "bg-blue-100 text-blue-800" },
    { level: "medium", color: "bg-orange-100 text-orange-800" },
    { level: "high", color: "bg-red-100 text-red-800" },
  ];

  // Laboratory locations
  const locations = [
    "Main Laboratory",
    "Chemistry Lab",
    "Biology Lab",
    "Physics Lab",
    "Storage Room",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityToggle = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability];

    const newFilters = { ...filters, availability: newAvailability };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [values[0], values[1]] as [number, number],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleHazardLevelToggle = (level: string) => {
    const newHazardLevels = filters.hazardLevels.includes(level)
      ? filters.hazardLevels.filter((h) => h !== level)
      : [...filters.hazardLevels, level];

    const newFilters = { ...filters, hazardLevels: newHazardLevels };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location];

    const newFilters = { ...filters, locations: newLocations };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: "",
      categories: [],
      availability: ["available"],
      priceRange: [0, 1000],
      hazardLevels: [],
      locations: [],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside
      className={`bg-white w-full md:w-72 h-full overflow-y-auto border-r border-gray-200 p-4 transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter size={18} />
          Filters
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-7 px-2"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-7 w-7"
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-2.5 top-2.5 text-gray-400"
          />
          <Input
            placeholder="Search inventory..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
      </div>

      {/* Filter Sections */}
      <Accordion
        type="multiple"
        defaultValue={["categories", "availability"]}
        className="space-y-4"
      >
        {/* Categories */}
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-2 px-1 hover:no-underline">
            <span className="text-sm font-medium">Categories</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`category-${category.name}`}
                    checked={filters.categories.includes(category.name)}
                    onCheckedChange={() => handleCategoryToggle(category.name)}
                  />
                  <label
                    htmlFor={`category-${category.name}`}
                    className="text-sm flex items-center gap-2 cursor-pointer"
                  >
                    {category.icon}
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability */}
        <AccordionItem value="availability" className="border-none">
          <AccordionTrigger className="py-2 px-1 hover:no-underline">
            <span className="text-sm font-medium">Availability</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`availability-${option}`}
                    checked={filters.availability.includes(option)}
                    onCheckedChange={() => handleAvailabilityToggle(option)}
                  />
                  <label
                    htmlFor={`availability-${option}`}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {option.replace("-", " ")}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-2 px-1 hover:no-underline">
            <span className="text-sm font-medium">Price Range</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceRangeChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${filters.priceRange[0]}</span>
                <span className="text-sm">${filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Hazard Levels (only for chemicals) */}
        {categoryType === "chemicals" && (
          <AccordionItem value="hazard" className="border-none">
            <AccordionTrigger className="py-2 px-1 hover:no-underline">
              <span className="text-sm font-medium">Hazard Level</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {hazardLevels.map((hazard) => (
                  <div
                    key={hazard.level}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`hazard-${hazard.level}`}
                      checked={filters.hazardLevels.includes(hazard.level)}
                      onCheckedChange={() =>
                        handleHazardLevelToggle(hazard.level)
                      }
                    />
                    <label
                      htmlFor={`hazard-${hazard.level}`}
                      className="text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Badge
                        variant="outline"
                        className={`${hazard.color} border-0 flex items-center gap-1 py-0.5 px-1.5`}
                      >
                        <AlertTriangle size={10} />
                        <span className="capitalize">{hazard.level}</span>
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Locations */}
        <AccordionItem value="locations" className="border-none">
          <AccordionTrigger className="py-2 px-1 hover:no-underline">
            <span className="text-sm font-medium">Locations</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                  />
                  <label
                    htmlFor={`location-${location}`}
                    className="text-sm cursor-pointer"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Applied Filters */}
      {(filters.categories.length > 0 ||
        filters.hazardLevels.length > 0 ||
        filters.locations.length > 0) && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Applied Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge
                key={`badge-${category}`}
                variant="secondary"
                className="flex items-center gap-1 py-1"
              >
                {category}
                <X
                  size={12}
                  className="cursor-pointer ml-1"
                  onClick={() => handleCategoryToggle(category)}
                />
              </Badge>
            ))}
            {filters.hazardLevels.map((level) => (
              <Badge
                key={`badge-${level}`}
                variant="secondary"
                className="flex items-center gap-1 py-1"
              >
                <AlertTriangle size={12} />
                {level}
                <X
                  size={12}
                  className="cursor-pointer ml-1"
                  onClick={() => handleHazardLevelToggle(level)}
                />
              </Badge>
            ))}
            {filters.locations.map((location) => (
              <Badge
                key={`badge-${location}`}
                variant="secondary"
                className="flex items-center gap-1 py-1"
              >
                {location}
                <X
                  size={12}
                  className="cursor-pointer ml-1"
                  onClick={() => handleLocationToggle(location)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;
