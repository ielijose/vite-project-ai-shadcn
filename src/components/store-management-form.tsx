"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { storeManagementSchema, type StoreManagementFormData } from "@/lib/store-schema";
import { StoreBasicInfo } from "./store-basic-info";
import { StoreAddress } from "./store-address";
import { StoreContact } from "./store-contact";
import { StoreSchedule } from "./store-schedule";
import { StoreSettings } from "./store-settings";

export function StoreManagementForm() {
  const form = useForm<StoreManagementFormData>({
    resolver: zodResolver(storeManagementSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      email: "",
      phone: "",
      website: "",
      mondayOpen: "09:00",
      mondayClose: "17:00",
      tuesdayOpen: "09:00",
      tuesdayClose: "17:00",
      wednesdayOpen: "09:00",
      wednesdayClose: "17:00",
      thursdayOpen: "09:00",
      thursdayClose: "17:00",
      fridayOpen: "09:00",
      fridayClose: "17:00",
      saturdayOpen: "09:00",
      saturdayClose: "17:00",
      sundayOpen: "09:00",
      sundayClose: "17:00",
      acceptsDelivery: false,
      acceptsPickup: true,
      parkingAvailable: false,
      wheelchairAccessible: false,
    },
  });

  function onSubmit(values: StoreManagementFormData) {
    console.log("Store Management Form Data:", values);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Store Management</h1>
        <p className="text-muted-foreground">
          Configure your store information and settings
        </p>
      </div>

      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8">
              <StoreBasicInfo />
              <StoreAddress />
              <StoreContact />
              <StoreSchedule />
              <StoreSettings />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Save Store Configuration
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}