
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { FishIcon, DollarSign, Package, BarChart, Droplets } from "lucide-react"; // Added Droplets
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SummaryCard } from "@/components/dashboard/SummaryCard"; // Import SummaryCard

const FishPage = () => {
  const config = businessConfig.fish;
  const data = mockSummaryData.fish;

  // Add some more mock data specific to fish business
  const fishExtraData = {
    activeTanks: 25,
    waterQuality: "Optimal",
    totalHarvestTonnes: 5.2,
  };

  return (
    <div className="space-y-8 p-1 md:p-0">
       <div className={`bg-business-fish-light p-6 rounded-lg shadow`}>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-business-fish-foreground flex items-center">
                <FishIcon className="mr-3 h-8 w-8" /> {config.name} Dashboard
                </h1>
                <p className="text-business-fish-foreground/80">Oversee your fish business operations.</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="border-business-fish-DEFAULT text-business-fish-DEFAULT hover:bg-business-fish-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Catch Log
            </Button>
            <Button variant="outline" className="border-business-fish-DEFAULT text-business-fish-DEFAULT hover:bg-business-fish-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Monitor Tanks
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Sales" 
          value={`$${data.totalSales.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-fish-DEFAULT"
          description={`Profit: $${data.profit.toLocaleString()}`}
        />
        <SummaryCard 
          title="Total Harvest" 
          value={`${fishExtraData.totalHarvestTonnes} Tonnes`} 
          icon={FishIcon} 
          accentColor="border-business-fish-DEFAULT"
        />
        <SummaryCard 
          title="Active Tanks" 
          value={`${fishExtraData.activeTanks}`} 
          icon={Package} // Could use a more specific icon like 'Layers' or 'Database' if available for tanks
          accentColor="border-business-fish-DEFAULT"
          description={`Water Quality: ${fishExtraData.waterQuality}`}
        />
        <SummaryCard 
          title="Water Quality Index" 
          value={fishExtraData.waterQuality} 
          icon={Droplets} 
          accentColor="border-business-fish-DEFAULT"
        />
      </div>

      {/* Placeholder for more detailed charts or tables */}
      <div className="flex flex-col items-center justify-center py-10 text-center bg-card rounded-lg shadow">
        <FishIcon className="w-16 h-16 mb-4 text-business-fish-DEFAULT" />
        <h2 className="text-2xl font-semibold mb-2 text-business-fish-foreground">Detailed Analytics Coming Soon</h2>
        <p className="text-md text-muted-foreground">Further breakdowns and charts for the {config.name} business will be available here.</p>
      </div>
    </div>
  );
};
export default FishPage;
