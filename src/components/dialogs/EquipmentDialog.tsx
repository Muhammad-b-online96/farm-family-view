
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EquipmentForm, EquipmentFormData } from "@/components/forms/EquipmentForm";

interface EquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EquipmentFormData) => void;
  title: string;
  defaultValues?: Partial<EquipmentFormData>;
  isLoading?: boolean;
}

export const EquipmentDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  title, 
  defaultValues,
  isLoading 
}: EquipmentDialogProps) => {
  const handleSubmit = (data: EquipmentFormData) => {
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
        <EquipmentForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          defaultValues={defaultValues}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
