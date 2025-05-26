
import React, { useState } from 'react';
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { Sprout, DollarSign, Package, PlusCircle, Thermometer } from "lucide-react"; // Added Thermometer
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { AddTransactionDialog } from "@/components/dialogs/AddTransactionDialog";
import { TransactionFormData } from "@/components/forms/schemas";

const MushroomsPage = () => {
  const config = businessConfig.mushrooms;
  const data = mockSummaryData.mushrooms;

  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({ title: '', type: 'income' as 'income' | 'expense' });

  const handleAddTransactionSubmit = (formData: TransactionFormData) => {
    console.log(`New ${formData.type} for Mushrooms submitted:`, formData);
  };

  const openDialog = (title: string, type: 'income' | 'expense') => {
    setDialogConfig({ title, type });
    setIsAddTransactionDialogOpen(true);
  };

  // Example extra data specific to mushrooms
  const mushroomsExtraData = {
    growingCycles: 3,
    averageHumidity: "85%",
  };

  return (
    <div className="space-y-8 p-1 md:p-0">
      <div className={`bg-business-mushrooms-light p-6 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-business-mushrooms-foreground flex items-center">
              <Sprout className="mr-3 h-8 w-8" /> {config.name} Dashboard
            </h1>
            <p className="text-business-mushrooms-foreground/80">Cultivate and manage your mushroom business.</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-business-mushrooms-DEFAULT text-business-mushrooms-DEFAULT hover:bg-business-mushrooms-DEFAULT hover:text-white"
              onClick={() => openDialog('Add Mushroom Sale', 'income')}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
            </Button>
            <Button 
              variant="outline" 
              className="border-business-mushrooms-DEFAULT text-business-mushrooms-DEFAULT hover:bg-business-mushrooms-DEFAULT hover:text-white"
              onClick={() => openDialog('Add Mushroom Expense', 'expense')}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
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
          title="Total Expenses" 
          value={`$${data.totalExpenses.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-mushrooms-DEFAULT"
        />
        <SummaryCard 
          title="Growing Cycles" 
          value={mushroomsExtraData.growingCycles} 
          icon={Thermometer} // Using Thermometer icon
          accentColor="border-business-mushrooms-DEFAULT"
          description={`Avg Humidity: ${mushroomsExtraData.averageHumidity}`}
        />
        <SummaryCard 
          title="Inventory Status" 
          value={data.inventoryStatus} 
          icon={Package} 
          accentColor="border-business-mushrooms-DEFAULT"
        />
      </div>
      
      <div className="flex flex-col items-center justify-center py-10 text-center bg-card rounded-lg shadow">
        <Sprout className="w-16 h-16 mb-4 text-business-mushrooms-DEFAULT" />
        <h2 className="text-2xl font-semibold mb-2 text-business-mushrooms-foreground">Mushroom Growth Insights</h2>
        <p className="text-md text-muted-foreground">Track yields, environmental conditions, and sales trends for your mushroom farm.</p>
      </div>

      <AddTransactionDialog
        open={isAddTransactionDialogOpen}
        onOpenChange={setIsAddTransactionDialogOpen}
        onSubmit={handleAddTransactionSubmit}
        dialogTitle={dialogConfig.title}
        defaultType={dialogConfig.type}
      />
    </div>
  );
};

export default MushroomsPage;
