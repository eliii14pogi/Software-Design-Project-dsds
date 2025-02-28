import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Package,
  Beaker,
  User,
  CalendarDays,
} from "lucide-react";

interface HistoryItem {
  id: string;
  itemName: string;
  itemType: "apparatus" | "chemical";
  borrowDate: Date;
  returnDate: Date;
  actualReturnDate?: Date;
  status: "active" | "returned" | "overdue";
  quantity: number;
  borrowedBy: string;
  notes?: string;
}

interface HistoryTrackingProps {
  historyItems?: HistoryItem[];
}

const HistoryTracking = ({
  historyItems = [
    {
      id: "hist-1",
      itemName: "Erlenmeyer Flask",
      itemType: "apparatus",
      borrowDate: new Date(2023, 9, 15),
      returnDate: new Date(2023, 9, 22),
      actualReturnDate: new Date(2023, 9, 21),
      status: "returned",
      quantity: 2,
      borrowedBy: "John Doe",
      notes: "Returned in good condition",
    },
    {
      id: "hist-2",
      itemName: "Digital Scale",
      itemType: "apparatus",
      borrowDate: new Date(2023, 10, 5),
      returnDate: new Date(2023, 10, 12),
      status: "active",
      quantity: 1,
      borrowedBy: "Jane Smith",
    },
    {
      id: "hist-3",
      itemName: "Hydrochloric Acid",
      itemType: "chemical",
      borrowDate: new Date(2023, 9, 28),
      returnDate: new Date(2023, 10, 5),
      status: "overdue",
      quantity: 1,
      borrowedBy: "Mike Johnson",
    },
    {
      id: "hist-4",
      itemName: "Microscope",
      itemType: "apparatus",
      borrowDate: new Date(2023, 10, 1),
      returnDate: new Date(2023, 10, 15),
      status: "active",
      quantity: 1,
      borrowedBy: "Sarah Williams",
      notes: "For biology research project",
    },
    {
      id: "hist-5",
      itemName: "Test Tubes",
      itemType: "apparatus",
      borrowDate: new Date(2023, 9, 10),
      returnDate: new Date(2023, 9, 17),
      actualReturnDate: new Date(2023, 9, 17),
      status: "returned",
      quantity: 10,
      borrowedBy: "David Brown",
    },
    {
      id: "hist-6",
      itemName: "Sodium Hydroxide",
      itemType: "chemical",
      borrowDate: new Date(2023, 9, 20),
      returnDate: new Date(2023, 9, 27),
      actualReturnDate: new Date(2023, 9, 26),
      status: "returned",
      quantity: 1,
      borrowedBy: "Emily Davis",
      notes: "Used for pH adjustment experiment",
    },
  ],
}: HistoryTrackingProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filter history items based on search query, status, type, and date range
  const filteredItems = historyItems.filter((item) => {
    // Search filter
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.borrowedBy.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    // Type filter
    const matchesType =
      selectedType === "all" || item.itemType === selectedType;

    // Date range filter
    let matchesDateRange = true;
    if (selectedDateRange.from) {
      matchesDateRange =
        matchesDateRange && item.borrowDate >= selectedDateRange.from;
    }
    if (selectedDateRange.to) {
      matchesDateRange =
        matchesDateRange && item.borrowDate <= selectedDateRange.to;
    }

    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle item click to show details
  const handleItemClick = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-0">
            <Clock className="mr-1 h-3 w-3" /> Active
          </Badge>
        );
      case "returned":
        return (
          <Badge className="bg-green-100 text-green-800 border-0">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Returned
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 border-0">
            <AlertTriangle className="mr-1 h-3 w-3" /> Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Item type icon renderer
  const renderItemTypeIcon = (type: string) => {
    switch (type) {
      case "apparatus":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "chemical":
        return <Beaker className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full h-full flex flex-col p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">Borrowing History</h1>
          <p className="text-gray-500">
            Track all laboratory items that have been borrowed and returned
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search by item or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className="w-full md:w-48">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apparatus">Apparatus</SelectItem>
                  <SelectItem value="chemical">Chemicals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Picker */}
            <div className="w-full md:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDateRange.from ? (
                      selectedDateRange.to ? (
                        <>
                          {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                          {format(selectedDateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(selectedDateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={selectedDateRange}
                    onSelect={setSelectedDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Applied Filters */}
          {(selectedStatus !== "all" ||
            selectedType !== "all" ||
            selectedDateRange.from ||
            searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">Applied filters:</span>
              {selectedStatus !== "all" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-100"
                >
                  Status: {selectedStatus}
                  <XCircle
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedStatus("all")}
                  />
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-100"
                >
                  Type: {selectedType}
                  <XCircle
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedType("all")}
                  />
                </Badge>
              )}
              {selectedDateRange.from && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-100"
                >
                  Date range
                  <XCircle
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() =>
                      setSelectedDateRange({ from: undefined, to: undefined })
                    }
                  />
                </Badge>
              )}
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-gray-100"
                >
                  Search: {searchQuery}
                  <XCircle
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All History</TabsTrigger>
            <TabsTrigger value="active">Active Borrowings</TabsTrigger>
            <TabsTrigger value="returned">Returned Items</TabsTrigger>
          </TabsList>

          {/* All History Tab */}
          <TabsContent value="all" className="space-y-4">
            {renderHistoryTable(
              paginatedItems,
              handleItemClick,
              renderStatusBadge,
              renderItemTypeIcon,
            )}
          </TabsContent>

          {/* Active Borrowings Tab */}
          <TabsContent value="active" className="space-y-4">
            {renderHistoryTable(
              paginatedItems.filter((item) => item.status === "active"),
              handleItemClick,
              renderStatusBadge,
              renderItemTypeIcon,
            )}
          </TabsContent>

          {/* Returned Items Tab */}
          <TabsContent value="returned" className="space-y-4">
            {renderHistoryTable(
              paginatedItems.filter((item) => item.status === "returned"),
              handleItemClick,
              renderStatusBadge,
              renderItemTypeIcon,
            )}
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="mx-1 h-8 w-8"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ),
                )}
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

        {/* Export Button */}
        <div className="flex justify-end mt-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export History
          </Button>
        </div>
      </div>

      {/* Item Detail Dialog */}
      {selectedItem && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {renderItemTypeIcon(selectedItem.itemType)}
                {selectedItem.itemName}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Borrowing Details</h3>
                {renderStatusBadge(selectedItem.status)}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="h-4 w-4" /> Borrowed By
                  </p>
                  <p className="font-medium">{selectedItem.borrowedBy}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Package className="h-4 w-4" /> Quantity
                  </p>
                  <p className="font-medium">{selectedItem.quantity} units</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" /> Borrow Date
                  </p>
                  <p className="font-medium">
                    {format(selectedItem.borrowDate, "PPP")}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" /> Expected Return
                  </p>
                  <p className="font-medium">
                    {format(selectedItem.returnDate, "PPP")}
                  </p>
                </div>

                {selectedItem.actualReturnDate && (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" /> Actual Return
                    </p>
                    <p className="font-medium">
                      {format(selectedItem.actualReturnDate, "PPP")}
                    </p>
                  </div>
                )}
              </div>

              {selectedItem.notes && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FileText className="h-4 w-4" /> Notes
                    </p>
                    <p className="text-sm">{selectedItem.notes}</p>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Helper function to render the history table
const renderHistoryTable = (
  items: HistoryItem[],
  onItemClick: (item: HistoryItem) => void,
  renderStatusBadge: (status: string) => React.ReactNode,
  renderItemTypeIcon: (type: string) => React.ReactNode,
) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No history records found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Borrowed By</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {renderItemTypeIcon(item.itemType)}
                  <span className="font-medium">{item.itemName}</span>
                </div>
              </TableCell>
              <TableCell>{item.borrowedBy}</TableCell>
              <TableCell>{format(item.borrowDate, "MMM d, yyyy")}</TableCell>
              <TableCell>{format(item.returnDate, "MMM d, yyyy")}</TableCell>
              <TableCell>{renderStatusBadge(item.status)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onItemClick(item)}
                  className="h-8 w-8 p-0"
                >
                  <Eye size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTracking;
