import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Search,
  Bell,
  Menu,
  Package,
  Calendar,
  ClipboardList,
  ShieldAlert,
  User,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface NavbarProps {
  username?: string;
  avatarUrl?: string;
  cartItemCount?: number;
  notificationCount?: number;
  onMenuToggle?: () => void;
  onInventoryClick?: () => void;
  onCalendarClick?: () => void;
  onHistoryClick?: () => void;
  onSafetyClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Navbar = ({
  username = "Lab User",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=lab123",
  cartItemCount = 0,
  notificationCount = 0,
  onMenuToggle = () => {},
  onInventoryClick = () => {},
  onCalendarClick = () => {},
  onHistoryClick = () => {},
  onSafetyClick = () => {},
  onCartClick = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onLogoutClick = () => {},
}: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between w-full sticky top-0 z-50">
      {/* Left section: Logo and mobile menu */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">Lab</span>
          <span className="text-xl font-bold text-gray-600">Inventory</span>
        </div>
      </div>

      {/* Center section: Navigation links (hidden on mobile) */}
      <div className="hidden md:flex items-center space-x-1">
        <Button
          variant="ghost"
          className="flex items-center gap-1.5 text-gray-700 hover:text-primary"
          onClick={onInventoryClick}
        >
          <Package className="h-4 w-4" />
          Inventory
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-1.5 text-gray-700 hover:text-primary"
          onClick={onCalendarClick}
        >
          <Calendar className="h-4 w-4" />
          Calendar
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-1.5 text-gray-700 hover:text-primary"
          onClick={onHistoryClick}
        >
          <ClipboardList className="h-4 w-4" />
          History
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-1.5 text-gray-700 hover:text-primary"
          onClick={onSafetyClick}
        >
          <ShieldAlert className="h-4 w-4" />
          Safety
        </Button>
      </div>

      {/* Right section: Search, notifications, cart, and profile */}
      <div className="flex items-center space-x-2">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="w-[200px] lg:w-[300px] pl-9 h-9 bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Cart */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-5 w-5 text-gray-700" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-700" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {notificationCount}
            </Badge>
          )}
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9"
            >
              <Avatar>
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback>
                  {username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{username}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  Laboratory Staff
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogoutClick}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
