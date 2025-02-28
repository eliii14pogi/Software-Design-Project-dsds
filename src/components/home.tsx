import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import DashboardOverview from "./dashboard/DashboardOverview";
import InventorySection from "./inventory/InventorySection";
import CalendarView from "./scheduling/CalendarView";
import HistoryTracking from "./history/HistoryTracking";
import SafetyGuidelines from "./safety/SafetyGuidelines";
import BorrowingCart from "./inventory/BorrowingCart";

const Home = () => {
  // State for active section
  const [activeSection, setActiveSection] = useState("dashboard");

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for cart
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle navigation
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  // Handle adding item to cart
  const handleAddToCart = (
    item: any,
    quantity: number = 1,
    returnDate?: Date,
  ) => {
    // Check if item is already in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { ...item, quantity }]);
    }

    // Show cart
    setIsCartOpen(true);
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

  // Render active section content
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "inventory":
        return <InventorySection onAddToCart={handleAddToCart} />;
      case "calendar":
        return <CalendarView />;
      case "history":
        return <HistoryTracking />;
      case "safety":
        return <SafetyGuidelines />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        username="Lab Manager"
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        notificationCount={2}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onInventoryClick={() => handleNavigation("inventory")}
        onCalendarClick={() => handleNavigation("calendar")}
        onHistoryClick={() => handleNavigation("history")}
        onSafetyClick={() => handleNavigation("safety")}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-64 h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <button
                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${activeSection === "dashboard" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => handleNavigation("dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="9" />
                  <rect x="14" y="3" width="7" height="5" />
                  <rect x="14" y="12" width="7" height="9" />
                  <rect x="3" y="16" width="7" height="5" />
                </svg>
                Dashboard
              </button>
              <button
                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${activeSection === "inventory" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => handleNavigation("inventory")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                Inventory
              </button>
              <button
                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${activeSection === "calendar" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => handleNavigation("calendar")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Calendar
              </button>
              <button
                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${activeSection === "history" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => handleNavigation("history")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                History
              </button>
              <button
                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${activeSection === "safety" ? "bg-primary/10 text-primary" : ""}`}
                onClick={() => handleNavigation("safety")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Safety
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </main>

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

export default Home;
