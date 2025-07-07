"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type StoreManagementFormData } from "@/lib/store-schema";

export function StoreContact() {
  const form = useFormContext<StoreManagementFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p className="text-sm text-muted-foreground">
          How customers can reach your store
        </p>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="store@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Primary email address for customer inquiries
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Main phone number for customer contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://www.yourstore.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your store's website URL (if applicable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}