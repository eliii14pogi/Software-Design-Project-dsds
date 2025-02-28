import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Beaker,
  Calendar,
  ClipboardList,
  FlaskConical,
  Package,
  ShieldAlert,
} from "lucide-react";

interface SimpleFrontPageProps {
  backgroundImage?: string;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const SimpleFrontPage = ({
  backgroundImage = "",
  backgroundColor = "bg-gradient-to-r from-blue-100 to-indigo-100",
  title = "Laboratory Inventory Management",
  subtitle = "Efficiently manage your laboratory equipment and chemicals with our comprehensive inventory system.",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Browse Inventory",
}: SimpleFrontPageProps) => {
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className={`flex-grow flex items-center ${!backgroundImage ? backgroundColor : ""}`}
        style={backgroundStyle}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="md:w-2/3 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-700 mb-8">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/dashboard">{primaryButtonText}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/inventory">{secondaryButtonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Package className="h-10 w-10 text-blue-600" />}
              title="Inventory Tracking"
              description="Keep track of all laboratory equipment and chemicals with detailed information."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-green-600" />}
              title="Scheduling System"
              description="Reserve equipment in advance with our intuitive calendar interface."
            />
            <FeatureCard
              icon={<ClipboardList className="h-10 w-10 text-purple-600" />}
              title="History Tracking"
              description="Maintain detailed logs of all borrowed items with timestamps."
            />
            <FeatureCard
              icon={<ShieldAlert className="h-10 w-10 text-red-600" />}
              title="Safety Guidelines"
              description="Access important safety information and protocols for handling materials."
            />
            <FeatureCard
              icon={<Beaker className="h-10 w-10 text-amber-600" />}
              title="Chemical Management"
              description="Specialized tools for tracking chemicals, including hazard levels."
            />
            <FeatureCard
              icon={<FlaskConical className="h-10 w-10 text-indigo-600" />}
              title="Quick Access"
              description="Streamlined borrowing and returning process for laboratory items."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FlaskConical className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-bold">LabInventory</span>
            </div>
            <div className="flex gap-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/inventory" className="text-gray-300 hover:text-white">
                Inventory
              </Link>
              <Link to="/calendar" className="text-gray-300 hover:text-white">
                Calendar
              </Link>
              <Link to="/safety" className="text-gray-300 hover:text-white">
                Safety
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Laboratory Inventory Management
              System
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

export default SimpleFrontPage;
