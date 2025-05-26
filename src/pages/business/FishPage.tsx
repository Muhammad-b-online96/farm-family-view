
import React, { useState } from 'react';
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { Fish as FishIcon, DollarSign, Package, PlusCircle, Waves } from "lucide-react"; // Added Waves
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { AddTransactionDialog } from "@/components/dialogs/AddTransactionDialog";
import { TransactionFormData } from "@/components/forms/schemas";

const FishPage = () => {
  const config = businessConfig.fish;
  const data = mockSummaryData.fish;

  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({ title: '', type: 'income' as 'income' | 'expense' });

  const handleAddTransactionSubmit = (formData: TransactionFormData) => {
    console.log(`New ${formData.type} for Fish submitted:`, formData);
  };

  const openDialog = (title: string, type: 'income' | 'expense') => {
    setDialogConfig({ title, type });
    setIsAddTransactionDialogOpen(true);
  };

  // Example extra data specific to fish
  const fishExtraData = {
    activeTanks: 8,
    fishSpecies: 12,
  };

  return (
    <div className="space-y-8 p-1 md:p-0">
      <div className={`bg-business-fish-light p-6 rounded-lg shadow`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-business-fish-foreground flex items-center">
              <FishIcon className="mr-3 h-8 w-8" /> {config.name} Dashboard
            </h1>
            <p className="text-business-fish-foreground/80">Oversee your fish farming operations.</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-business-fish-DEFAULT text-business-fish-DEFAULT hover:bg-business-fish-DEFAULT hover:text-white"
              onClick={() => openDialog('Add Fish Sale', 'income')}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
            </Button>
             <Button 
              variant="outline" 
              className="border-business-fish-DEFAULT text-business-fish-DEFAULT hover:bg-business-fish-DEFAULT hover:text-white"
              onClick={() => openDialog('Add Fish Expense', 'expense')}
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
          accentColor="border-business-fish-DEFAULT"
          description={`Profit: $${data.profit.toLocaleString()}`}
        />
        <SummaryCard 
          title="Total Expenses" 
          value={`$${data.totalExpenses.toLocaleString()}`} 
          icon={DollarSign} 
          accentColor="border-business-fish-DEFAULT"
        />
        <SummaryCard 
          title="Active Tanks" 
          value={fishExtraData.activeTanks} 
          icon={Waves} // Using Waves icon
          accentColor="border-business-fish-DEFAULT"
          description={`${fishExtraData.fishSpecies} species`}
        />
        <SummaryCard 
          title="Inventory Status" 
          value={data.inventoryStatus} 
          icon={Package} 
          accentColor="border-business-fish-DEFAULT"
        />
      </div>
      
      <div className="flex flex-col items-center justify-center py-10 text-center bg-card rounded-lg shadow">
        <FishIcon className="w-16 h-16 mb-4 text-business-fish-DEFAULT" />
        <h2 className="text-2xl font-semibold mb-2 text-business-fish-foreground">Fish Farm Analytics</h2>
        <p className="text-md text-muted-foreground">Detailed reports and real-time data from your fish farm will be displayed here.</p>
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

export default FishPage;
