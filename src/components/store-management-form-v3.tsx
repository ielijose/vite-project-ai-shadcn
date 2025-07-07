"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/standalone-form";
import { storeManagementSchema, type StoreManagementFormData } from "@/lib/store-schema";

export function StoreManagementFormV3() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
    console.log("Store Management Form Data (V3 - Composable):", values);
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
        <h1 className="text-3xl font-bold">Store Management (V3)</h1>
        <p className="text-muted-foreground">
          Fully composable form components - maximum flexibility
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
            <FormItem name="name">
              <FormLabel required>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter store name" {...register("name")} />
              </FormControl>
              <FormMessage error={errors.name?.message} />
            </FormItem>

            <FormItem name="category">
              <FormLabel required>Category</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage error={errors.category?.message} />
            </FormItem>
          </div>

          <FormItem name="description">
            <FormLabel required>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your store and what you offer"
                className="min-h-[100px]"
                {...register("description")}
              />
            </FormControl>
            <FormDescription>
              A brief description of your store and the products or services you offer.
            </FormDescription>
            <FormMessage error={errors.description?.message} />
          </FormItem>
        </div>

        {/* Address Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Address Information</h2>
            <p className="text-sm text-muted-foreground">
              Enter your store's physical address
            </p>
          </div>

          <FormItem name="street">
            <FormLabel required>Street Address</FormLabel>
            <FormControl>
              <Input placeholder="123 Main Street" {...register("street")} />
            </FormControl>
            <FormMessage error={errors.street?.message} />
          </FormItem>

          <div className="grid gap-6 md:grid-cols-2">
            <FormItem name="city">
              <FormLabel required>City</FormLabel>
              <FormControl>
                <Input placeholder="New York" {...register("city")} />
              </FormControl>
              <FormMessage error={errors.city?.message} />
            </FormItem>

            <FormItem name="state">
              <FormLabel required>State/Province</FormLabel>
              <FormControl>
                <Input placeholder="NY" {...register("state")} />
              </FormControl>
              <FormMessage error={errors.state?.message} />
            </FormItem>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormItem name="zipCode">
              <FormLabel required>ZIP/Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="10001" {...register("zipCode")} />
              </FormControl>
              <FormMessage error={errors.zipCode?.message} />
            </FormItem>

            <FormItem name="country">
              <FormLabel required>Country</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => setValue("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage error={errors.country?.message} />
            </FormItem>
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

          <FormItem name="email">
            <FormLabel required>Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="store@example.com"
                {...register("email")}
              />
            </FormControl>
            <FormDescription>
              Primary email address for customer inquiries
            </FormDescription>
            <FormMessage error={errors.email?.message} />
          </FormItem>

          <FormItem name="phone">
            <FormLabel required>Phone Number</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
              />
            </FormControl>
            <FormDescription>
              Main phone number for customer contact
            </FormDescription>
            <FormMessage error={errors.phone?.message} />
          </FormItem>

          <FormItem name="website">
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://www.yourstore.com"
                {...register("website")}
              />
            </FormControl>
            <FormDescription>
              Your store's website URL (optional)
            </FormDescription>
            <FormMessage error={errors.website?.message} />
          </FormItem>
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
                
                <FormItem name={`${day.key}Open`}>
                  <FormControl>
                    <Input 
                      type="time" 
                      {...register(`${day.key}Open` as keyof StoreManagementFormData)} 
                    />
                  </FormControl>
                  <FormMessage error={errors[`${day.key}Open` as keyof StoreManagementFormData]?.message} />
                </FormItem>

                <FormItem name={`${day.key}Close`}>
                  <FormControl>
                    <Input 
                      type="time" 
                      {...register(`${day.key}Close` as keyof StoreManagementFormData)} 
                    />
                  </FormControl>
                  <FormMessage error={errors[`${day.key}Close` as keyof StoreManagementFormData]?.message} />
                </FormItem>
              </div>
            ))}
          </div>

          <FormDescription>
            Times are displayed in 24-hour format (HH:MM)
          </FormDescription>
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
            <FormItem name="acceptsDelivery" className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  onCheckedChange={(checked) => setValue("acceptsDelivery", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accepts Delivery</FormLabel>
                <FormDescription>
                  Your store offers delivery services to customers
                </FormDescription>
              </div>
            </FormItem>

            <FormItem name="acceptsPickup" className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  defaultChecked
                  onCheckedChange={(checked) => setValue("acceptsPickup", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accepts Pickup</FormLabel>
                <FormDescription>
                  Customers can pick up orders at your store
                </FormDescription>
              </div>
            </FormItem>

            <FormItem name="parkingAvailable" className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  onCheckedChange={(checked) => setValue("parkingAvailable", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Parking Available</FormLabel>
                <FormDescription>
                  Your store has parking facilities for customers
                </FormDescription>
              </div>
            </FormItem>

            <FormItem name="wheelchairAccessible" className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  onCheckedChange={(checked) => setValue("wheelchairAccessible", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Wheelchair Accessible</FormLabel>
                <FormDescription>
                  Your store is accessible to customers with mobility needs
                </FormDescription>
              </div>
            </FormItem>
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