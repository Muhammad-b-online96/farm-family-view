
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ShieldCheck, AlertTriangle, CheckCircle, Clock, FileText, Edit, Trash2 } from 'lucide-react';
import { ComplianceDoc } from "@/data/mockData";
import { mockApi } from "@/services/mockApi";
import { useToast } from "@/hooks/use-toast";

const CompliancePage = () => {
  const [complianceDocs, setComplianceDocs] = useState<ComplianceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadComplianceDocs();
  }, []);

  const loadComplianceDocs = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getComplianceDocs();
      setComplianceDocs(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load compliance documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    if (!confirm('Are you sure you want to delete this compliance document?')) return;
    
    try {
      await mockApi.deleteComplianceDoc(id);
      toast({
        title: "Success",
        description: "Compliance document deleted successfully",
      });
      loadComplianceDocs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete compliance document",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: ComplianceDoc['status']) => {
    switch (status) {
      case 'Valid': return 'bg-green-500';
      case 'Expiring Soon': return 'bg-yellow-500';
      case 'Expired': return 'bg-red-500';
      case 'Pending': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: ComplianceDoc['status']) => {
    switch (status) {
      case 'Valid': return <CheckCircle className="h-4 w-4" />;
      case 'Expiring Soon': return <AlertTriangle className="h-4 w-4" />;
      case 'Expired': return <AlertTriangle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const validDocs = complianceDocs.filter(doc => doc.status === 'Valid').length;
  const expiringDocs = complianceDocs.filter(doc => doc.status === 'Expiring Soon').length;
  const expiredDocs = complianceDocs.filter(doc => doc.status === 'Expired').length;
  const pendingDocs = complianceDocs.filter(doc => doc.status === 'Pending').length;

  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Compliance & Legal</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Document
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid Documents</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{validDocs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{expiringDocs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredDocs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingDocs}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Compliance Documents</CardTitle>
          <CardDescription>Track licenses, permits, certificates, and compliance reports across all businesses.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Loading compliance documents...</p>
            </div>
          ) : complianceDocs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Days Until Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceDocs.map((doc) => {
                  const daysUntilExpiry = Math.ceil((doc.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          {doc.description && (
                            <div className="text-sm text-muted-foreground">{doc.description}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell className="capitalize">{doc.business}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(doc.status)} text-white flex items-center w-fit`}>
                          {getStatusIcon(doc.status)}
                          <span className="ml-1">{doc.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.expiryDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={daysUntilExpiry < 30 ? 'text-red-600 font-semibold' : daysUntilExpiry < 90 ? 'text-yellow-600' : 'text-green-600'}>
                          {daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : `Expired ${Math.abs(daysUntilExpiry)} days ago`}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteDoc(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No compliance documents found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get started by adding your first compliance document.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompliancePage;
