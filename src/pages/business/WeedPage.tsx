
import React, { useState, useEffect } from 'react';
import { businessConfig, mockSummaryData } from "@/data/mockData";
import { Cannabis, DollarSign, Package, Weight, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { AddTransactionDialog } from "@/components/dialogs/AddTransactionDialog";
import { AddStrainDialog } from "@/components/dialogs/AddStrainDialog";
import { TransactionFormData, StrainFormData } from "@/components/forms/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockApi } from "@/services/mockApi";
import { Transaction, Strain } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const WeedPage = () => {
  const config = businessConfig.weed;
  const data = mockSummaryData.weed;

  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [isAddStrainDialogOpen, setIsAddStrainDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [transactionData, strainData] = await Promise.all([
        mockApi.getTransactions('weed'),
        mockApi.getStrains()
      ]);
      setTransactions(transactionData);
      setStrains(strainData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransactionSubmit = async (formData: TransactionFormData) => {
    try {
      await mockApi.addTransaction({ ...formData, business: 'weed' });
      toast({
        title: "Success",
        description: "Transaction added successfully",
      });
      loadData(); // Reload data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction",
        variant: "destructive",
      });
    }
  };

  const handleAddStrainSubmit = async (formData: StrainFormData) => {
    try {
      await mockApi.addStrain(formData);
      toast({
        title: "Success",
        description: "Strain added successfully",
      });
      loadData(); // Reload data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add strain",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await mockApi.deleteTransaction(id);
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        variant: "destructive",
      });
    }
  };

  const weedExtraData = {
    currentStockKg: 120,
    averageRating: 4.7,
    activeStrains: strains.length,
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
            <Button 
              variant="outline" 
              className="border-business-weed-DEFAULT text-business-weed-DEFAULT hover:bg-business-weed-DEFAULT hover:text-white"
              onClick={() => setIsAddTransactionDialogOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
            <Button 
              variant="outline" 
              className="border-business-weed-DEFAULT text-business-weed-DEFAULT hover:bg-business-weed-DEFAULT hover:text-white"
              onClick={() => setIsAddStrainDialogOpen(true)}
            >
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

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 5).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </TableCell>
                    <TableCell>{transaction.category || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No transactions found</p>
          )}
        </CardContent>
      </Card>

      {/* Strain Library */}
      <Card>
        <CardHeader>
          <CardTitle>Strain Library</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading strains...</p>
          ) : strains.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {strains.map((strain) => (
                <Card key={strain.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{strain.name}</h3>
                      <Badge variant="outline">{strain.type}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {strain.thcPercentage && (
                        <p>THC: {strain.thcPercentage}%</p>
                      )}
                      {strain.cbdPercentage && (
                        <p>CBD: {strain.cbdPercentage}%</p>
                      )}
                      {strain.notes && (
                        <p className="text-xs mt-2">{strain.notes}</p>
                      )}
                      <p className="text-xs">Added: {strain.dateAdded.toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No strains found</p>
          )}
        </CardContent>
      </Card>

      <AddTransactionDialog
        open={isAddTransactionDialogOpen}
        onOpenChange={setIsAddTransactionDialogOpen}
        onSubmit={handleAddTransactionSubmit}
        dialogTitle="Add Weed Transaction"
        defaultType="income"
      />

      <AddStrainDialog
        open={isAddStrainDialogOpen}
        onOpenChange={setIsAddStrainDialogOpen}
        onSubmit={handleAddStrainSubmit}
      />
    </div>
  );
};

export default WeedPage;
