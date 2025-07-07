"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type StoreManagementFormData } from "@/lib/store-schema";

export function StoreSchedule() {
  const form = useFormContext<StoreManagementFormData>();

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Operating Hours</h2>
        <p className="text-sm text-muted-foreground">
          Set your store's operating hours for each day of the week
        </p>
      </div>

      <div className="grid gap-4">
        {days.map((day) => (
          <div key={day.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="font-medium">{day.label}</div>
            
            <FormField
              control={form.control}
              name={`${day.key}Open` as keyof StoreManagementFormData}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Opening time for {day.label}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${day.key}Close` as keyof StoreManagementFormData}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Closing time for {day.label}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Times are displayed in 24-hour format (HH:MM)</p>
      </div>
    </div>
  );
}