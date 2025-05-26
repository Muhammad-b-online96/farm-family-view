
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FilePieChart, Download, Users, Package, DollarSign, ShieldCheck, Truck } from 'lucide-react';
// Assuming SalesTrendChart is a generic component we can reuse or adapt
// import { SalesTrendChart } from "@/components/charts/SalesTrendChart"; 
// For now, we will just use placeholder content for charts.

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  actionText: string;
  onAction: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon: Icon, actionText, onAction }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {/* Placeholder for a small chart or key metrics */}
        <div className="h-20 bg-muted/50 rounded-md flex items-center justify-center text-sm text-muted-foreground my-4">
          Chart / Key Metrics Area
        </div>
        <Button onClick={onAction} className="w-full">
          <Download className="mr-2 h-4 w-4" /> {actionText}
        </Button>
      </CardContent>
    </Card>
  );
};

const ReportingPage = () => {
  const handleGenerateReport = (reportName: string) => {
    // In a real app, this would trigger report generation logic
    alert(`Generating ${reportName}... (This is a placeholder action)`);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <FilePieChart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Reporting & Export</h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Generate and download various business reports.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ReportCard
            title="Sales Performance"
            description="Detailed breakdown of sales across products, regions, and time periods."
            icon={DollarSign}
            actionText="Generate Sales Report"
            onAction={() => handleGenerateReport('Sales Performance Report')}
          />
          <ReportCard
            title="Inventory Summary"
            description="Current stock levels, valuation, and turnover rates for all inventory items."
            icon={Package}
            actionText="Generate Inventory Report"
            onAction={() => handleGenerateReport('Inventory Summary Report')}
          />
          <ReportCard
            title="Customer Insights"
            description="Analysis of customer demographics, purchasing behavior, and lifetime value."
            icon={Users}
            actionText="Generate Customer Report"
            onAction={() => handleGenerateReport('Customer Insights Report')}
          />
          <ReportCard
            title="Expense Analysis"
            description="Track expenses by category, department, and trends over time."
            icon={BarChart3} // Using BarChart3 as a more general finance icon
            actionText="Generate Expense Report"
            onAction={() => handleGenerateReport('Expense Analysis Report')}
          />
           <ReportCard
            title="Compliance Status"
            description="Overview of all compliance documents, their statuses, and upcoming deadlines."
            icon={ShieldCheck}
            actionText="Generate Compliance Report"
            onAction={() => handleGenerateReport('Compliance Status Report')}
          />
           <ReportCard
            title="Supplier Performance"
            description="Review supplier ratings, order history, and lead times."
            icon={Truck}
            actionText="Generate Supplier Report"
            onAction={() => handleGenerateReport('Supplier Performance Report')}
          />
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Custom Report Builder (Coming Soon)</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
            <FilePieChart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
                Functionality to build and save custom report templates will be available here in the future.
            </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default ReportingPage;
