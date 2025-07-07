import { z } from "zod";

export const storeManagementSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Store name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  
  // Address
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  
  // Contact Info
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  
  // Schedule
  mondayOpen: z.string().min(1, "Opening time required"),
  mondayClose: z.string().min(1, "Closing time required"),
  tuesdayOpen: z.string().min(1, "Opening time required"),
  tuesdayClose: z.string().min(1, "Closing time required"),
  wednesdayOpen: z.string().min(1, "Opening time required"),
  wednesdayClose: z.string().min(1, "Closing time required"),
  thursdayOpen: z.string().min(1, "Opening time required"),
  thursdayClose: z.string().min(1, "Closing time required"),
  fridayOpen: z.string().min(1, "Opening time required"),
  fridayClose: z.string().min(1, "Closing time required"),
  saturdayOpen: z.string().min(1, "Opening time required"),
  saturdayClose: z.string().min(1, "Closing time required"),
  sundayOpen: z.string().min(1, "Opening time required"),
  sundayClose: z.string().min(1, "Closing time required"),
  
  // Settings
  acceptsDelivery: z.boolean(),
  acceptsPickup: z.boolean(),
  parkingAvailable: z.boolean(),
  wheelchairAccessible: z.boolean(),
});

export type StoreManagementFormData = z.infer<typeof storeManagementSchema>;