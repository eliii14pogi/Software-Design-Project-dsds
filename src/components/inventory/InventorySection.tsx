import React, { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import FilterSidebar from "./FilterSidebar";
import ItemGrid from "./ItemGrid";
import ItemDetail from "./ItemDetail";
import BorrowingCart from "./BorrowingCart";
import { Button } from "../ui/button";
import { Filter, ShoppingCart } from "lucide-react";

interface InventorySectionProps {
  defaultCategory?: string;
  onAddToCart?: (item: any, quantity: number, returnDate: Date) => void;
}

const InventorySection = ({
  defaultCategory = "apparatus",
  onAddToCart = () => {},
}: InventorySectionProps) => {
  // State for active category
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // State for filter sidebar visibility on mobile
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // State for borrowing cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // State for selected item detail
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isItemDetailOpen, setIsItemDetailOpen] = useState(false);

  // Sample inventory data
  const inventoryData = {
    apparatus: [
      {
        id: "app-1",
        name: "Erlenmeyer Flask",
        category: "Glassware",
        image:
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 12,
        hazardLevel: null,
      },
      {
        id: "app-2",
        name: "Digital Scale",
        category: "Measuring Equipment",
        image:
          "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 8,
        hazardLevel: null,
      },
      {
        id: "app-3",
        name: "Microscope",
        category: "Equipment",
        image:
          "https://images.unsplash.com/photo-1516728778615-2d590ea1855e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 5,
        hazardLevel: null,
      },
      {
        id: "app-4",
        name: "Test Tubes",
        category: "Glassware",
        image:
          "https://images.unsplash.com/photo-1581092921461-7031e4bfb83a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 30,
        hazardLevel: null,
      },
      {
        id: "app-5",
        name: "Bunsen Burner",
        category: "Equipment",
        image:
          "https://images.unsplash.com/photo-1581093196277-9f608bb3b4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "low-stock",
        quantity: 2,
        hazardLevel: null,
      },
      {
        id: "app-6",
        name: "Graduated Cylinder",
        category: "Measuring Equipment",
        image:
          "https://images.unsplash.com/photo-1581093458791-9d8e8e0e5b7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 15,
        hazardLevel: null,
      },
    ],
    chemicals: [
      {
        id: "chem-1",
        name: "Hydrochloric Acid",
        category: "Chemicals",
        image:
          "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "low-stock",
        quantity: 3,
        hazardLevel: "high",
      },
      {
        id: "chem-2",
        name: "Sodium Hydroxide",
        category: "Chemicals",
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 5,
        hazardLevel: "medium",
      },
      {
        id: "chem-3",
        name: "Ethanol",
        category: "Chemicals",
        image:
          "https://images.unsplash.com/photo-1581093196277-9f608bb3b4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "available",
        quantity: 10,
        hazardLevel: "low",
      },
      {
        id: "chem-4",
        name: "Sulfuric Acid",
        category: "Chemicals",
        image:
          "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        status: "unavailable",
        quantity: 0,
        hazardLevel: "high",
      },
    ],
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Handle item click to show details
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsItemDetailOpen(true);
  };

  // Handle adding item to cart
  const handleAddToCart = (item: any) => {
    // Check if item is already in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    // Show cart
    setIsCartOpen(true);
  };

  // Handle adding item from detail view
  const handleAddToCartFromDetail = (
    quantity: number,
    returnDate: Date | undefined,
  ) => {
    if (selectedItem && returnDate) {
      // Check if item is already in cart
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.id === selectedItem.id,
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedCartItems);
      } else {
        // Add new item to cart
        setCartItems([...cartItems, { ...selectedItem, quantity }]);
      }

      // Call parent handler if provided
      onAddToCart(selectedItem, quantity, returnDate);

      // Show cart
      setIsCartOpen(true);
    }
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Handle clearing cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handle checkout
  const handleCheckout = (returnDate: Date) => {
    // In a real app, this would submit the cart to a backend
    console.log("Checking out with return date:", returnDate);
    console.log("Cart items:", cartItems);

    // Clear cart after checkout
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="bg-gray-50 w-full h-full flex flex-col">
      {/* Category Tabs */}
      <div className="p-4 bg-white border-b">
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Filter Button (Mobile Only) */}
        <div className="md:hidden fixed bottom-4 left-4 z-10">
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={() => setIsFilterSidebarOpen(true)}
          >
            <Filter size={20} />
          </Button>
        </div>

        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          categoryType={activeCategory as "apparatus" | "chemicals"}
        />

        {/* Item Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <ItemGrid
            items={
              inventoryData[activeCategory as keyof typeof inventoryData] || []
            }
            onItemClick={handleItemClick}
            onAddToCart={handleAddToCart}
            category={activeCategory}
          />
        </div>

        {/* Cart Button (Mobile Only) */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Item Detail Modal */}
      <ItemDetail
        open={isItemDetailOpen}
        onOpenChange={setIsItemDetailOpen}
        item={selectedItem}
        onAddToCart={handleAddToCartFromDetail}
      />

      {/* Borrowing Cart */}
      <BorrowingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default InventorySection;
