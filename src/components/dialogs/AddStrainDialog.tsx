
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { strainSchema, StrainFormData } from '@/components/forms/schemas';

interface AddStrainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StrainFormData) => void;
}

export const AddStrainDialog: React.FC<AddStrainDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { toast } = useToast();
  const form = useForm<StrainFormData>({
    resolver: zodResolver(strainSchema),
    defaultValues: {
      name: '',
      type: 'Hybrid',
      thcPercentage: 0,
      cbdPercentage: 0,
      notes: '',
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  const handleFormSubmit = (data: StrainFormData) => {
    onSubmit(data);
    toast({
      title: "New Strain Added",
      description: `Successfully added strain: ${data.name}`,
    });
    onOpenChange(false); // Close dialog on submit
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Strain</DialogTitle>
          <DialogDescription>
            Enter the details for the new weed strain. Click save when complete.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strain Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Blue Dream, OG Kush" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strain type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Indica">Indica</SelectItem>
                      <SelectItem value="Sativa">Sativa</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thcPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>THC Percentage (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="20.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cbdPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CBD Percentage (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Fruity aroma, good for daytime use" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Strain</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
