
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Users, PlusCircle, MoreHorizontal, Mail, Building, ShoppingBag } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  lastOrderDate?: Date;
  totalSpent: number;
  status: 'Active' | 'Inactive' | 'Lead';
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', company: 'Doe Industries', lastOrderDate: new Date(2025, 4, 15), totalSpent: 1250.75, status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', company: 'Smith & Co.', lastOrderDate: new Date(2025, 3, 20), totalSpent: 850.00, status: 'Active' },
  { id: '3', name: 'Robert Johnson', email: 'rob.j@example.com', totalSpent: 0, status: 'Lead' },
  { id: '4', name: 'Emily White', email: 'emily.w@example.com', company: 'White Goods Inc.', lastOrderDate: new Date(2024, 11, 5), totalSpent: 2300.50, status: 'Inactive' },
  { id: '5', name: 'Michael Brown', email: 'michael.b@example.com', totalSpent: 500.20, status: 'Active', lastOrderDate: new Date(2025, 5, 1)}
];

const getStatusBadgeVariant = (status: Customer['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'Active': return 'default'; // Usually green or blue in themes
        case 'Inactive': return 'secondary'; // Gray
        case 'Lead': return 'outline'; // Can be styled further
        default: return 'default';
    }
}


const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Customers Management</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Company</TableHead>
                <TableHead className="hidden lg:table-cell">Last Order</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length > 0 ? customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{customer.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{customer.company || 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {customer.lastOrderDate ? customer.lastOrderDate.toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(customer.status)} 
                           className={
                             customer.status === 'Active' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                             customer.status === 'Lead' ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''
                           }>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.status === 'Active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.status === 'Lead').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (Active)</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${customers.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomersPage;
