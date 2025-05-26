
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { FishIcon } from "lucide-react"; // Corrected import
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const FishPage = () => {
  const config = businessConfig.fish;
  const data = mockSummaryData.fish;
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
              <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
            </Button>
            <Button variant="outline" className="border-business-fish-DEFAULT text-business-fish-DEFAULT hover:bg-business-fish-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
        <FishIcon className="w-24 h-24 mb-6 text-business-fish-DEFAULT" />
        <h2 className="text-4xl font-bold mb-2 text-business-fish-foreground">{config.name}</h2>
        <p className="text-xl text-muted-foreground">Dashboard coming soon!</p>
        <p className="mt-2">Total Sales: ${data.totalSales.toLocaleString()}</p>
      </div>
    </div>
  );
};
export default FishPage;
