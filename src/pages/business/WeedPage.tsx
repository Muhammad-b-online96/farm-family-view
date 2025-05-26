
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { Cannabis, DollarSign, Package, BarChart, Weight } from "lucide-react"; // Added Weight
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SummaryCard } from "@/components/dashboard/SummaryCard"; // Import SummaryCard

const WeedPage = () => {
  const config = businessConfig.weed;
  const data = mockSummaryData.weed;

  // Add some more mock data specific to weed business
  const weedExtraData = {
    currentStockKg: 120, // in kilograms
    averageRating: 4.7, // out of 5
    activeStrains: 15,
  };

  return (
    <div className="space-y-8 p-1 md:p-0">
       <div className={`bg-business-weed-light p-6 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-business-weed-foreground flex items-center">
                <Cannabis className="mr-3 h-8 w-8" /> {config.name} Dashboard
                </h1>
                <p className="text-business-weed-foreground/80">Manage your legal weed business.</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="border-business-weed-DEFAULT text-business-weed-DEFAULT hover:bg-business-weed-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
            </Button>
            <Button variant="outline" className="border-business-weed-DEFAULT text-business-weed-DEFAULT hover:bg-business-weed-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Strain
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Sales" 
          value={`$${data.totalSales.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-weed-DEFAULT"
          description={`Profit: $${data.profit.toLocaleString()}`}
        />
        <SummaryCard 
          title="Total Expenses" 
          value={`$${data.totalExpenses.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-weed-DEFAULT"
        />
        <SummaryCard 
          title="Current Stock" 
          value={`${weedExtraData.currentStockKg} kg`} 
          icon={Weight} 
          accentColor="border-business-weed-DEFAULT"
          description={`${weedExtraData.activeStrains} active strains`}
        />
        <SummaryCard 
          title="Inventory Status" 
          value={data.inventoryStatus} 
          icon={Package} 
          accentColor="border-business-weed-DEFAULT"
        />
      </div>
      
      {/* Placeholder for more detailed charts or tables */}
      <div className="flex flex-col items-center justify-center py-10 text-center bg-card rounded-lg shadow">
        <Cannabis className="w-16 h-16 mb-4 text-business-weed-DEFAULT" />
        <h2 className="text-2xl font-semibold mb-2 text-business-weed-foreground">Detailed Analytics Coming Soon</h2>
        <p className="text-md text-muted-foreground">Further breakdowns and charts for the {config.name} business will be available here.</p>
      </div>
    </div>
  );
};
export default WeedPage;
