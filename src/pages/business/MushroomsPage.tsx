
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { Sprout, DollarSign, Package, BarChart, Thermometer } from "lucide-react"; // Added Thermometer
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SummaryCard } from "@/components/dashboard/SummaryCard"; // Import SummaryCard

const MushroomsPage = () => {
  const config = businessConfig.mushrooms;
  const data = mockSummaryData.mushrooms;

  // Add some more mock data specific to mushrooms business
  const mushroomsExtraData = {
    activeCultures: 30,
    humidityLevel: "85%",
    temperature: "22°C",
    yieldPerSqMeter: "2.5 kg",
  };

  return (
    <div className="space-y-8 p-1 md:p-0">
       <div className={`bg-business-mushrooms-light p-6 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-business-mushrooms-foreground flex items-center">
                <Sprout className="mr-3 h-8 w-8" /> {config.name} Dashboard
                </h1>
                <p className="text-business-mushrooms-foreground/80">Manage your exotic mushrooms venture.</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="border-business-mushrooms-DEFAULT text-business-mushrooms-DEFAULT hover:bg-business-mushrooms-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Harvest
            </Button>
            <Button variant="outline" className="border-business-mushrooms-DEFAULT text-business-mushrooms-DEFAULT hover:bg-business-mushrooms-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Check Cultures
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Sales" 
          value={`$${data.totalSales.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-mushrooms-DEFAULT"
          description={`Profit: $${data.profit.toLocaleString()}`}
        />
        <SummaryCard 
          title="Yield/sq.m" 
          value={mushroomsExtraData.yieldPerSqMeter} 
          icon={Sprout} 
          accentColor="border-business-mushrooms-DEFAULT"
        />
        <SummaryCard 
          title="Active Cultures" 
          value={`${mushroomsExtraData.activeCultures}`} 
          icon={Package} 
          accentColor="border-business-mushrooms-DEFAULT"
        />
        <SummaryCard 
          title="Environment" 
          value={`${mushroomsExtraData.temperature} / ${mushroomsExtraData.humidityLevel}`} 
          icon={Thermometer} 
          accentColor="border-business-mushrooms-DEFAULT"
          description="Temp / Humidity"
        />
      </div>
      
      {/* Placeholder for more detailed charts or tables */}
      <div className="flex flex-col items-center justify-center py-10 text-center bg-card rounded-lg shadow">
        <Sprout className="w-16 h-16 mb-4 text-business-mushrooms-DEFAULT" />
        <h2 className="text-2xl font-semibold mb-2 text-business-mushrooms-foreground">Detailed Analytics Coming Soon</h2>
        <p className="text-md text-muted-foreground">Further breakdowns and charts for the {config.name} business will be available here.</p>
      </div>
    </div>
  );
};
export default MushroomsPage;
