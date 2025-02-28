import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Beaker,
  Calendar,
  Clock,
  FlaskConical,
  Package,
  ShieldAlert,
} from "lucide-react";

interface SummaryCardProps {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  actionLabel?: string;
  onAction?: () => void;
  color?: "default" | "blue" | "green" | "yellow" | "red";
}

const SummaryCard = ({
  title = "Total Items",
  value = "245",
  icon = <Package className="h-5 w-5" />,
  trend = {
    value: 12,
    label: "from last month",
    positive: true,
  },
  actionLabel = "View details",
  onAction = () => {},
  color = "default",
}: SummaryCardProps) => {
  // Color variants for the card
  const colorVariants = {
    default: {
      iconBg: "bg-gray-100",
      iconColor: "text-gray-700",
      trendColor: trend?.positive ? "text-green-600" : "text-red-600",
      actionBg: "bg-gray-50 hover:bg-gray-100",
      actionColor: "text-gray-700",
    },
    blue: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      trendColor: trend?.positive ? "text-green-600" : "text-red-600",
      actionBg: "bg-blue-50 hover:bg-blue-100",
      actionColor: "text-blue-700",
    },
    green: {
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      trendColor: trend?.positive ? "text-green-600" : "text-red-600",
      actionBg: "bg-green-50 hover:bg-green-100",
      actionColor: "text-green-700",
    },
    yellow: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-700",
      trendColor: trend?.positive ? "text-green-600" : "text-red-600",
      actionBg: "bg-yellow-50 hover:bg-yellow-100",
      actionColor: "text-yellow-700",
    },
    red: {
      iconBg: "bg-red-100",
      iconColor: "text-red-700",
      trendColor: trend?.positive ? "text-green-600" : "text-red-600",
      actionBg: "bg-red-50 hover:bg-red-100",
      actionColor: "text-red-700",
    },
  };

  const selectedColor = colorVariants[color];

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow duration-200 h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div
            className={`${selectedColor.iconBg} ${selectedColor.iconColor} p-2 rounded-full`}
          >
            {icon}
          </div>
          {trend && (
            <div className="flex items-center gap-1">
              <span className={selectedColor.trendColor}>
                {trend.positive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <ArrowUpRight
                className={`h-3 w-3 ${selectedColor.trendColor} ${!trend.positive && "rotate-180"}`}
              />
              <span className="text-xs text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">{value}</CardTitle>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </CardContent>
      {actionLabel && (
        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            className={`w-full justify-between ${selectedColor.actionBg} ${selectedColor.actionColor} p-2 h-auto text-sm font-medium`}
            onClick={onAction}
          >
            {actionLabel}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

// Predefined card variants for common use cases
export const InventorySummaryCard = (props: Partial<SummaryCardProps>) => (
  <SummaryCard
    title="Total Inventory"
    value="245"
    icon={<Package className="h-5 w-5" />}
    color="blue"
    {...props}
  />
);

export const ApparatusSummaryCard = (props: Partial<SummaryCardProps>) => (
  <SummaryCard
    title="Apparatus"
    value="156"
    icon={<FlaskConical className="h-5 w-5" />}
    color="green"
    {...props}
  />
);

export const ChemicalsSummaryCard = (props: Partial<SummaryCardProps>) => (
  <SummaryCard
    title="Chemicals"
    value="89"
    icon={<Beaker className="h-5 w-5" />}
    color="yellow"
    {...props}
  />
);

export const ReservationsSummaryCard = (props: Partial<SummaryCardProps>) => (
  <SummaryCard
    title="Active Reservations"
    value="18"
    icon={<Calendar className="h-5 w-5" />}
    color="default"
    {...props}
  />
);

export const OverdueSummaryCard = (props: Partial<SummaryCardProps>) => (
  <SummaryCard
    title="Overdue Returns"
    value="3"
    icon={<Clock className="h-5 w-5" />}
    color="red"
    trend={{
      value: 50,
      label: "from last week",
      positive: false,
    }}
    {...props}
  />
);

export const SafetyAlertsSummaryCard = (props: Partial<SummaryCardProps>) => (
  <SummaryCard
    title="Safety Alerts"
    value="2"
    icon={<ShieldAlert className="h-5 w-5" />}
    color="red"
    {...props}
  />
);

export default SummaryCard;
