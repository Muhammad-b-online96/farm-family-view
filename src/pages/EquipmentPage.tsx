
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Settings, Wrench } from 'lucide-react';

type EquipmentStatus = 'Operational' | 'Maintenance' | 'Decommissioned' | 'Requires Repair';

interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  purchaseDate: string; // Should be Date
  status: EquipmentStatus;
  location: string;
  assignedTo?: string;
  lastMaintenanceDate?: string; // Should be Date
}

const mockEquipment: EquipmentItem[] = [
  { id: 'eq1', name: 'Honey Extractor HXT-5000', type: 'Processing', purchaseDate: '2023-03-15', status: 'Operational', location: 'Honey House A', assignedTo: 'Honey Team', lastMaintenanceDate: '2025-03-01' },
  { id: 'eq2', name: 'Cannabis Trimmer CT-Deluxe', type: 'Cultivation', purchaseDate: '2024-01-20', status: 'Maintenance', location: 'Weed Grow Room 3', lastMaintenanceDate: '2025-05-10' },
  { id: 'eq3', name: 'Fish Tank System FTS-10', type: 'Aquaculture', purchaseDate: '2022-11-05', status: 'Operational', location: 'Fish Farm Tank Bay 1', assignedTo: 'Fish Team' },
  { id: 'eq4', name: 'Mushroom Humidifier MH-Pro', type: 'Cultivation', purchaseDate: '2023-08-10', status: 'Requires Repair', location: 'Mushroom Grow Tent 2', assignedTo: 'Mushroom Team', lastMaintenanceDate: '2024-12-15' },
  { id: 'eq5', name: 'Delivery Van DV-01', type: 'Logistics', purchaseDate: '2022-05-01', status: 'Operational', location: 'Garage', assignedTo: 'Logistics Dept', lastMaintenanceDate: '2025-04-20' },
  { id: 'eq6', name: 'Industrial Scale IS-100kg', type: 'General Use', purchaseDate: '2024-02-01', status: 'Decommissioned', location: 'Storage Unit B' },
];

const getEquipmentStatusColor = (status: EquipmentStatus) => {
  switch (status) {
    case 'Operational': return 'bg-green-500';
    case 'Maintenance': return 'bg-yellow-500';
    case 'Requires Repair': return 'bg-orange-500';
    case 'Decommissioned': return 'bg-gray-500';
    default: return 'bg-slate-400';
  }
};

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(mockEquipment);

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
          {equipment.length > 0 ? (
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
                    <TableCell>{new Date(item.purchaseDate).toLocaleDateString()}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastMaintenanceDate ? new Date(item.lastMaintenanceDate).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
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
