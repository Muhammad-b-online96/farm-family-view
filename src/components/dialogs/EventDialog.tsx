
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm, EventFormData } from "@/components/forms/EventForm";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EventFormData) => void;
  title: string;
  defaultValues?: Partial<EventFormData>;
  isLoading?: boolean;
}

export const EventDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  title, 
  defaultValues,
  isLoading 
}: EventDialogProps) => {
  const handleSubmit = (data: EventFormData) => {
    onSubmit(data);
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <EventForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          defaultValues={defaultValues}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
