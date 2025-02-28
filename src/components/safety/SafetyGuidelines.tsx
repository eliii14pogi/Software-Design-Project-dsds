import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  AlertTriangle,
  BookOpen,
  FileText,
  Filter,
  FlaskConical,
  HardHat,
  Info,
  Microscope,
  Search,
  Shield,
  ShieldAlert,
  Thermometer,
  Waves,
} from "lucide-react";

interface SafetyGuidelinesProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const SafetyGuidelines = ({
  activeCategory = "general",
  onCategoryChange = () => {},
}: SafetyGuidelinesProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Safety categories
  const categories = [
    { id: "general", name: "General Safety", icon: <Shield size={16} /> },
    {
      id: "chemical",
      name: "Chemical Safety",
      icon: <FlaskConical size={16} />,
    },
    {
      id: "equipment",
      name: "Equipment Safety",
      icon: <Microscope size={16} />,
    },
    {
      id: "emergency",
      name: "Emergency Procedures",
      icon: <AlertTriangle size={16} />,
    },
    {
      id: "ppe",
      name: "Personal Protective Equipment",
      icon: <HardHat size={16} />,
    },
  ];

  // General safety guidelines
  const generalGuidelines = [
    {
      title: "Laboratory Conduct",
      content: [
        "No eating, drinking, or smoking in the laboratory",
        "No running or horseplay in the laboratory",
        "Keep workspaces clean and organized",
        "Wash hands thoroughly before leaving the laboratory",
        "Report all accidents, injuries, and broken equipment to supervisor",
        "Know the location of emergency equipment (fire extinguishers, eyewash stations, etc.)",
      ],
    },
    {
      title: "Waste Disposal",
      content: [
        "Dispose of chemicals according to approved procedures",
        "Use appropriate waste containers for different types of waste",
        "Never pour chemicals down the drain without approval",
        "Label all waste containers properly",
        "Keep waste containers closed when not in use",
      ],
    },
    {
      title: "Working Alone",
      content: [
        "Avoid working alone in the laboratory whenever possible",
        "If working alone is necessary, inform supervisor and establish check-in procedures",
        "Do not perform hazardous operations when working alone",
        "Keep emergency contact information readily available",
      ],
    },
  ];

  // Chemical safety guidelines
  const chemicalGuidelines = [
    {
      title: "Chemical Handling",
      content: [
        "Read Safety Data Sheets (SDS) before working with any chemical",
        "Label all chemical containers with contents and hazard information",
        "Use appropriate PPE when handling chemicals",
        "Never smell, taste, or touch chemicals directly",
        "Use fume hoods when working with volatile or hazardous chemicals",
        "Transport chemicals in secondary containers or bottle carriers",
      ],
    },
    {
      title: "Chemical Storage",
      content: [
        "Store chemicals according to compatibility groups",
        "Keep flammable chemicals in approved flammable storage cabinets",
        "Store acids and bases separately",
        "Keep oxidizers away from flammables and combustibles",
        "Store chemicals below eye level",
        "Inspect chemical containers regularly for leaks or damage",
      ],
    },
    {
      title: "Chemical Spills",
      content: [
        "Know the location of spill kits and how to use them",
        "For small spills, use appropriate absorbent materials",
        "For large spills, evacuate the area and call emergency services",
        "Report all spills to supervisor",
        "Dispose of spill cleanup materials as hazardous waste",
      ],
    },
  ];

  // Equipment safety guidelines
  const equipmentGuidelines = [
    {
      title: "General Equipment Use",
      content: [
        "Read equipment manuals before use",
        "Receive proper training before using unfamiliar equipment",
        "Inspect equipment for damage before use",
        "Do not use damaged or malfunctioning equipment",
        "Report equipment problems to supervisor",
        "Turn off equipment when not in use",
      ],
    },
    {
      title: "Electrical Safety",
      content: [
        "Inspect electrical cords for damage before use",
        "Do not use equipment with damaged cords",
        "Keep electrical equipment away from water and wet areas",
        "Do not overload electrical outlets",
        "Unplug equipment before maintenance or cleaning",
        "Know the location of circuit breakers",
      ],
    },
    {
      title: "Heating Equipment",
      content: [
        "Never leave heating equipment unattended",
        "Use heat-resistant gloves when handling hot materials",
        "Allow equipment to cool before handling or storing",
        "Keep flammable materials away from heat sources",
        "Use appropriate stands and clamps for heated glassware",
      ],
    },
  ];

  // Emergency procedures
  const emergencyProcedures = [
    {
      title: "Fire Emergency",
      content: [
        "Activate fire alarm and call emergency services",
        "Use fire extinguisher only if safe to do so",
        "Evacuate the building using designated exit routes",
        "Do not use elevators during a fire",
        "Report to designated assembly area",
        "Do not re-enter the building until authorized",
      ],
    },
    {
      title: "Chemical Exposure",
      content: [
        "Remove contaminated clothing",
        "Flush affected area with water for at least 15 minutes",
        "For eye exposure, use eyewash station for at least 15 minutes",
        "Seek medical attention",
        "Bring SDS of chemical to medical personnel",
        "Report incident to supervisor",
      ],
    },
    {
      title: "Medical Emergency",
      content: [
        "Call emergency services",
        "Provide first aid if trained and safe to do so",
        "Do not move injured person unless necessary for safety",
        "Clear area to allow access for emergency responders",
        "Report incident to supervisor",
      ],
    },
  ];

  // Personal protective equipment guidelines
  const ppeGuidelines = [
    {
      title: "Eye Protection",
      content: [
        "Wear safety glasses, goggles, or face shields as appropriate",
        "Safety eyewear must meet ANSI Z87.1 standard",
        "Contact lens wearers must also wear appropriate eye protection",
        "Clean eye protection regularly",
        "Replace damaged eye protection immediately",
      ],
    },
    {
      title: "Hand Protection",
      content: [
        "Select gloves appropriate for the hazard (chemical, thermal, etc.)",
        "Inspect gloves for damage before use",
        "Remove gloves before touching door handles, phones, etc.",
        "Dispose of contaminated gloves properly",
        "Wash hands after removing gloves",
      ],
    },
    {
      title: "Body Protection",
      content: [
        "Wear lab coats when working with hazardous materials",
        "Button or zip lab coats closed when in use",
        "Remove lab coats before leaving the laboratory",
        "Do not wear lab coats in eating areas",
        "Replace contaminated lab coats immediately",
      ],
    },
  ];

  // Hazard symbols with descriptions
  const hazardSymbols = [
    {
      name: "Flammable",
      description: "Materials that can easily ignite and burn rapidly",
      icon: <Waves className="text-red-500" />,
    },
    {
      name: "Corrosive",
      description: "Materials that can damage living tissue or corrode metals",
      icon: <Thermometer className="text-orange-500" />,
    },
    {
      name: "Toxic",
      description:
        "Materials that can cause harm or death if ingested, inhaled, or absorbed through skin",
      icon: <ShieldAlert className="text-purple-500" />,
    },
    {
      name: "Oxidizer",
      description: "Materials that can cause or intensify fire",
      icon: <AlertTriangle className="text-yellow-500" />,
    },
    {
      name: "Biohazard",
      description:
        "Materials that pose a threat to the health of living organisms",
      icon: <AlertTriangle className="text-green-500" />,
    },
  ];

  // Get the appropriate guidelines based on active category
  const getGuidelinesForCategory = () => {
    switch (activeCategory) {
      case "general":
        return generalGuidelines;
      case "chemical":
        return chemicalGuidelines;
      case "equipment":
        return equipmentGuidelines;
      case "emergency":
        return emergencyProcedures;
      case "ppe":
        return ppeGuidelines;
      default:
        return generalGuidelines;
    }
  };

  // Filter guidelines based on search query
  const filteredGuidelines = getGuidelinesForCategory().filter((guideline) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      guideline.title.toLowerCase().includes(lowerCaseQuery) ||
      guideline.content.some((item) =>
        item.toLowerCase().includes(lowerCaseQuery),
      )
    );
  });

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-2">
          Laboratory Safety Guidelines
        </h1>
        <p className="text-gray-500">
          Comprehensive safety information for laboratory operations and
          procedures
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r bg-gray-50 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search guidelines..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              CATEGORIES
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  className={`w-full justify-start ${activeCategory === category.id ? "" : "text-gray-700"}`}
                  onClick={() => onCategoryChange(category.id)}
                >
                  <div className="flex items-center">
                    <div className="mr-2">{category.icon}</div>
                    <span>{category.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              QUICK RESOURCES
            </h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Safety Data Sheets
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Training Materials
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700"
              >
                <Info className="mr-2 h-4 w-4" />
                Emergency Contacts
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs
            defaultValue="guidelines"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="border-b px-6 py-2">
              <TabsList>
                <TabsTrigger value="guidelines">
                  <Shield className="mr-2 h-4 w-4" />
                  Guidelines
                </TabsTrigger>
                <TabsTrigger value="hazard-symbols">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Hazard Symbols
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              <TabsContent value="guidelines" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    {categories.find((cat) => cat.id === activeCategory)?.icon}
                    {categories.find((cat) => cat.id === activeCategory)?.name}
                  </h2>

                  {searchQuery && (
                    <Badge variant="outline" className="mb-4">
                      Search results for "{searchQuery}"
                    </Badge>
                  )}

                  {filteredGuidelines.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No guidelines found matching your search.
                      </p>
                    </div>
                  ) : (
                    <Accordion type="multiple" className="space-y-4">
                      {filteredGuidelines.map((guideline, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gray-50">
                            <span className="font-medium">
                              {guideline.title}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-3">
                            <ul className="space-y-2">
                              {guideline.content.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-start gap-2"
                                >
                                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                    <Shield
                                      className="h-3 w-3 text-primary"
                                      strokeWidth={3}
                                    />
                                  </div>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="hazard-symbols" className="mt-0">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Hazard Symbols and Meanings
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Familiarize yourself with these common hazard symbols found
                    on chemical containers and equipment.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hazardSymbols.map((symbol, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-gray-100">
                              {symbol.icon}
                            </div>
                            <CardTitle className="text-lg">
                              {symbol.name}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{symbol.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;
