# Enhanced shadcn/ui Forms - Developer Quickstart

## Quick Overview

We use **Enhanced shadcn/ui Forms** - an improved version that eliminates context overhead and provides explicit control while maintaining the shadcn/ui design system.

## Available Components

### **Explicit Components** (Maximum Control)
- `FormItem` - Container with spacing
- `FormLabel` - Label with manual `htmlFor`
- `FormControl` - Simple wrapper
- `FormDescription` - Help text with explicit `id`
- `FormMessage` - Error message with explicit `id`

### **Convenience Components** (Reduced Boilerplate)
- `FormInput` - Complete input field
- `FormSelect` - Complete select field  
- `FormTextarea` - Complete textarea field
- `FormCheckbox` - Complete checkbox field

## Basic Usage

### Option 1: Convenience Components (Recommended)

```tsx
import { useForm } from "react-hook-form";
import { FormInput, FormSelect, FormTextarea, FormCheckbox } from "@/components/ui/form-*";

interface MyForm {
  name: string;
  email: string;
  category: string;
  description: string;
  newsletter: boolean;
}

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<MyForm>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput<MyForm>
        name="name"
        label="Full Name"
        register={register}
        error={errors.name?.message}
        required
      />

      <FormInput<MyForm>
        name="email"
        label="Email"
        type="email"
        description="We'll never share your email"
        register={register}
        error={errors.email?.message}
        required
      />

      <FormSelect<MyForm>
        name="category"
        label="Category"
        options={[
          { value: "personal", label: "Personal" },
          { value: "business", label: "Business" }
        ]}
        register={register}
        error={errors.category?.message}
        required
      />

      <FormTextarea<MyForm>
        name="description"
        label="Description"
        rows={4}
        register={register}
        error={errors.description?.message}
      />

      <FormCheckbox<MyForm>
        name="newsletter"
        label="Subscribe to newsletter"
        register={register}
        error={errors.newsletter?.message}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Option 2: Explicit Components (Maximum Control)

```tsx
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/explicit-form";
import { Input, Select, Textarea, Checkbox } from "@/components/ui/...";

<FormItem>
  <FormLabel htmlFor="email" required>Email Address</FormLabel>
  <FormControl>
    <Input
      id="email"
      type="email"
      aria-describedby="email-help email-error"
      aria-invalid={!!errors.email}
      {...register("email")}
    />
  </FormControl>
  <FormDescription id="email-help">
    We'll use this to send you updates
  </FormDescription>
  <FormMessage id="email-error" error={errors.email?.message} />
</FormItem>
```

## Key Patterns

### 1. **Always Use Generic Types**
```tsx
// ✅ Good - Type safe
<FormInput<MyFormType>
  name="fieldName"
  register={register}
/>

// ❌ Avoid - No type safety
<FormInput
  name="fieldName"
  register={register}
/>
```

### 2. **Required Props Pattern**
```tsx
// Always include these for proper integration:
<FormInput
  name="fieldName"
  register={register}
  error={errors.fieldName?.message}
/>
```

### 3. **Accessibility Pattern**
```tsx
// For explicit components, always include:
<Input
  id="fieldName"
  aria-describedby={errors.fieldName ? "fieldName-error" : undefined}
  aria-invalid={!!errors.fieldName}
  {...register("fieldName")}
/>
<FormMessage id="fieldName-error" error={errors.fieldName?.message} />
```

## Common Examples

### Text Input with Validation
```tsx
<FormInput<FormType>
  name="username"
  label="Username"
  description="Must be 3-20 characters"
  register={register}
  error={errors.username?.message}
  required
/>
```

### Select with Options
```tsx
<FormSelect<FormType>
  name="country"
  label="Country"
  options={countries.map(c => ({ value: c.code, label: c.name }))}
  placeholder="Select your country"
  register={register}
  error={errors.country?.message}
  required
/>
```

### Textarea with Character Limit
```tsx
<FormTextarea<FormType>
  name="bio"
  label="Bio"
  description="Maximum 500 characters"
  rows={4}
  maxLength={500}
  register={register}
  error={errors.bio?.message}
/>
```

### Checkbox with Description
```tsx
<FormCheckbox<FormType>
  name="terms"
  label="I agree to the Terms of Service"
  description="Please read our terms before agreeing"
  register={register}
  error={errors.terms?.message}
  required
/>
```

## Validation States

Add visual feedback for different states:

```tsx
<FormInput
  name="password"
  label="Password"
  success={isPasswordStrong}  // Green border
  warning={isPasswordWeak}    // Yellow border
  error={errors.password?.message}  // Red border
  register={register}
/>
```

## Performance Tips

1. **Use convenience components** for standard cases
2. **Use explicit components** only when you need custom layouts
3. **Memoize options arrays** for selects
4. **Use defaultValues** in useForm to prevent unnecessary re-renders

## Migration from Standard shadcn/ui

Replace this:
```tsx
<FormField control={form.control} name="email" render={({ field }) => (
  <FormItem>
    <FormLabel>Email</FormLabel>
    <FormControl><Input {...field} /></FormControl>
    <FormMessage />
  </FormItem>
)} />
```

With this:
```tsx
<FormInput<FormType>
  name="email"
  label="Email"
  register={register}
  error={errors.email?.message}
/>
```

## Best Practices

1. **Always use TypeScript generics** for type safety
2. **Include error prop** for validation feedback
3. **Use required prop** for visual indicators
4. **Provide descriptions** for complex fields
5. **Test with screen readers** for accessibility

## Common Gotchas

1. **Don't forget the generic**: `<FormInput<FormType>` not `<FormInput`
2. **Pass register function**: Required for React Hook Form integration
3. **Include error prop**: Components won't show errors without it
4. **Use consistent naming**: Field names should match your TypeScript interface

This approach gives you the shadcn/ui design system with better performance and team-aligned architecture!