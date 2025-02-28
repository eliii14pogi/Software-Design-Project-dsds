import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  AlertTriangle,
  Clock,
  Info,
  ShoppingCart,
  Calendar as CalendarIcon,
  CheckCircle,
  FileText,
  Shield,
  Beaker,
  Thermometer,
  Ruler,
} from "lucide-react";

interface ItemDetailProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item?: {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    image: string;
    status: "available" | "low-stock" | "unavailable";
    quantity: number;
    location: string;
    hazardLevel: "low" | "medium" | "high" | null;
    description: string;
    safetyGuidelines: string[];
    usageInstructions: string[];
    maintenanceNotes: string[];
    lastMaintenance: string;
    nextMaintenance: string;
  };
  onAddToCart?: (quantity: number, returnDate: Date | undefined) => void;
}

const ItemDetail = ({
  open = true,
  onOpenChange = () => {},
  item = {
    id: "item-1",
    name: "Erlenmeyer Flask",
    category: "Apparatus",
    subcategory: "Glassware",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    status: "available",
    quantity: 12,
    location: "Cabinet A, Shelf 2",
    hazardLevel: "low",
    description:
      "Standard laboratory Erlenmeyer flask with a narrow neck and wide bottom, used for mixing, heating, and storing liquids.",
    safetyGuidelines: [
      "Handle with care to avoid breakage",
      "Do not heat directly on open flame",
      "Use appropriate gloves when handling hot flasks",
      "Dispose of broken glass in designated containers",
    ],
    usageInstructions: [
      "Clean before and after each use",
      "Use with appropriate stand or holder when heating",
      "Do not fill beyond 75% capacity when heating",
      "Allow to cool before handling after heating",
    ],
    maintenanceNotes: [
      "Inspect for cracks before each use",
      "Clean with non-abrasive detergent",
      "Store in designated area to prevent damage",
    ],
    lastMaintenance: "2023-10-15",
    nextMaintenance: "2024-04-15",
  },
  onAddToCart = () => {},
}: ItemDetailProps) => {
  const [selectedTab, setSelectedTab] = useState("details");
  const [borrowQuantity, setBorrowQuantity] = useState(1);
  const [returnDate, setReturnDate] = useState<Date>();

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

  const handleAddToCart = () => {
    onAddToCart(borrowQuantity, returnDate);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden bg-white p-0">
        <div className="flex flex-col h-full">
          {/* Header with image */}
          <div className="relative h-48 sm:h-64 bg-gray-200">
            {item && item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Info className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 sm:p-6 text-white w-full">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {item?.name || "Item Details"}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item && (
                    <>
                      <Badge
                        variant="outline"
                        className="bg-white/20 text-white border-0"
                      >
                        {item.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-white/20 text-white border-0"
                      >
                        {item.subcategory}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${statusColors[item.status]} border-0`}
                      >
                        {item.status === "available"
                          ? "Available"
                          : item.status === "low-stock"
                            ? "Low Stock"
                            : "Unavailable"}
                      </Badge>
                      {item.hazardLevel && (
                        <Badge
                          variant="outline"
                          className={`${hazardColors[item.hazardLevel]} border-0 flex items-center gap-1`}
                        >
                          <AlertTriangle size={12} />
                          {item.hazardLevel.charAt(0).toUpperCase() +
                            item.hazardLevel.slice(1)}{" "}
                          Hazard
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            defaultValue="details"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="border-b">
              <TabsList className="w-full justify-start h-12 bg-transparent p-0">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="safety"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Safety
                </TabsTrigger>
                <TabsTrigger
                  value="usage"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Usage
                </TabsTrigger>
                <TabsTrigger
                  value="borrow"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-4"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Borrow
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Contents */}
            <ScrollArea className="flex-1 p-4 sm:p-6">
              <TabsContent value="details" className="mt-0 p-0">
                {item ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Description</h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Beaker className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Category:</span>{" "}
                          {item.category}
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Subcategory:</span>{" "}
                          {item.subcategory}
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            Hazard Level:
                          </span>{" "}
                          {item.hazardLevel
                            ? `${item.hazardLevel.charAt(0).toUpperCase() + item.hazardLevel.slice(1)}`
                            : "None"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            Quantity Available:
                          </span>{" "}
                          {item.quantity} units
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Location:</span>{" "}
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            Last Maintenance:
                          </span>{" "}
                          {item.lastMaintenance}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Maintenance Notes</h3>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                        {item.maintenanceNotes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p>No item details available</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="safety" className="mt-0 p-0">
                {item ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <h3 className="text-lg font-medium">
                          Safety Guidelines
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-1 mb-3">
                        Please follow these safety guidelines when handling this
                        item:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {item.safetyGuidelines.map((guideline, index) => (
                          <li key={index}>{guideline}</li>
                        ))}
                      </ul>
                    </div>

                    {item.hazardLevel && (
                      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                        <div className="flex items-center gap-2 text-amber-700">
                          <AlertTriangle className="h-5 w-5" />
                          <h4 className="font-medium">Hazard Warning</h4>
                        </div>
                        <p className="mt-2 text-amber-700">
                          This item has a {item.hazardLevel} hazard level.
                          Ensure you have appropriate training and protective
                          equipment before use.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p>No safety information available</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="usage" className="mt-0 p-0">
                {item ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        Usage Instructions
                      </h3>
                      <p className="text-gray-600 mt-1 mb-3">
                        Follow these instructions for proper use of this item:
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                        {item.usageInstructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium">Related Resources</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <Button variant="outline" className="justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          User Manual
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Maintenance Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p>No usage information available</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="borrow" className="mt-0 p-0">
                {item ? (
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-blue-700 text-sm">
                        You are about to borrow{" "}
                        <span className="font-medium">{item.name}</span>. Please
                        specify the quantity and expected return date.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <div className="flex items-center mt-1.5">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-r-none"
                            onClick={() =>
                              setBorrowQuantity(Math.max(1, borrowQuantity - 1))
                            }
                            disabled={borrowQuantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            max={item.quantity}
                            value={borrowQuantity}
                            onChange={(e) =>
                              setBorrowQuantity(parseInt(e.target.value) || 1)
                            }
                            className="h-10 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-l-none"
                            onClick={() =>
                              setBorrowQuantity(
                                Math.min(item.quantity, borrowQuantity + 1),
                              )
                            }
                            disabled={borrowQuantity >= item.quantity}
                          >
                            +
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.quantity} units available
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="return-date">
                          Expected Return Date
                        </Label>
                        <div className="mt-1.5">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            disabled={(date) => date < new Date()}
                            className="border rounded-md p-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p>Item not available for borrowing</p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Footer */}
          <DialogFooter className="p-4 border-t bg-gray-50">
            {item && selectedTab === "borrow" ? (
              <Button
                onClick={handleAddToCart}
                disabled={!returnDate || item.status === "unavailable"}
                className="w-full sm:w-auto"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            ) : item ? (
              <Button
                onClick={() => setSelectedTab("borrow")}
                disabled={item.status === "unavailable"}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Borrow This Item
              </Button>
            ) : (
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetail;
