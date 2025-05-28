
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Settings, Wrench, Edit, Trash2 } from 'lucide-react';
import { EquipmentItem, EquipmentStatus } from "@/data/mockData";
import { mockApi } from "@/services/mockApi";
import { useToast } from "@/hooks/use-toast";

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getEquipment();
      setEquipment(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load equipment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    
    try {
      await mockApi.deleteEquipment(id);
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
      loadEquipment();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete equipment",
        variant: "destructive",
      });
    }
  };

  const getEquipmentStatusColor = (status: EquipmentStatus) => {
    switch (status) {
      case 'Operational': return 'bg-green-500';
      case 'Maintenance': return 'bg-yellow-500';
      case 'Requires Repair': return 'bg-orange-500';
      case 'Decommissioned': return 'bg-gray-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Wrench className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Equipment & Assets</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Equipment
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Equipment Inventory</CardTitle>
          <CardDescription>Track and manage all your business equipment and assets.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Loading equipment...</p>
            </div>
          ) : equipment.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge className={`${getEquipmentStatusColor(item.status)} text-white`}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{item.purchaseDate.toLocaleDateString()}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastMaintenanceDate ? item.lastMaintenanceDate.toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteEquipment(item.id)}
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
              <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No equipment found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get started by adding new equipment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentPage;
