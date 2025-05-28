
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SupplierForm, SupplierFormData } from "@/components/forms/SupplierForm";

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SupplierFormData) => void;
  title: string;
  defaultValues?: Partial<SupplierFormData>;
  isLoading?: boolean;
}

export const SupplierDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  title, 
  defaultValues,
  isLoading 
}: SupplierDialogProps) => {
  const handleSubmit = (data: SupplierFormData) => {
    onSubmit(data);
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <SupplierForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          defaultValues={defaultValues}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
