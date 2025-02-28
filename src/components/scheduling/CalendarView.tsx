import React, { useState, useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import { format, addDays, isSameDay, parseISO } from "date-fns";

interface Reservation {
  id: string;
  itemId: string;
  itemName: string;
  itemCategory: string;
  itemImage: string;
  startTime: string;
  endTime: string;
  userId: string;
  userName: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  hazardLevel?: "low" | "medium" | "high" | null;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  image: string;
  status: "available" | "low-stock" | "unavailable";
  quantity: number;
  hazardLevel?: "low" | "medium" | "high" | null;
}

interface CalendarViewProps {
  reservations?: Reservation[];
  availableItems?: InventoryItem[];
  onCreateReservation?: (reservation: {
    itemId: string;
    startTime: string;
    endTime: string;
  }) => void;
  onCancelReservation?: (reservationId: string) => void;
  onViewReservationDetails?: (reservationId: string) => void;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  viewMode?: "month" | "week" | "day";
  onViewModeChange?: (mode: "month" | "week" | "day") => void;
}

const CalendarView = ({
  reservations = [
    {
      id: "res-1",
      itemId: "item-1",
      itemName: "Microscope",
      itemCategory: "Equipment",
      itemImage:
        "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      startTime: "2023-06-15T09:00:00",
      endTime: "2023-06-15T12:00:00",
      userId: "user-1",
      userName: "John Doe",
      status: "upcoming",
      hazardLevel: null,
    },
    {
      id: "res-2",
      itemId: "item-2",
      itemName: "Digital Scale",
      itemCategory: "Measuring Equipment",
      itemImage:
        "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      startTime: "2023-06-16T13:00:00",
      endTime: "2023-06-16T15:00:00",
      userId: "user-1",
      userName: "John Doe",
      status: "upcoming",
      hazardLevel: null,
    },
    {
      id: "res-3",
      itemId: "item-3",
      itemName: "Hydrochloric Acid",
      itemCategory: "Chemicals",
      itemImage:
        "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      startTime: "2023-06-17T10:00:00",
      endTime: "2023-06-17T11:30:00",
      userId: "user-2",
      userName: "Jane Smith",
      status: "upcoming",
      hazardLevel: "high",
    },
  ],
  availableItems = [
    {
      id: "item-1",
      name: "Microscope",
      category: "Equipment",
      image:
        "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 5,
    },
    {
      id: "item-2",
      name: "Digital Scale",
      category: "Measuring Equipment",
      image:
        "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 8,
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
      name: "Erlenmeyer Flask",
      category: "Glassware",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 12,
    },
    {
      id: "item-5",
      name: "Test Tubes",
      category: "Glassware",
      image:
        "https://images.unsplash.com/photo-1581092921461-7031e4bfb83a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      status: "available",
      quantity: 30,
    },
  ],
  onCreateReservation = () => {},
  onCancelReservation = () => {},
  onViewReservationDetails = () => {},
  selectedDate = new Date(),
  onDateChange = () => {},
  viewMode = "month",
  onViewModeChange = () => {},
}: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const [currentViewMode, setCurrentViewMode] = useState<
    "month" | "week" | "day"
  >(viewMode);
  const [showNewReservationDialog, setShowNewReservationDialog] =
    useState(false);
  const [showReservationDetailsDialog, setShowReservationDetailsDialog] =
    useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [newReservation, setNewReservation] = useState({
    itemId: "",
    date: currentDate,
    startTime: "09:00",
    endTime: "10:00",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Update local state when props change
  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setCurrentViewMode(viewMode);
  }, [viewMode]);

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
      onDateChange(date);
    }
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "month" | "week" | "day") => {
    setCurrentViewMode(mode);
    onViewModeChange(mode);
  };

  // Filter reservations for the selected date
  const filteredReservations = reservations.filter((reservation) => {
    const reservationDate = parseISO(reservation.startTime);
    return isSameDay(reservationDate, currentDate);
  });

  // Filter available items based on search and category
  const filteredItems = availableItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle opening reservation details
  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowReservationDetailsDialog(true);
    onViewReservationDetails(reservation.id);
  };

  // Handle cancelling a reservation
  const handleCancelReservation = (reservationId: string) => {
    onCancelReservation(reservationId);
    setShowReservationDetailsDialog(false);
  };

  // Handle creating a new reservation
  const handleCreateReservation = () => {
    const startDateTime = `${format(newReservation.date, "yyyy-MM-dd")}T${newReservation.startTime}:00`;
    const endDateTime = `${format(newReservation.date, "yyyy-MM-dd")}T${newReservation.endTime}:00`;

    onCreateReservation({
      itemId: newReservation.itemId,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    setShowNewReservationDialog(false);
    setNewReservation({
      itemId: "",
      date: currentDate,
      startTime: "09:00",
      endTime: "10:00",
    });
  };

  // Get unique categories from available items
  const categories = [
    "all",
    ...new Set(availableItems.map((item) => item.category)),
  ];

  // Status color mapping
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  // Hazard level color mapping
  const hazardColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Scheduling Calendar</h1>
            <p className="text-gray-500 mt-1">
              Manage equipment reservations and availability
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={currentViewMode === "month" ? "bg-gray-100" : ""}
              onClick={() => handleViewModeChange("month")}
            >
              Month
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={currentViewMode === "week" ? "bg-gray-100" : ""}
              onClick={() => handleViewModeChange("week")}
            >
              Week
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={currentViewMode === "day" ? "bg-gray-100" : ""}
              onClick={() => handleViewModeChange("day")}
            >
              Day
            </Button>
            <Dialog
              open={showNewReservationDialog}
              onOpenChange={setShowNewReservationDialog}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" /> New Reservation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Reservation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="item">Select Item</Label>
                    <Select
                      value={newReservation.itemId}
                      onValueChange={(value) =>
                        setNewReservation({ ...newReservation, itemId: value })
                      }
                    >
                      <SelectTrigger id="item">
                        <SelectValue placeholder="Select an item" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableItems
                          .filter((item) => item.status !== "unavailable")
                          .map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} ({item.category})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={newReservation.date}
                        onSelect={(date) =>
                          date && setNewReservation({ ...newReservation, date })
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={newReservation.startTime}
                        onChange={(e) =>
                          setNewReservation({
                            ...newReservation,
                            startTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={newReservation.endTime}
                        onChange={(e) =>
                          setNewReservation({
                            ...newReservation,
                            endTime: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleCreateReservation}
                    disabled={!newReservation.itemId}
                  >
                    Create Reservation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Calendar Section */}
        <div className="w-full md:w-2/3 p-6 border-r">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (currentViewMode === "month") {
                    newDate.setMonth(newDate.getMonth() - 1);
                  } else if (currentViewMode === "week") {
                    newDate.setDate(newDate.getDate() - 7);
                  } else {
                    newDate.setDate(newDate.getDate() - 1);
                  }
                  handleDateChange(newDate);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (currentViewMode === "month") {
                    newDate.setMonth(newDate.getMonth() + 1);
                  } else if (currentViewMode === "week") {
                    newDate.setDate(newDate.getDate() + 7);
                  } else {
                    newDate.setDate(newDate.getDate() + 1);
                  }
                  handleDateChange(newDate);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDateChange(new Date())}
                className="ml-2"
              >
                Today
              </Button>
            </div>
          </div>

          {/* Calendar Component */}
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={handleDateChange}
              className="rounded-md border"
            />
          </div>

          {/* Daily Schedule */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Schedule for {format(currentDate, "EEEE, MMMM d, yyyy")}
            </h3>
            {filteredReservations.length > 0 ? (
              <div className="space-y-3">
                {filteredReservations.map((reservation) => (
                  <Card
                    key={reservation.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleViewReservation(reservation)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={reservation.itemImage}
                            alt={reservation.itemName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">
                              {reservation.itemName}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`${statusColors[reservation.status]} border-0`}
                            >
                              {reservation.status.charAt(0).toUpperCase() +
                                reservation.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {reservation.itemCategory}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-gray-500" />
                              <span>
                                {format(
                                  parseISO(reservation.startTime),
                                  "h:mm a",
                                )}
                                {" - "}
                                {format(
                                  parseISO(reservation.endTime),
                                  "h:mm a",
                                )}
                              </span>
                            </div>
                            <div className="text-gray-500">
                              Reserved by: {reservation.userName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No reservations
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no reservations scheduled for this day.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setShowNewReservationDialog(true)}
                    size="sm"
                  >
                    <Plus className="mr-1 h-4 w-4" /> New Reservation
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Items Section */}
        <div className="w-full md:w-1/3 p-6 bg-gray-50">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Available Items</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3 pr-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex items-start p-3">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge
                            variant="outline"
                            className={`${item.status === "available" ? "bg-green-100 text-green-800" : item.status === "low-stock" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"} border-0`}
                          >
                            {item.status === "available"
                              ? "Available"
                              : item.status === "low-stock"
                                ? "Low Stock"
                                : "Unavailable"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">
                            Quantity:{" "}
                            <span className="font-medium">{item.quantity}</span>
                          </span>
                          {item.hazardLevel && (
                            <Badge
                              variant="outline"
                              className={`${hazardColors[item.hazardLevel]} border-0 flex items-center gap-1`}
                            >
                              <AlertTriangle size={12} />
                              {item.hazardLevel.charAt(0).toUpperCase() +
                                item.hazardLevel.slice(1)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => {
                          setNewReservation({
                            ...newReservation,
                            itemId: item.id,
                          });
                          setShowNewReservationDialog(true);
                        }}
                        disabled={item.status === "unavailable"}
                      >
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        Reserve
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-white rounded-lg">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No items found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Reservation Details Dialog */}
      {selectedReservation && (
        <Dialog
          open={showReservationDetailsDialog}
          onOpenChange={setShowReservationDetailsDialog}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={selectedReservation.itemImage}
                    alt={selectedReservation.itemName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedReservation.itemName}
                  </h3>
                  <p className="text-gray-500">
                    {selectedReservation.itemCategory}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={`${statusColors[selectedReservation.status]} border-0`}
                    >
                      {selectedReservation.status.charAt(0).toUpperCase() +
                        selectedReservation.status.slice(1)}
                    </Badge>
                    {selectedReservation.hazardLevel && (
                      <Badge
                        variant="outline"
                        className={`${hazardColors[selectedReservation.hazardLevel]} border-0 flex items-center gap-1`}
                      >
                        <AlertTriangle size={12} />
                        {selectedReservation.hazardLevel
                          .charAt(0)
                          .toUpperCase() +
                          selectedReservation.hazardLevel.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Date:</span>
                  <span>
                    {format(
                      parseISO(selectedReservation.startTime),
                      "EEEE, MMMM d, yyyy",
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Time:</span>
                  <span>
                    {format(parseISO(selectedReservation.startTime), "h:mm a")}
                    {" - "}
                    {format(parseISO(selectedReservation.endTime), "h:mm a")}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-medium">Reserved by:</span>
                    <div className="text-gray-700">
                      {selectedReservation.userName}
                    </div>
                  </div>
                </div>
              </div>

              {selectedReservation.hazardLevel && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">
                        Safety Notice
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        This item has a {selectedReservation.hazardLevel} hazard
                        level. Please follow all safety protocols when handling.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedReservation.status === "upcoming" && (
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleCancelReservation(selectedReservation.id)
                  }
                >
                  Cancel Reservation
                </Button>
              )}
              {selectedReservation.status === "active" && (
                <Button
                  variant="outline"
                  className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Mark as Returned
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setShowReservationDetailsDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarView;
