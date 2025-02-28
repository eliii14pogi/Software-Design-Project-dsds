import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Pagination } from "../ui/pagination";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import ItemCard from "./ItemCard";

interface Item {
  id: string;
  name: string;
  category: string;
  image: string;
  status: "available" | "low-stock" | "unavailable";
  quantity: number;
  hazardLevel: "low" | "medium" | "high" | null;
}

interface ItemGridProps {
  items?: Item[];
  onItemClick?: (item: Item) => void;
  onAddToCart?: (item: Item) => void;
  isLoading?: boolean;
  category?: string;
}

const ItemGrid = ({
  items = [
    {
      id: "item-1",
      name: "Erlenmeyer Flask",
      category: "Glassware",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 12,
      hazardLevel: null,
    },
    {
      id: "item-2",
      name: "Digital Scale",
      category: "Measuring Equipment",
      image:
        "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 8,
      hazardLevel: null,
    },
    {
      id: "item-3",
      name: "Hydrochloric Acid",
      category: "Chemicals",
      image:
        "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "low-stock",
      quantity: 3,
      hazardLevel: "high",
    },
    {
      id: "item-4",
      name: "Microscope",
      category: "Equipment",
      image:
        "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 5,
      hazardLevel: null,
    },
    {
      id: "item-5",
      name: "Test Tubes",
      category: "Glassware",
      image:
        "https://images.unsplash.com/photo-1581092921461-7031e4bfb83a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 30,
      hazardLevel: null,
    },
    {
      id: "item-6",
      name: "Sodium Hydroxide",
      category: "Chemicals",
      image:
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "unavailable",
      quantity: 0,
      hazardLevel: "medium",
    },
  ],
  onItemClick = () => {},
  onAddToCart = () => {},
  isLoading = false,
  category = "All",
}: ItemGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter items based on search query
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    } else if (sortBy === "quantity") {
      return b.quantity - a.quantity;
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  return (
    <div className="bg-gray-50 w-full h-full flex flex-col">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Sort by:
          </span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 px-1">
        <p className="text-sm text-gray-500">
          Showing {currentItems.length} of {sortedItems.length} items
          {category !== "All" && ` in ${category}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Item Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg h-80 animate-pulse"
            />
          ))}
        </div>
      ) : currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              image={item.image}
              status={item.status}
              quantity={item.quantity}
              hazardLevel={item.hazardLevel}
              onClick={() => onItemClick(item)}
              onAddToCart={() => onAddToCart(item)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No items found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? `No items matching "${searchQuery}" were found.`
                : "There are no items in this category yet."}
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-auto py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>

            <div className="flex items-center">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    className="mx-1 h-8 w-8"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
