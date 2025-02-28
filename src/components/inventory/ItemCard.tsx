import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { PlusCircle, Info, AlertTriangle } from "lucide-react";

interface ItemCardProps {
  id?: string;
  name?: string;
  category?: string;
  image?: string;
  status?: "available" | "low-stock" | "unavailable";
  quantity?: number;
  hazardLevel?: "low" | "medium" | "high" | null;
  onClick?: () => void;
  onAddToCart?: () => void;
}

const ItemCard = ({
  id = "item-1",
  name = "Erlenmeyer Flask",
  category = "Glassware",
  image = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  status = "available",
  quantity = 12,
  hazardLevel = null,
  onClick = () => {},
  onAddToCart = () => {},
}: ItemCardProps) => {
  // Status color mapping
  const statusColors = {
    available: "bg-green-100 text-green-800",
    "low-stock": "bg-yellow-100 text-yellow-800",
    unavailable: "bg-red-100 text-red-800",
  };

  // Hazard level color mapping
  const hazardColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      {/* Item Image */}
      <div className="relative h-40 bg-gray-200">
        <div>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className={`${statusColors[status]} border-0`}
          >
            {status === "available"
              ? "Available"
              : status === "low-stock"
                ? "Low Stock"
                : "Unavailable"}
          </Badge>
        </div>

        {/* Hazard Level Badge (if applicable) */}
        {hazardLevel && (
          <div className="absolute bottom-2 left-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={`${hazardColors[hazardLevel]} border-0 flex items-center gap-1`}
                  >
                    <AlertTriangle size={12} />
                    {hazardLevel.charAt(0).toUpperCase() +
                      hazardLevel.slice(1)}{" "}
                    Hazard
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This item requires special handling</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      {/* Item Details */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {name}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 -mt-1 -mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // View details action would go here
                  }}
                >
                  <Info size={16} className="text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View item details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <p className="text-sm text-gray-500 mb-2">{category}</p>

        <div className="text-sm text-gray-700 mt-auto">
          <span className="font-medium">Quantity:</span> {quantity} units
        </div>
      </div>
      {/* Action Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-1"
          disabled={status === "unavailable"}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <PlusCircle size={16} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
