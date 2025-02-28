import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Beaker,
  Calendar,
  ClipboardList,
  FlaskConical,
  Microscope,
  Package,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

const NewFrontPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50 rounded-l-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Modern Lab Inventory System
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Streamline your laboratory operations with our advanced
                inventory management solution designed for scientific
                professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/dashboard">Launch Dashboard</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link to="/inventory" className="flex items-center gap-2">
                    Explore Features <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-96 w-full">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl transform rotate-3 shadow-xl"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl transform -rotate-3 shadow-xl"></div>
                <div className="absolute inset-4 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <img
                    src="/your-image-filename.jpg"
                    alt="Laboratory equipment"
                    className="rounded-lg object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Labs Using Our System" />
            <StatCard number="10,000+" label="Items Tracked" />
            <StatCard number="99.9%" label="Uptime" />
            <StatCard number="24/7" label="Support" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Everything You Need for Lab Management
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              Our comprehensive system helps you manage all aspects of your
              laboratory inventory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <FeatureCard
              icon={<Package className="h-8 w-8 text-blue-500" />}
              title="Complete Inventory Control"
              description="Track all laboratory equipment and chemicals with detailed information, location tracking, and stock alerts."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-green-500" />}
              title="Advanced Scheduling"
              description="Reserve equipment with our intuitive calendar interface to prevent scheduling conflicts and maximize resource usage."
            />
            <FeatureCard
              icon={<ClipboardList className="h-8 w-8 text-purple-500" />}
              title="Comprehensive History"
              description="Access detailed logs of all borrowed items with timestamps, user information, and usage patterns."
            />
            <FeatureCard
              icon={<ShieldAlert className="h-8 w-8 text-red-500" />}
              title="Safety Compliance"
              description="Ensure adherence to safety protocols with integrated guidelines and hazard information for all materials."
            />
            <FeatureCard
              icon={<Beaker className="h-8 w-8 text-amber-500" />}
              title="Chemical Management"
              description="Specialized tools for tracking chemicals, including hazard levels, expiration dates, and safety data sheets."
            />
            <FeatureCard
              icon={<Microscope className="h-8 w-8 text-indigo-500" />}
              title="Equipment Maintenance"
              description="Schedule and track maintenance for all laboratory equipment to ensure optimal performance and longevity."
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by Leading Research Institutions
            </h2>
            <figure className="mt-10">
              <blockquote className="text-xl text-gray-700 italic">
                <p>
                  "This inventory system has transformed how we manage our
                  laboratory resources. The time saved on administrative tasks
                  alone has allowed our researchers to focus more on their
                  scientific work."
                </p>
              </blockquote>
              <figcaption className="mt-8">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="/your-avatar-image.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-4 text-left">
                    <div className="text-base font-medium text-gray-900">
                      Dr. Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-600">
                      Laboratory Director, National Research Institute
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Ready to transform your lab management?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Get started with our inventory system today and experience the
                  difference.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8 flex">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8"
                >
                  <Link to="/dashboard">Start Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <FlaskConical className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold">LabInventory</h3>
              </div>
              <p className="text-gray-400 max-w-md">
                A comprehensive solution for laboratory inventory management,
                designed to streamline operations and enhance research
                productivity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventory"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calendar"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/safety"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Safety Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@labinventory.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Science Park, Research City</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} LabInventory Management System. All
              rights reserved.
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
    <div className="flex flex-col items-start">
      <div className="rounded-lg bg-blue-50 p-3 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div>
      <p className="text-4xl font-extrabold text-blue-600">{number}</p>
      <p className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
};

export default NewFrontPage;
