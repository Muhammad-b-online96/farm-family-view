
export type Business = "honey" | "weed" | "fish" | "mushrooms";

export interface SummaryData {
  totalSales: number;
  totalExpenses: number;
  profit: number;
  inventoryStatus: string;
}

export const mockSummaryData: Record<Business, SummaryData> = {
  honey: { totalSales: 12500, totalExpenses: 4500, profit: 8000, inventoryStatus: "Good" },
  weed: { totalSales: 25000, totalExpenses: 10000, profit: 15000, inventoryStatus: "Low Stock" },
  fish: { totalSales: 8000, totalExpenses: 3000, profit: 5000, inventoryStatus: "Sufficient" },
  mushrooms: { totalSales: 15000, totalExpenses: 6000, profit: 9000, inventoryStatus: "High Stock" },
};

export const mockSalesTrendData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

export const businessConfig = {
  honey: { name: "Honey", color: "amber", icon: "Package" },
  weed: { name: "Legal Weed", color: "emerald", icon: "Cannabis" },
  fish: { name: "Fish", color: "sky", icon: "Fish" },
  mushrooms: { name: "Exotic Mushrooms", color: "violet", icon: "Sprout" }, // Using Sprout as a placeholder for mushroom
};
