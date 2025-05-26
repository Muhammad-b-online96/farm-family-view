
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Cannabis, Fish, Sprout, TrendingUp, TrendingDown, Scale } from "lucide-react";
import { mockSummaryData, businessConfig } from "@/data/mockData";
import { Link } from "react-router-dom";
import { SummaryCard } from "@/components/dashboard/SummaryCard"; // Ensure this is imported

const businessIcons = {
  honey: Package,
  weed: Cannabis,
  fish: Fish,
  mushrooms: Sprout,
};

const GlobalDashboardPage = () => {
  const globalTotalSales = Object.values(mockSummaryData).reduce((sum, data) => sum + data.totalSales, 0);
  const globalTotalProfit = Object.values(mockSummaryData).reduce((sum, data) => sum + data.profit, 0);
  const globalTotalExpenses = globalTotalSales - globalTotalProfit;

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Global Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <SummaryCard
          title="Total Revenue"
          value={`$${globalTotalSales.toLocaleString()}`}
          icon={TrendingUp}
          accentColor="border-green-500"
        />
        <SummaryCard
          title="Total Profit"
          value={`$${globalTotalProfit.toLocaleString()}`}
          icon={Scale}
          accentColor="border-blue-500"
        />
        <SummaryCard
          title="Total Expenses"
          value={`$${globalTotalExpenses.toLocaleString()}`}
          icon={TrendingDown}
          accentColor="border-red-500"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Business Breakdown</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(mockSummaryData).map(([key, data]) => {
          const config = businessConfig[key as keyof typeof businessConfig];
          const Icon = businessIcons[key as keyof typeof businessIcons];
          return (
            <Link to={`/business/${key}`} key={key} className="hover:shadow-lg transition-shadow rounded-lg">
              <Card className={`border-l-4 border-business-${config.color}-DEFAULT`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{config.name}</CardTitle>
                  <Icon className={`h-5 w-5 text-business-${config.color}-DEFAULT`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${data.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Profit: ${data.profit.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
        {/* Placeholder for other global summaries or quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">View All Reports</h3>
                    <p className="text-sm text-muted-foreground">Access consolidated reports across all businesses.</p>
                </CardContent>
            </Card>
             <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove users from the system.</p>
                </CardContent>
            </Card>
             <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure global application settings.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default GlobalDashboardPage;
