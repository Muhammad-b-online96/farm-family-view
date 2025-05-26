
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { SalesTrendChart } from "@/components/charts/SalesTrendChart";
import { Button } from "@/components/ui/button";
import { mockSummaryData, businessConfig } from "@/data/mockData";
import { DollarSign, Package, BarChart, PlusCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HoneyPage = () => {
  const honeyData = mockSummaryData.honey;
  const config = businessConfig.honey;

  return (
    <div className={`space-y-8 p-1 md:p-0`}>
      <div className={`bg-business-honey-light p-6 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-business-honey-foreground flex items-center">
              <Package className="mr-3 h-8 w-8" /> {config.name} Dashboard
            </h1>
            <p className="text-business-honey-foreground/80">Manage all aspects of your honey business.</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="border-business-honey-DEFAULT text-business-honey-DEFAULT hover:bg-business-honey-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
            </Button>
            <Button variant="outline" className="border-business-honey-DEFAULT text-business-honey-DEFAULT hover:bg-business-honey-DEFAULT hover:text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Sales" value={`$${honeyData.totalSales}`} icon={DollarSign} accentColor="border-business-honey-DEFAULT" />
        <SummaryCard title="Total Expenses" value={`$${honeyData.totalExpenses}`} icon={DollarSign} accentColor="border-business-honey-DEFAULT" />
        <SummaryCard title="Profit" value={`$${honeyData.profit}`} icon={BarChart} accentColor="border-business-honey-DEFAULT" />
        <SummaryCard title="Inventory Status" value={honeyData.inventoryStatus} icon={Package} accentColor="border-business-honey-DEFAULT" />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <SalesTrendChart lineColor="stroke-business-honey-DEFAULT" />
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No recent activity to display.</p>
                {/* Placeholder for recent activity feed */}
            </CardContent>
        </Card>
      </div>
       <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <Button className="w-full bg-business-honey-DEFAULT hover:bg-business-honey-DEFAULT/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Inventory
          </Button>
          <Button className="w-full bg-business-honey-DEFAULT hover:bg-business-honey-DEFAULT/90 text-white">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
           <Button className="w-full bg-business-honey-DEFAULT hover:bg-business-honey-DEFAULT/90 text-white">
            Manage Products
          </Button>
      </div>
    </div>
  );
};

export default HoneyPage;
