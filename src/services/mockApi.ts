
import { Transaction, Strain, Customer, ComplianceDoc, mockTransactions, mockStrains, mockCustomers, mockComplianceDocs } from "@/data/mockData";
import { TransactionFormData, StrainFormData } from "@/components/forms/schemas";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Transactions
  async getTransactions(business?: string): Promise<Transaction[]> {
    await delay(500);
    return business 
      ? mockTransactions.filter(t => t.business === business)
      : mockTransactions;
  },

  async addTransaction(data: TransactionFormData & { business: string }): Promise<Transaction> {
    await delay(300);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: data.date,
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      business: data.business as any,
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  async deleteTransaction(id: string): Promise<void> {
    await delay(300);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index > -1) {
      mockTransactions.splice(index, 1);
    }
  },

  // Strains
  async getStrains(): Promise<Strain[]> {
    await delay(400);
    return [...mockStrains];
  },

  async addStrain(data: StrainFormData): Promise<Strain> {
    await delay(300);
    const newStrain: Strain = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type,
      thcPercentage: data.thcPercentage,
      cbdPercentage: data.cbdPercentage,
      notes: data.notes,
      dateAdded: new Date(),
    };
    mockStrains.push(newStrain);
    return newStrain;
  },

  async deleteStrain(id: string): Promise<void> {
    await delay(300);
    const index = mockStrains.findIndex(s => s.id === id);
    if (index > -1) {
      mockStrains.splice(index, 1);
    }
  },

  // Customers
  async getCustomers(): Promise<Customer[]> {
    await delay(600);
    return [...mockCustomers];
  },

  async addCustomer(data: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrderDate' | 'status'>): Promise<Customer> {
    await delay(300);
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...data,
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date(),
      status: "Active",
    };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  // Compliance
  async getComplianceDocs(business?: string): Promise<ComplianceDoc[]> {
    await delay(500);
    return business 
      ? mockComplianceDocs.filter(doc => doc.business === business)
      : mockComplianceDocs;
  },

  async addComplianceDoc(data: Omit<ComplianceDoc, 'id'>): Promise<ComplianceDoc> {
    await delay(300);
    const newDoc: ComplianceDoc = {
      id: Date.now().toString(),
      ...data,
    };
    mockComplianceDocs.push(newDoc);
    return newDoc;
  },
};
