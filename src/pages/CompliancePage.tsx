import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText, ShieldCheck, AlertTriangle } from 'lucide-react';

type ComplianceStatus = 'Compliant' | 'Pending Review' | 'Action Required' | 'Expired' | 'Upcoming Renewal';
type DocumentType = 'License' | 'Permit' | 'Inspection Report' | 'Certification' | 'Policy';

interface ComplianceDocument {
  id: string;
  documentName: string;
  type: DocumentType;
  issueDate: string; // Should be Date
  expiryDate?: string; // Should be Date
  status: ComplianceStatus;
  responsibleDept: string;
  notes?: string;
}

const mockComplianceDocs: ComplianceDocument[] = [
  { id: 'doc1', documentName: 'Business Operating License', type: 'License', issueDate: '2024-01-01', expiryDate: '2025-12-31', status: 'Compliant', responsibleDept: 'Legal' },
  { id: 'doc2', documentName: 'Weed Cultivation Permit #WCULT-001', type: 'Permit', issueDate: '2024-03-01', expiryDate: '2025-02-28', status: 'Upcoming Renewal', responsibleDept: 'Weed Operations', notes: 'Renewal process initiated.' },
  { id: 'doc3', documentName: 'Food Safety Certification - Honey', type: 'Certification', issueDate: '2023-06-15', expiryDate: '2025-06-14', status: 'Compliant', responsibleDept: 'Honey Production' },
  { id: 'doc4', documentName: 'Quarterly Fire Inspection Report', type: 'Inspection Report', issueDate: '2025-04-10', status: 'Pending Review', responsibleDept: 'Facility Management' },
  { id: 'doc5', documentName: 'Fish Farm Water Discharge Permit', type: 'Permit', issueDate: '2023-02-01', expiryDate: '2025-01-31', status: 'Expired', responsibleDept: 'Fish Operations', notes: 'Renewal application overdue.'},
  { id: 'doc6', documentName: 'Organic Certification - Mushrooms', type: 'Certification', issueDate: '2024-05-01', expiryDate: '2026-04-30', status: 'Compliant', responsibleDept: 'Mushroom Cultivation' },
  { id: 'doc7', documentName: 'Employee Safety Training Policy', type: 'Policy', issueDate: '2024-01-15', status: 'Action Required', responsibleDept: 'HR', notes: 'Needs annual review and update.'}
];

const getComplianceStatusColor = (status: ComplianceStatus) => {
  switch (status) {
    case 'Compliant': return 'bg-green-500';
    case 'Pending Review': return 'bg-blue-500';
    case 'Action Required': return 'bg-yellow-500 text-yellow-foreground';
    case 'Upcoming Renewal': return 'bg-purple-500';
    case 'Expired': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

const CompliancePage = () => {
  const [documents, setDocuments] = useState<ComplianceDocument[]>(mockComplianceDocs);

  const getDaysToExpiry = (expiryDate?: string): number | null => {
    if (!expiryDate) return null;
    const today = new Date();
    const expDate = new Date(expiryDate);
    const diffTime = expDate.getTime() - today.getTime();
    if (diffTime < 0) return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Negative for past expiry
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Compliance & Documentation</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Document
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Compliance Register</CardTitle>
          <CardDescription>Track all compliance documents, licenses, and permits.</CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Days to Expiry</TableHead>
                  <TableHead>Responsible Dept.</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const daysToExpiry = getDaysToExpiry(doc.expiryDate);
                  let expiryText = doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : 'N/A';
                  let daysText = 'N/A';
                  let daysColor = 'text-muted-foreground';

                  if (daysToExpiry !== null) {
                    if (daysToExpiry < 0) {
                      daysText = `${Math.abs(daysToExpiry)} days ago`;
                      daysColor = 'text-red-500 font-semibold';
                    } else if (daysToExpiry <= 30) {
                      daysText = `${daysToExpiry} days`;
                      daysColor = 'text-orange-500 font-semibold';
                    } else {
                       daysText = `${daysToExpiry} days`;
                    }
                  }
                  
                  return (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.documentName}</TableCell>
                      <TableCell><Badge variant="secondary">{doc.type}</Badge></TableCell>
                      <TableCell>
                        <Badge className={`${getComplianceStatusColor(doc.status)} text-white`}>
                          {doc.status === 'Expired' && <AlertTriangle className="inline mr-1 h-3 w-3" />}
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={daysToExpiry !== null && daysToExpiry < 0 ? 'text-red-500' : ''}>{expiryText}</TableCell>
                      <TableCell className={daysColor}>{daysText}</TableCell>
                      <TableCell>{doc.responsibleDept}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No compliance documents</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get started by adding documents.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompliancePage;
