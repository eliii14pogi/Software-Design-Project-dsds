import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  LayoutDashboard,
  ShieldAlert,
} from "lucide-react";
import SummaryCard, {
  ApparatusSummaryCard,
  ChemicalsSummaryCard,
  InventorySummaryCard,
  OverdueSummaryCard,
  ReservationsSummaryCard,
  SafetyAlertsSummaryCard,
} from "./SummaryCard";
import QuickActions from "./QuickActions";

interface DashboardOverviewProps {
  userName?: string;
  inventorySummary?: {
    total: number;
    apparatus: number;
    chemicals: number;
    trend: number;
  };
  reservations?: {
    upcoming: Array<{
      id: string;
      itemName: string;
      date: string;
      time: string;
    }>;
    active: number;
    overdue: number;
  };
  recentActivity?: Array<{
    id: string;
    action: "borrowed" | "returned" | "reserved" | "canceled";
    itemName: string;
    timestamp: string;
    user?: string;
  }>;
  safetyAlerts?: Array<{
    id: string;
    title: string;
    level: "info" | "warning" | "critical";
    message: string;
  }>;
}

const DashboardOverview = ({
  userName = "Lab Manager",
  inventorySummary = {
    total: 245,
    apparatus: 156,
    chemicals: 89,
    trend: 12,
  },
  reservations = {
    upcoming: [
      {
        id: "res-1",
        itemName: "Microscope XR-500",
        date: "Today",
        time: "2:00 PM - 4:00 PM",
      },
      {
        id: "res-2",
        itemName: "Centrifuge C-1000",
        date: "Tomorrow",
        time: "10:00 AM - 12:00 PM",
      },
      {
        id: "res-3",
        itemName: "Spectrophotometer",
        date: "May 15, 2023",
        time: "1:00 PM - 3:00 PM",
      },
    ],
    active: 18,
    overdue: 3,
  },
  recentActivity = [
    {
      id: "act-1",
      action: "borrowed",
      itemName: "Digital Scale",
      timestamp: "2 hours ago",
      user: "Sarah Johnson",
    },
    {
      id: "act-2",
      action: "returned",
      itemName: "Bunsen Burner",
      timestamp: "Yesterday",
      user: "Michael Chen",
    },
    {
      id: "act-3",
      action: "reserved",
      itemName: "Microscope XR-500",
      timestamp: "Yesterday",
      user: "Emily Rodriguez",
    },
    {
      id: "act-4",
      action: "canceled",
      itemName: "Centrifuge C-1000",
      timestamp: "2 days ago",
      user: "David Kim",
    },
  ],
  safetyAlerts = [
    {
      id: "alert-1",
      title: "Chemical Spill Protocol Update",
      level: "info",
      message:
        "New chemical spill protocol has been published. Please review the updated safety guidelines.",
    },
    {
      id: "alert-2",
      title: "Hazardous Material Delivery",
      level: "warning",
      message:
        "Scheduled delivery of hazardous materials tomorrow. Ensure proper PPE is available.",
    },
  ],
}: DashboardOverviewProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Helper function to get the appropriate color for activity badges
  const getActivityColor = (action: string) => {
    switch (action) {
      case "borrowed":
        return "bg-blue-100 text-blue-800";
      case "returned":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-purple-100 text-purple-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get the appropriate icon for safety alerts
  const getAlertIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Bell className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "critical":
        return <ShieldAlert className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Helper function to get the appropriate background for safety alerts
  const getAlertBackground = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-50 border-blue-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      case "critical":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 w-full h-full flex flex-col gap-6 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {userName}
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your laboratory inventory today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </Button>
          <Button className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Inventory
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Safety Alerts
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <InventorySummaryCard
              value={inventorySummary.total.toString()}
              trend={{
                value: inventorySummary.trend,
                label: "from last month",
                positive: true,
              }}
              actionLabel="View inventory"
            />
            <ApparatusSummaryCard
              value={inventorySummary.apparatus.toString()}
              actionLabel="View apparatus"
            />
            <ChemicalsSummaryCard
              value={inventorySummary.chemicals.toString()}
              actionLabel="View chemicals"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReservationsSummaryCard
              value={reservations.active.toString()}
              actionLabel="View calendar"
            />
            <OverdueSummaryCard
              value={reservations.overdue.toString()}
              trend={{
                value: 50,
                label: "from last week",
                positive: false,
              }}
              actionLabel="View overdue items"
            />
            <SafetyAlertsSummaryCard
              value={safetyAlerts.length.toString()}
              actionLabel="View safety guidelines"
            />
          </div>

          {/* Upcoming Reservations */}
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    Upcoming Reservations
                  </h2>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {reservations.upcoming.length > 0 ? (
                  <div className="space-y-4">
                    {reservations.upcoming.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {reservation.itemName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {reservation.date} • {reservation.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">
                      No upcoming reservations found.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab Content */}
        <TabsContent value="activity" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-500" />
                Recent Activity
              </h2>

              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Badge
                          variant="outline"
                          className={`${getActivityColor(activity.action)} border-0 capitalize`}
                        >
                          {activity.action}
                        </Badge>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {activity.itemName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {activity.user} • {activity.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No recent activity found.</p>
                </div>
              )}

              <div className="mt-4 text-center">
                <Button variant="outline">
                  View All Activity
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Alerts Tab Content */}
        <TabsContent value="safety" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-gray-500" />
                Safety Alerts
              </h2>

              {safetyAlerts.length > 0 ? (
                <div className="space-y-4">
                  {safetyAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border ${getAlertBackground(alert.level)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getAlertIcon(alert.level)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {alert.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {alert.message}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">
                              Dismiss
                            </Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">
                    No safety alerts at this time.
                  </p>
                </div>
              )}

              <div className="mt-4 text-center">
                <Button variant="outline">
                  View All Safety Guidelines
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardOverview;
