
export type Business = "honey" | "weed" | "fish" | "mushrooms";

export interface SummaryData {
  totalSales: number;
  totalExpenses: number;
  profit: number;
  inventoryStatus: string;
  inventoryValue: number;
}

export const mockSummaryData: Record<Business, SummaryData> = {
  honey: { totalSales: 12500, totalExpenses: 4500, profit: 8000, inventoryStatus: "Good", inventoryValue: 15000 },
  weed: { totalSales: 25000, totalExpenses: 10000, profit: 15000, inventoryStatus: "Low Stock", inventoryValue: 8000 },
  fish: { totalSales: 8000, totalExpenses: 3000, profit: 5000, inventoryStatus: "Sufficient", inventoryValue: 12000 },
  mushrooms: { totalSales: 15000, totalExpenses: 6000, profit: 9000, inventoryStatus: "High Stock", inventoryValue: 18000 },
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
  mushrooms: { name: "Exotic Mushrooms", color: "violet", icon: "Sprout" },
};

// Mock transactions data
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  business: Business;
}

export const mockTransactions: Transaction[] = [
  { id: "1", date: new Date(2025, 4, 15), description: "Honey jar sales", amount: 250, type: "income", category: "Sales", business: "honey" },
  { id: "2", date: new Date(2025, 4, 16), description: "Beekeeping supplies", amount: 80, type: "expense", category: "Equipment", business: "honey" },
  { id: "3", date: new Date(2025, 4, 17), description: "Weed dispensary sales", amount: 1200, type: "income", category: "Sales", business: "weed" },
  { id: "4", date: new Date(2025, 4, 18), description: "Growing nutrients", amount: 150, type: "expense", category: "Supplies", business: "weed" },
  { id: "5", date: new Date(2025, 4, 19), description: "Fish market sales", amount: 400, type: "income", category: "Sales", business: "fish" },
  { id: "6", date: new Date(2025, 4, 20), description: "Fish feed", amount: 120, type: "expense", category: "Feed", business: "fish" },
];

// Mock strains data
export interface Strain {
  id: string;
  name: string;
  type: "Indica" | "Sativa" | "Hybrid";
  thcPercentage?: number;
  cbdPercentage?: number;
  notes?: string;
  dateAdded: Date;
}

export const mockStrains: Strain[] = [
  { id: "1", name: "Blue Dream", type: "Hybrid", thcPercentage: 22, cbdPercentage: 1, notes: "Popular strain with balanced effects", dateAdded: new Date(2025, 3, 10) },
  { id: "2", name: "OG Kush", type: "Indica", thcPercentage: 25, cbdPercentage: 0.5, notes: "Classic indica with strong effects", dateAdded: new Date(2025, 3, 15) },
  { id: "3", name: "Sour Diesel", type: "Sativa", thcPercentage: 20, cbdPercentage: 1.2, notes: "Energizing sativa strain", dateAdded: new Date(2025, 4, 1) },
];

// Mock customers data
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  status: "Active" | "Inactive";
}

export const mockCustomers: Customer[] = [
  { id: "1", name: "John Smith", email: "john@example.com", phone: "555-0101", totalOrders: 15, totalSpent: 1250, lastOrderDate: new Date(2025, 4, 20), status: "Active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", phone: "555-0102", totalOrders: 8, totalSpent: 680, lastOrderDate: new Date(2025, 4, 18), status: "Active" },
  { id: "3", name: "Mike Wilson", email: "mike@example.com", phone: "555-0103", totalOrders: 22, totalSpent: 2100, lastOrderDate: new Date(2025, 4, 22), status: "Active" },
  { id: "4", name: "Lisa Brown", email: "lisa@example.com", phone: "555-0104", totalOrders: 5, totalSpent: 320, lastOrderDate: new Date(2025, 3, 15), status: "Inactive" },
];

// Mock compliance documents
export interface ComplianceDoc {
  id: string;
  title: string;
  type: "License" | "Certificate" | "Permit" | "Report";
  status: "Valid" | "Expiring Soon" | "Expired" | "Pending";
  expiryDate: Date;
  business: Business;
  description?: string;
}

export const mockComplianceDocs: ComplianceDoc[] = [
  { id: "1", title: "Beekeeping License", type: "License", status: "Valid", expiryDate: new Date(2026, 2, 15), business: "honey", description: "State beekeeping operation license" },
  { id: "2", title: "Cannabis Cultivation License", type: "License", status: "Expiring Soon", expiryDate: new Date(2025, 6, 30), business: "weed", description: "Legal cannabis cultivation permit" },
  { id: "3", title: "Aquaculture Permit", type: "Permit", status: "Valid", expiryDate: new Date(2026, 8, 10), business: "fish", description: "Fish farming operation permit" },
  { id: "4", title: "Food Safety Certificate", type: "Certificate", status: "Valid", expiryDate: new Date(2025, 11, 20), business: "mushrooms", description: "Food safety handling certification" },
];

// Mock suppliers data
export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  productCategory: string;
  lastOrderDate: Date;
  rating: number;
}

export const mockSuppliers: Supplier[] = [
  { id: 'sup1', name: 'Organic Farms Co.', contactPerson: 'Alice Green', email: 'alice@organicfarms.com', phone: '555-0101', productCategory: 'Produce', lastOrderDate: new Date(2025, 4, 15), rating: 5 },
  { id: 'sup2', name: 'Apiary Supplies Ltd.', contactPerson: 'Bob Honeycomb', email: 'bob@apiarysupplies.com', phone: '555-0102', productCategory: 'Beekeeping Gear', lastOrderDate: new Date(2025, 4, 20), rating: 4 },
  { id: 'sup3', name: 'Aqua World Inc.', contactPerson: 'Carol Waters', email: 'carol@aquaworld.com', phone: '555-0103', productCategory: 'Aquarium Tech', lastOrderDate: new Date(2025, 3, 30), rating: 4 },
  { id: 'sup4', name: 'MycoGrow Solutions', contactPerson: 'David Spore', email: 'david@mycogrow.com', phone: '555-0104', productCategory: 'Mushroom Cultivation', lastOrderDate: new Date(2025, 4, 10), rating: 5 },
  { id: 'sup5', name: 'GreenLeaf Packaging', contactPerson: 'Eve Budson', email: 'eve@greenleafpack.com', phone: '555-0105', productCategory: 'Packaging', lastOrderDate: new Date(2025, 4, 1), rating: 3 },
];

// Mock equipment data
export type EquipmentStatus = 'Operational' | 'Maintenance' | 'Decommissioned' | 'Requires Repair';

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  purchaseDate: Date;
  status: EquipmentStatus;
  location: string;
  assignedTo?: string;
  lastMaintenanceDate?: Date;
}

export const mockEquipment: EquipmentItem[] = [
  { id: 'eq1', name: 'Honey Extractor HXT-5000', type: 'Processing', purchaseDate: new Date(2023, 2, 15), status: 'Operational', location: 'Honey House A', assignedTo: 'Honey Team', lastMaintenanceDate: new Date(2025, 2, 1) },
  { id: 'eq2', name: 'Cannabis Trimmer CT-Deluxe', type: 'Cultivation', purchaseDate: new Date(2024, 0, 20), status: 'Maintenance', location: 'Weed Grow Room 3', lastMaintenanceDate: new Date(2025, 4, 10) },
  { id: 'eq3', name: 'Fish Tank System FTS-10', type: 'Aquaculture', purchaseDate: new Date(2022, 10, 5), status: 'Operational', location: 'Fish Farm Tank Bay 1', assignedTo: 'Fish Team' },
  { id: 'eq4', name: 'Mushroom Humidifier MH-Pro', type: 'Cultivation', purchaseDate: new Date(2023, 7, 10), status: 'Requires Repair', location: 'Mushroom Grow Tent 2', assignedTo: 'Mushroom Team', lastMaintenanceDate: new Date(2024, 11, 15) },
  { id: 'eq5', name: 'Delivery Van DV-01', type: 'Logistics', purchaseDate: new Date(2022, 4, 1), status: 'Operational', location: 'Garage', assignedTo: 'Logistics Dept', lastMaintenanceDate: new Date(2025, 3, 20) },
  { id: 'eq6', name: 'Industrial Scale IS-100kg', type: 'General Use', purchaseDate: new Date(2024, 1, 1), status: 'Decommissioned', location: 'Storage Unit B' },
];

// Mock tasks data
export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: Date;
  status: 'To Do' | 'In Progress' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
}

export const mockTasks: Task[] = [
  { id: '1', title: 'Prepare Q3 Report', assignee: 'Alice Wonderland', dueDate: new Date(2025, 6, 15), status: 'In Progress', priority: 'High' },
  { id: '2', title: 'Update Supplier Contacts', assignee: 'Bob The Builder', dueDate: new Date(2025, 6, 10), status: 'To Do', priority: 'Medium' },
  { id: '3', title: 'Client Follow-up Calls', assignee: 'Charlie Brown', dueDate: new Date(2025, 6, 5), status: 'Done', priority: 'Medium' },
  { id: '4', title: 'Inventory Check - Honey Jars', assignee: 'Diana Prince', dueDate: new Date(2025, 6, 20), status: 'To Do', priority: 'High', description: 'Count all honey jar SKUs in warehouse B.' },
  { id: '5', title: 'Website Maintenance', assignee: 'Edward Scissorhands', dueDate: new Date(2025, 6, 12), status: 'Blocked', priority: 'Low', description: 'Waiting for server access.' },
];
