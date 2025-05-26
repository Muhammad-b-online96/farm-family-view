
import { z } from "zod";

export const transactionSchema = z.object({
  date: z.date({ required_error: "Date is required." }),
  description: z.string().min(1, "Description is required."),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  type: z.enum(["income", "expense"], { required_error: "Type is required." }),
  category: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export const strainSchema = z.object({
  name: z.string().min(1, "Strain name is required."),
  type: z.enum(["Indica", "Sativa", "Hybrid"], { required_error: "Strain type is required." }),
  thcPercentage: z.coerce.number().min(0).max(100, "THC % must be between 0 and 100.").optional(),
  cbdPercentage: z.coerce.number().min(0).max(100, "CBD % must be between 0 and 100.").optional(),
  notes: z.string().optional(),
});

export type StrainFormData = z.infer<typeof strainSchema>;
