import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Trash2,
  ShoppingCart,
  X,
  Clock,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
  hazardLevel?: "low" | "medium" | "high" | null;
}

interface BorrowingCartProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onRemoveItem?: (id: string) => void;
  onCheckout?: (returnDate: Date) => void;
  onClearCart?: () => void;
}

const BorrowingCart = ({
  isOpen = false,
  onClose = () => {},
  items = [
    {
      id: "item-1",
      name: "Erlenmeyer Flask",
      category: "Glassware",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      quantity: 2,
      hazardLevel: null,
    },
    {
      id: "item-2",
      name: "Digital Scale",
      category: "Measuring Equipment",
      image:
        "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
      hazardLevel: null,
    },
    {
      id: "item-3",
      name: "Hydrochloric Acid",
      category: "Chemicals",
      image:
        "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
      hazardLevel: "high",
    },
  ],
  onRemoveItem = () => {},
  onCheckout = () => {},
  onClearCart = () => {},
}: BorrowingCartProps) => {
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ); // Default to 7 days from now
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Hazard level color mapping
  const hazardColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasHazardousItems = items.some((item) => item.hazardLevel);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white" side="right">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-xl font-semibold flex items-center gap-2">
                <ShoppingCart size={20} />
                Borrowing Cart
                <Badge variant="outline" className="ml-2">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </Badge>
              </SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={18} />
              </Button>
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Add items from the inventory to borrow them
              </p>
              <Button variant="outline" onClick={onClose}>
                Browse Inventory
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-grow">
                <div className="px-6 py-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    ITEMS IN CART
                  </h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 pb-4 border-b border-gray-100"
                      >
                        <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-red-500"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-700">
                              Quantity:{" "}
                              <span className="font-medium">
                                {item.quantity}
                              </span>
                            </div>
                            {item.hazardLevel && (
                              <Badge
                                variant="outline"
                                className={`${hazardColors[item.hazardLevel]} border-0 text-xs flex items-center gap-1 py-0 h-5`}
                              >
                                <AlertTriangle size={10} />
                                {item.hazardLevel.charAt(0).toUpperCase() +
                                  item.hazardLevel.slice(1)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      RETURN DATE
                    </h3>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? (
                            format(returnDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={(date) => {
                            setReturnDate(date);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <Clock size={12} className="mr-1" />
                      All items must be returned by 5:00 PM on the selected date
                    </p>
                  </div>

                  {hasHazardousItems && (
                    <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          size={16}
                          className="text-amber-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-amber-800">
                            Safety Notice
                          </h4>
                          <p className="text-xs text-amber-700 mt-1">
                            Your cart contains hazardous materials. Please
                            review safety guidelines before checkout.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t border-gray-200 p-6 space-y-3">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  disabled={!returnDate}
                  onClick={() => returnDate && onCheckout(returnDate)}
                >
                  Proceed to Checkout
                  <ChevronRight size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BorrowingCart;
