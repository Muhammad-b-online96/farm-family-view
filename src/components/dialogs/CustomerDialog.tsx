
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm, CustomerFormData } from "@/components/forms/CustomerForm";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CustomerFormData) => void;
  title: string;
  defaultValues?: Partial<CustomerFormData>;
  isLoading?: boolean;
}

export const CustomerDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  title, 
  defaultValues,
  isLoading 
}: CustomerDialogProps) => {
  const handleSubmit = (data: CustomerFormData) => {
    onSubmit(data);
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <CustomerForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          defaultValues={defaultValues}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
