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
} from "@/components/ui/explicit-form";
import { storeManagementSchema, type StoreManagementFormData } from "@/lib/store-schema";

export function StoreManagementFormV4() {
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
    console.log("Store Management Form Data (V4 - Explicit):", values);
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
        <h1 className="text-3xl font-bold">Store Management (V4)</h1>
        <p className="text-muted-foreground">
          Explicit form components - zero magic, maximum control
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
            <FormItem>
              <FormLabel htmlFor="name" required>Store Name</FormLabel>
              <FormControl>
                <Input 
                  id="name"
                  placeholder="Enter store name" 
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  {...register("name")} 
                />
              </FormControl>
              <FormMessage id="name-error" error={errors.name?.message} />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="category" required>Category</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger 
                    id="category"
                    aria-describedby={errors.category ? "category-error" : undefined}
                    aria-invalid={!!errors.category}
                  >
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
              <FormMessage id="category-error" error={errors.category?.message} />
            </FormItem>
          </div>

          <FormItem>
            <FormLabel htmlFor="description" required>Description</FormLabel>
            <FormControl>
              <Textarea
                id="description"
                placeholder="Describe your store and what you offer"
                className="min-h-[100px]"
                aria-describedby="description-help description-error"
                aria-invalid={!!errors.description}
                {...register("description")}
              />
            </FormControl>
            <FormDescription id="description-help">
              A brief description of your store and the products or services you offer.
            </FormDescription>
            <FormMessage id="description-error" error={errors.description?.message} />
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

          <FormItem>
            <FormLabel htmlFor="street" required>Street Address</FormLabel>
            <FormControl>
              <Input 
                id="street"
                placeholder="123 Main Street" 
                aria-describedby={errors.street ? "street-error" : undefined}
                aria-invalid={!!errors.street}
                {...register("street")} 
              />
            </FormControl>
            <FormMessage id="street-error" error={errors.street?.message} />
          </FormItem>

          <div className="grid gap-6 md:grid-cols-2">
            <FormItem>
              <FormLabel htmlFor="city" required>City</FormLabel>
              <FormControl>
                <Input 
                  id="city"
                  placeholder="New York" 
                  aria-describedby={errors.city ? "city-error" : undefined}
                  aria-invalid={!!errors.city}
                  {...register("city")} 
                />
              </FormControl>
              <FormMessage id="city-error" error={errors.city?.message} />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="state" required>State/Province</FormLabel>
              <FormControl>
                <Input 
                  id="state"
                  placeholder="NY" 
                  aria-describedby={errors.state ? "state-error" : undefined}
                  aria-invalid={!!errors.state}
                  {...register("state")} 
                />
              </FormControl>
              <FormMessage id="state-error" error={errors.state?.message} />
            </FormItem>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormItem>
              <FormLabel htmlFor="zipCode" required>ZIP/Postal Code</FormLabel>
              <FormControl>
                <Input 
                  id="zipCode"
                  placeholder="10001" 
                  aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
                  aria-invalid={!!errors.zipCode}
                  {...register("zipCode")} 
                />
              </FormControl>
              <FormMessage id="zipCode-error" error={errors.zipCode?.message} />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="country" required>Country</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => setValue("country", value)}>
                  <SelectTrigger 
                    id="country"
                    aria-describedby={errors.country ? "country-error" : undefined}
                    aria-invalid={!!errors.country}
                  >
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
              <FormMessage id="country-error" error={errors.country?.message} />
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

          <FormItem>
            <FormLabel htmlFor="email" required>Email Address</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="store@example.com"
                aria-describedby="email-help email-error"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </FormControl>
            <FormDescription id="email-help">
              Primary email address for customer inquiries
            </FormDescription>
            <FormMessage id="email-error" error={errors.email?.message} />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="phone" required>Phone Number</FormLabel>
            <FormControl>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                aria-describedby="phone-help phone-error"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </FormControl>
            <FormDescription id="phone-help">
              Main phone number for customer contact
            </FormDescription>
            <FormMessage id="phone-error" error={errors.phone?.message} />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="website">Website</FormLabel>
            <FormControl>
              <Input
                id="website"
                type="url"
                placeholder="https://www.yourstore.com"
                aria-describedby="website-help website-error"
                aria-invalid={!!errors.website}
                {...register("website")}
              />
            </FormControl>
            <FormDescription id="website-help">
              Your store's website URL (optional)
            </FormDescription>
            <FormMessage id="website-error" error={errors.website?.message} />
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
                
                <FormItem>
                  <FormControl>
                    <Input 
                      id={`${day.key}Open`}
                      type="time" 
                      aria-label={`Opening time for ${day.label}`}
                      aria-describedby={errors[`${day.key}Open` as keyof StoreManagementFormData] ? `${day.key}Open-error` : undefined}
                      aria-invalid={!!errors[`${day.key}Open` as keyof StoreManagementFormData]}
                      {...register(`${day.key}Open` as keyof StoreManagementFormData)} 
                    />
                  </FormControl>
                  <FormMessage 
                    id={`${day.key}Open-error`}
                    error={errors[`${day.key}Open` as keyof StoreManagementFormData]?.message} 
                  />
                </FormItem>

                <FormItem>
                  <FormControl>
                    <Input 
                      id={`${day.key}Close`}
                      type="time" 
                      aria-label={`Closing time for ${day.label}`}
                      aria-describedby={errors[`${day.key}Close` as keyof StoreManagementFormData] ? `${day.key}Close-error` : undefined}
                      aria-invalid={!!errors[`${day.key}Close` as keyof StoreManagementFormData]}
                      {...register(`${day.key}Close` as keyof StoreManagementFormData)} 
                    />
                  </FormControl>
                  <FormMessage 
                    id={`${day.key}Close-error`}
                    error={errors[`${day.key}Close` as keyof StoreManagementFormData]?.message} 
                  />
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  id="acceptsDelivery"
                  aria-describedby="acceptsDelivery-help"
                  onCheckedChange={(checked) => setValue("acceptsDelivery", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="acceptsDelivery">Accepts Delivery</FormLabel>
                <FormDescription id="acceptsDelivery-help">
                  Your store offers delivery services to customers
                </FormDescription>
              </div>
            </FormItem>

            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  id="acceptsPickup"
                  defaultChecked
                  aria-describedby="acceptsPickup-help"
                  onCheckedChange={(checked) => setValue("acceptsPickup", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="acceptsPickup">Accepts Pickup</FormLabel>
                <FormDescription id="acceptsPickup-help">
                  Customers can pick up orders at your store
                </FormDescription>
              </div>
            </FormItem>

            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  id="parkingAvailable"
                  aria-describedby="parkingAvailable-help"
                  onCheckedChange={(checked) => setValue("parkingAvailable", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="parkingAvailable">Parking Available</FormLabel>
                <FormDescription id="parkingAvailable-help">
                  Your store has parking facilities for customers
                </FormDescription>
              </div>
            </FormItem>

            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox 
                  id="wheelchairAccessible"
                  aria-describedby="wheelchairAccessible-help"
                  onCheckedChange={(checked) => setValue("wheelchairAccessible", !!checked)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="wheelchairAccessible">Wheelchair Accessible</FormLabel>
                <FormDescription id="wheelchairAccessible-help">
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