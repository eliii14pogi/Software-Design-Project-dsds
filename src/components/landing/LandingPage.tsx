import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Beaker,
  Calendar,
  ClipboardList,
  Package,
  ShieldAlert,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Laboratory Inventory Management System
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Efficiently manage your laboratory equipment and chemicals with
              our comprehensive inventory system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/inventory">Browse Inventory</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Comprehensive Laboratory Management
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage your laboratory inventory
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Package className="h-10 w-10 text-blue-600" />}
              title="Inventory Tracking"
              description="Keep track of all laboratory equipment and chemicals with detailed information and stock levels."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-green-600" />}
              title="Scheduling System"
              description="Reserve equipment in advance with our intuitive calendar interface to avoid conflicts."
            />
            <FeatureCard
              icon={<ClipboardList className="h-10 w-10 text-purple-600" />}
              title="History Tracking"
              description="Maintain detailed logs of all borrowed items with timestamps and user information."
            />
            <FeatureCard
              icon={<ShieldAlert className="h-10 w-10 text-red-600" />}
              title="Safety Guidelines"
              description="Access important safety information and protocols for handling laboratory materials."
            />
            <FeatureCard
              icon={<Beaker className="h-10 w-10 text-amber-600" />}
              title="Chemical Management"
              description="Specialized tools for tracking chemicals, including hazard levels and safety data sheets."
            />
            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 text-indigo-600" />}
              title="Quick Access"
              description="Streamlined borrowing and returning process with barcode scanning capabilities."
            />
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to streamline your lab operations?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Get started with our inventory management system today.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <Link to="/dashboard">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lab Inventory</h3>
              <p className="text-gray-300">
                A comprehensive solution for laboratory inventory management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventory"
                    className="text-gray-300 hover:text-white"
                  >
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calendar"
                    className="text-gray-300 hover:text-white"
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="text-gray-300 hover:text-white"
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="text-gray-300 hover:text-white">
                    Safety Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">
                Email: support@labinventory.com
              </p>
              <p className="text-gray-300">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Laboratory Inventory Management
              System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="rounded-full bg-gray-50 w-16 h-16 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
