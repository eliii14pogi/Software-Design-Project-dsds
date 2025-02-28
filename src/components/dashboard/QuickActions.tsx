import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Beaker,
  Calendar,
  ClipboardList,
  Package,
  RotateCcw,
  Search,
  ShoppingCart,
} from "lucide-react";

interface QuickActionProps {
  onBorrowItems?: () => void;
  onReturnItems?: () => void;
  onViewReservations?: () => void;
  onSearchInventory?: () => void;
  onViewApparatus?: () => void;
  onViewChemicals?: () => void;
  onViewHistory?: () => void;
}

const QuickActions = ({
  onBorrowItems = () => {},
  onReturnItems = () => {},
  onViewReservations = () => {},
  onSearchInventory = () => {},
  onViewApparatus = () => {},
  onViewChemicals = () => {},
  onViewHistory = () => {},
}: QuickActionProps) => {
  const actions = [
    {
      icon: <ShoppingCart size={20} />,
      label: "Borrow Items",
      description: "Add items to your borrowing cart",
      onClick: onBorrowItems,
      color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    },
    {
      icon: <RotateCcw size={20} />,
      label: "Return Items",
      description: "Return borrowed equipment or chemicals",
      onClick: onReturnItems,
      color: "bg-green-50 text-green-700 hover:bg-green-100",
    },
    {
      icon: <Calendar size={20} />,
      label: "View Reservations",
      description: "Check your upcoming reservations",
      onClick: onViewReservations,
      color: "bg-purple-50 text-purple-700 hover:bg-purple-100",
    },
    {
      icon: <Search size={20} />,
      label: "Search Inventory",
      description: "Find specific items in the inventory",
      onClick: onSearchInventory,
      color: "bg-gray-50 text-gray-700 hover:bg-gray-100",
    },
    {
      icon: <Package size={20} />,
      label: "View Apparatus",
      description: "Browse laboratory equipment",
      onClick: onViewApparatus,
      color: "bg-amber-50 text-amber-700 hover:bg-amber-100",
    },
    {
      icon: <Beaker size={20} />,
      label: "View Chemicals",
      description: "Browse laboratory chemicals",
      onClick: onViewChemicals,
      color: "bg-red-50 text-red-700 hover:bg-red-100",
    },
    {
      icon: <ClipboardList size={20} />,
      label: "View History",
      description: "See your borrowing history",
      onClick: onViewHistory,
      color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {actions.map((action, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-auto py-3 px-2 flex flex-col items-center justify-center gap-2 border ${action.color} transition-all duration-200`}
                  onClick={action.onClick}
                >
                  <div className="rounded-full p-2 bg-white bg-opacity-50">
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
