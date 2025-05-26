
import React, { useState } from 'react';
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { Package, DollarSign, PlusCircle, Sprout, Box } from "lucide-react"; // Added Box for Inventory
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { AddTransactionDialog } from "@/components/dialogs/AddTransactionDialog";
import { TransactionFormData } from "@/components/forms/schemas";

const HoneyPage = () => {
  const config = businessConfig.honey;
  const data = mockSummaryData.honey;

  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({ title: '', type: 'income' as 'income' | 'expense' });

  const handleAddTransactionSubmit = (formData: TransactionFormData) => {
    console.log(`New ${formData.type} for Honey submitted:`, formData);
  };

  const openDialog = (title: string, type: 'income' | 'expense') => {
    setDialogConfig({ title, type });
    setIsAddTransactionDialogOpen(true);
  };
  
  // Example extra data specific to honey
  const honeyExtraData = {
    honeyTypes: 5,
    currentStockKg: data.inventoryValue / 10, // Assuming average price $10/kg for placeholder
  };

  return (
    <div className="space-y-8 p-1 md:p-0">
      <div className={`bg-business-honey-light p-6 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-business-honey-foreground flex items-center">
              <Sprout className="mr-3 h-8 w-8" /> {config.name} Dashboard
            </h1>
            <p className="text-business-honey-foreground/80">Manage your honey production and sales.</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-business-honey-DEFAULT text-business-honey-DEFAULT hover:bg-business-honey-DEFAULT hover:text-white"
              onClick={() => openDialog('Add Honey Sale', 'income')}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
            </Button>
            <Button 
              variant="outline" 
              className="border-business-honey-DEFAULT text-business-honey-DEFAULT hover:bg-business-honey-DEFAULT hover:text-white"
              onClick={() => openDialog('Add Honey Expense', 'expense')}
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
          accentColor="border-business-honey-DEFAULT"
          description={`Profit: $${data.profit.toLocaleString()}`}
        />
        <SummaryCard 
          title="Total Expenses" 
          value={`$${data.totalExpenses.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-honey-DEFAULT"
        />
        <SummaryCard 
          title="Inventory Value" 
          value={`$${data.inventoryValue.toLocaleString()}`} 
          icon={Box} // Changed to Box icon
          accentColor="border-business-honey-DEFAULT"
          description={`${honeyExtraData.currentStockKg.toFixed(1)} kg stock`}
        />
        <SummaryCard 
          title="Honey Types" 
          value={honeyExtraData.honeyTypes} 
          icon={Package}
          accentColor="border-business-honey-DEFAULT"
        />
      </div>
      
      <div className="flex flex-col items-center justify-center py-10 text-center bg-card rounded-lg shadow">
        <Sprout className="w-16 h-16 mb-4 text-business-honey-DEFAULT" />
        <h2 className="text-2xl font-semibold mb-2 text-business-honey-foreground">Honey Analytics Area</h2>
        <p className="text-md text-muted-foreground">Detailed charts and data for honey business operations will appear here.</p>
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

export default HoneyPage;
