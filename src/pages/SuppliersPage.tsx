
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Truck, Star, Edit, Trash2 } from 'lucide-react';
import { Supplier } from "@/data/mockData";
import { mockApi } from "@/services/mockApi";
import { useToast } from "@/hooks/use-toast";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getSuppliers();
      setSuppliers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load suppliers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    
    try {
      await mockApi.deleteSupplier(id);
      toast({
        title: "Success",
        description: "Supplier deleted successfully",
      });
      loadSuppliers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete supplier",
        variant: "destructive",
      });
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Truck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Suppliers Management</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Supplier
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Supplier List</CardTitle>
          <CardDescription>Manage your business suppliers and their details.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Loading suppliers...</p>
            </div>
          ) : suppliers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product Category</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell><Badge variant="outline">{supplier.productCategory}</Badge></TableCell>
                    <TableCell>{supplier.lastOrderDate.toLocaleDateString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={`${getRatingColor(supplier.rating)} text-white`}>
                        {supplier.rating} <Star className="ml-1 h-3 w-3" />
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Truck className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No suppliers found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get started by adding a new supplier.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersPage;
