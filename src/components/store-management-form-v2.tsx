"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { FormCheckbox } from "@/components/ui/form-checkbox";
import { storeManagementSchema, type StoreManagementFormData } from "@/lib/store-schema";

export function StoreManagementFormV2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreManagementFormData>({
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
    console.log("Store Management Form Data (V2):", values);
  }

  const categoryOptions = [
    { value: "restaurant", label: "Restaurant" },
    { value: "retail", label: "Retail" },
    { value: "grocery", label: "Grocery" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "services", label: "Services" },
    { value: "other", label: "Other" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "MX", label: "Mexico" },
    { value: "UK", label: "United Kingdom" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Germany" },
    { value: "ES", label: "Spain" },
    { value: "IT", label: "Italy" },
    { value: "AU", label: "Australia" },
    { value: "JP", label: "Japan" },
    { value: "Other", label: "Other" },
  ];

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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Store Management (V2)</h1>
        <p className="text-muted-foreground">
          Configure your store information with standalone form components
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <p className="text-sm text-muted-foreground">
              Enter your store's basic details
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormInput
              name="name"
              label="Store Name"
              placeholder="Enter store name"
              register={register}
              error={errors.name?.message}
              required
            />

            <FormSelect
              name="category"
              label="Category"
              placeholder="Select a category"
              options={categoryOptions}
              register={register}
              error={errors.category?.message}
              required
            />
          </div>

          <FormTextarea
            name="description"
            label="Description"
            placeholder="Describe your store and what you offer"
            description="A brief description of your store and the products or services you offer."
            register={register}
            error={errors.description?.message}
            required
            className="min-h-[100px]"
          />
        </div>

        {/* Address Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Address Information</h2>
            <p className="text-sm text-muted-foreground">
              Enter your store's physical address
            </p>
          </div>

          <FormInput
            name="street"
            label="Street Address"
            placeholder="123 Main Street"
            register={register}
            error={errors.street?.message}
            required
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormInput
              name="city"
              label="City"
              placeholder="New York"
              register={register}
              error={errors.city?.message}
              required
            />

            <FormInput
              name="state"
              label="State/Province"
              placeholder="NY"
              register={register}
              error={errors.state?.message}
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormInput
              name="zipCode"
              label="ZIP/Postal Code"
              placeholder="10001"
              register={register}
              error={errors.zipCode?.message}
              required
            />

            <FormSelect
              name="country"
              label="Country"
              placeholder="Select a country"
              options={countryOptions}
              register={register}
              error={errors.country?.message}
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="text-sm text-muted-foreground">
              How customers can reach your store
            </p>
          </div>

          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="store@example.com"
            description="Primary email address for customer inquiries"
            register={register}
            error={errors.email?.message}
            required
          />

          <FormInput
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            description="Main phone number for customer contact"
            register={register}
            error={errors.phone?.message}
            required
          />

          <FormInput
            name="website"
            label="Website"
            type="url"
            placeholder="https://www.yourstore.com"
            description="Your store's website URL (optional)"
            register={register}
            error={errors.website?.message}
          />
        </div>

        {/* Operating Hours */}
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
                
                <FormInput
                  name={`${day.key}Open`}
                  label={`Opening time for ${day.label}`}
                  type="time"
                  register={register}
                  error={errors[`${day.key}Open` as keyof StoreManagementFormData]?.message}
                  className="sr-only"
                />

                <FormInput
                  name={`${day.key}Close`}
                  label={`Closing time for ${day.label}`}
                  type="time"
                  register={register}
                  error={errors[`${day.key}Close` as keyof StoreManagementFormData]?.message}
                  className="sr-only"
                />
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Times are displayed in 24-hour format (HH:MM)</p>
          </div>
        </div>

        {/* Store Settings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Store Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure your store's features and accessibility options
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormCheckbox
              name="acceptsDelivery"
              label="Accepts Delivery"
              description="Your store offers delivery services to customers"
              register={register}
              error={errors.acceptsDelivery?.message}
            />

            <FormCheckbox
              name="acceptsPickup"
              label="Accepts Pickup"
              description="Customers can pick up orders at your store"
              register={register}
              error={errors.acceptsPickup?.message}
            />

            <FormCheckbox
              name="parkingAvailable"
              label="Parking Available"
              description="Your store has parking facilities for customers"
              register={register}
              error={errors.parkingAvailable?.message}
            />

            <FormCheckbox
              name="wheelchairAccessible"
              label="Wheelchair Accessible"
              description="Your store is accessible to customers with mobility needs"
              register={register}
              error={errors.wheelchairAccessible?.message}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Save Store Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}