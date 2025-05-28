import { Transaction, Strain, Customer, ComplianceDoc, Supplier, EquipmentItem, Task, mockTransactions, mockStrains, mockCustomers, mockComplianceDocs, mockSuppliers, mockEquipment, mockTasks } from "@/data/mockData";
import { TransactionFormData, StrainFormData } from "@/components/forms/schemas";
import { CustomerFormData } from "@/components/forms/CustomerForm";
import { SupplierFormData } from "@/components/forms/SupplierForm";
import { EquipmentFormData } from "@/components/forms/EquipmentForm";

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

  async updateTransaction(id: string, data: Partial<TransactionFormData>): Promise<Transaction> {
    await delay(300);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index > -1) {
      mockTransactions[index] = { ...mockTransactions[index], ...data };
      return mockTransactions[index];
    }
    throw new Error('Transaction not found');
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

  async updateStrain(id: string, data: Partial<StrainFormData>): Promise<Strain> {
    await delay(300);
    const index = mockStrains.findIndex(s => s.id === id);
    if (index > -1) {
      mockStrains[index] = { ...mockStrains[index], ...data };
      return mockStrains[index];
    }
    throw new Error('Strain not found');
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

  async addCustomer(data: CustomerFormData): Promise<Customer> {
    await delay(300);
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      status: data.status || 'Active',
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date(),
    };
    mockCustomers.push(newCustomer);
    return newCustomer;
  },

  async updateCustomer(id: string, data: Partial<CustomerFormData>): Promise<Customer> {
    await delay(300);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index > -1) {
      mockCustomers[index] = { ...mockCustomers[index], ...data };
      return mockCustomers[index];
    }
    throw new Error('Customer not found');
  },

  async deleteCustomer(id: string): Promise<void> {
    await delay(300);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index > -1) {
      mockCustomers.splice(index, 1);
    }
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

  async updateComplianceDoc(id: string, data: Partial<ComplianceDoc>): Promise<ComplianceDoc> {
    await delay(300);
    const index = mockComplianceDocs.findIndex(d => d.id === id);
    if (index > -1) {
      mockComplianceDocs[index] = { ...mockComplianceDocs[index], ...data };
      return mockComplianceDocs[index];
    }
    throw new Error('Compliance document not found');
  },

  async deleteComplianceDoc(id: string): Promise<void> {
    await delay(300);
    const index = mockComplianceDocs.findIndex(d => d.id === id);
    if (index > -1) {
      mockComplianceDocs.splice(index, 1);
    }
  },

  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    await delay(500);
    return [...mockSuppliers];
  },

  async addSupplier(data: SupplierFormData): Promise<Supplier> {
    await delay(300);
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: data.name || '',
      contactPerson: data.contactPerson || '',
      email: data.email || '',
      phone: data.phone || '',
      productCategory: data.productCategory || '',
      rating: data.rating || 5,
      lastOrderDate: new Date(),
    };
    mockSuppliers.push(newSupplier);
    return newSupplier;
  },

  async updateSupplier(id: string, data: Partial<SupplierFormData>): Promise<Supplier> {
    await delay(300);
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index > -1) {
      mockSuppliers[index] = { ...mockSuppliers[index], ...data };
      return mockSuppliers[index];
    }
    throw new Error('Supplier not found');
  },

  async deleteSupplier(id: string): Promise<void> {
    await delay(300);
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index > -1) {
      mockSuppliers.splice(index, 1);
    }
  },

  // Equipment
  async getEquipment(): Promise<EquipmentItem[]> {
    await delay(500);
    return [...mockEquipment];
  },

  async addEquipment(data: EquipmentFormData): Promise<EquipmentItem> {
    await delay(300);
    const newEquipment: EquipmentItem = {
      id: Date.now().toString(),
      name: data.name || '',
      type: data.type || '',
      status: data.status || 'Operational',
      location: data.location || '',
      assignedTo: data.assignedTo || undefined,
      purchaseDate: new Date(),
    };
    mockEquipment.push(newEquipment);
    return newEquipment;
  },

  async updateEquipment(id: string, data: Partial<EquipmentFormData>): Promise<EquipmentItem> {
    await delay(300);
    const index = mockEquipment.findIndex(e => e.id === id);
    if (index > -1) {
      mockEquipment[index] = { ...mockEquipment[index], ...data };
      return mockEquipment[index];
    }
    throw new Error('Equipment not found');
  },

  async deleteEquipment(id: string): Promise<void> {
    await delay(300);
    const index = mockEquipment.findIndex(e => e.id === id);
    if (index > -1) {
      mockEquipment.splice(index, 1);
    }
  },

  // Tasks
  async getTasks(): Promise<Task[]> {
    await delay(500);
    return [...mockTasks];
  },

  async addTask(data: Omit<Task, 'id'>): Promise<Task> {
    await delay(300);
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    await delay(300);
    const index = mockTasks.findIndex(t => t.id === id);
    if (index > -1) {
      mockTasks[index] = { ...mockTasks[index], ...data };
      return mockTasks[index];
    }
    throw new Error('Task not found');
  },

  async deleteTask(id: string): Promise<void> {
    await delay(300);
    const index = mockTasks.findIndex(t => t.id === id);
    if (index > -1) {
      mockTasks.splice(index, 1);
    }
  },
};
