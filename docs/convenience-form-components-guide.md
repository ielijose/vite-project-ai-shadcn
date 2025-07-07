# Convenience Form Components Guide

## Overview

This project provides convenience wrapper components built on top of the explicit form components. These wrappers offer a simplified API while maintaining the explicit, accessible foundation underneath. They provide the best of both worlds: reduced boilerplate with full accessibility control.

## Architecture

The convenience components internally use the explicit form components:
- **FormInput** → Uses `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`
- **FormSelect** → Uses `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`
- **FormTextarea** → Uses `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`
- **FormCheckbox** → Uses `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`

## Available Components

### 1. FormInput - Text Input Component
**Location**: `src/components/ui/form-input.tsx`
**Built on**: `explicit-form.tsx` components

**Props:**
- `name`: string (required) - field identifier
- `label`: string - display label
- `description`: string - help text
- `error`: string - error message
- `register`: function - React Hook Form register function
- `required`: boolean - shows asterisk indicator
- `className`: string - container styling
- `inputClassName`: string - input element styling
- Plus all standard HTML input attributes

**Usage:**
```tsx
<FormInput
  name="email"
  label="Email Address"
  description="We'll use this to contact you"
  placeholder="you@example.com"
  type="email"
  register={register}
  error={errors.email?.message}
  required
/>
```

### 2. FormSelect - Select Dropdown Component
**Location**: `src/components/ui/form-select.tsx`
**Built on**: `explicit-form.tsx` components

**Props:**
- `name`: string (required) - field identifier
- `options`: Array<{value: string, label: string}> (required) - dropdown options
- `label`: string - display label
- `description`: string - help text
- `error`: string - error message
- `register`: function - React Hook Form register function
- `required`: boolean - shows asterisk indicator
- `placeholder`: string - placeholder text
- `defaultValue`: string - initial value
- `onValueChange`: (value: string) => void - change handler
- `className`: string - container styling

**Usage:**
```tsx
<FormSelect
  name="category"
  label="Category"
  options={[
    { value: "tech", label: "Technology" },
    { value: "health", label: "Healthcare" },
    { value: "finance", label: "Finance" }
  ]}
  placeholder="Select a category"
  register={register}
  error={errors.category?.message}
  required
/>
```

### 3. FormTextarea - Textarea Component
**Location**: `src/components/ui/form-textarea.tsx`
**Built on**: `explicit-form.tsx` components

**Props:**
- `name`: string (required) - field identifier
- `label`: string - display label
- `description`: string - help text
- `error`: string - error message
- `register`: function - React Hook Form register function
- `required`: boolean - shows asterisk indicator
- `className`: string - container styling
- `textareaClassName`: string - textarea element styling
- Plus all standard HTML textarea attributes

**Usage:**
```tsx
<FormTextarea
  name="description"
  label="Description"
  description="Provide a detailed description"
  placeholder="Enter description..."
  rows={4}
  register={register}
  error={errors.description?.message}
/>
```

### 4. FormCheckbox - Checkbox Component
**Location**: `src/components/ui/form-checkbox.tsx`
**Built on**: `explicit-form.tsx` components

**Props:**
- `name`: string (required) - field identifier
- `label`: string - display label
- `description`: string - help text
- `error`: string - error message
- `register`: function - React Hook Form register function
- `required`: boolean - shows asterisk indicator
- `defaultChecked`: boolean - initial checked state
- `onCheckedChange`: (checked: boolean) => void - change handler
- `className`: string - container styling

**Usage:**
```tsx
<FormCheckbox
  name="terms"
  label="I agree to the terms and conditions"
  description="You must agree to continue"
  register={register}
  error={errors.terms?.message}
  required
/>
```

## Integration with React Hook Form

### Setup
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSelect, FormTextarea, FormCheckbox } from "@/components/ui/...";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    // your defaults
  }
});
```

### Complete Form Example
```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormTextarea, FormCheckbox } from "@/components/ui/...";
import { formSchema, type FormData } from "@/lib/form-schema";

export function ConvenienceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      description: "",
      newsletter: false,
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  const categoryOptions = [
    { value: "personal", label: "Personal" },
    { value: "business", label: "Business" },
    { value: "organization", label: "Organization" }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        register={register}
        error={errors.name?.message}
        required
      />

      <FormInput
        name="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        description="We'll never share your email"
        register={register}
        error={errors.email?.message}
        required
      />

      <FormSelect
        name="category"
        label="Account Type"
        options={categoryOptions}
        placeholder="Select account type"
        register={register}
        error={errors.category?.message}
        required
      />

      <FormTextarea
        name="description"
        label="Tell us about yourself"
        placeholder="Share your story..."
        rows={4}
        register={register}
        error={errors.description?.message}
      />

      <FormCheckbox
        name="newsletter"
        label="Subscribe to newsletter"
        description="Get weekly updates and tips"
        register={register}
        error={errors.newsletter?.message}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Benefits of Convenience Components

### 1. **Reduced Boilerplate**
```tsx
// Instead of this explicit version:
<FormItem>
  <FormLabel htmlFor="email" required>Email</FormLabel>
  <FormControl>
    <Input
      id="email"
      type="email"
      aria-describedby="email-help email-error"
      aria-invalid={!!errors.email}
      {...register("email")}
    />
  </FormControl>
  <FormDescription id="email-help">We'll never share your email</FormDescription>
  <FormMessage id="email-error" error={errors.email?.message} />
</FormItem>

// Use this convenience version:
<FormInput
  name="email"
  label="Email"
  type="email"
  description="We'll never share your email"
  register={register}
  error={errors.email?.message}
  required
/>
```

### 2. **Automatic Accessibility**
- Automatic ID generation (`name-error`, `name-description`)
- Proper `aria-describedby` linking
- Correct `aria-invalid` states
- Proper label association with `htmlFor`

### 3. **Consistent Error Styling**
- Automatic red borders on error states
- Consistent error message display
- Proper error text styling

### 4. **TypeScript Support**
- Full type safety
- IntelliSense support
- Proper prop validation

## When to Use Convenience vs Explicit Components

### Use Convenience Components When:
- Building standard form fields
- Want reduced boilerplate
- Need consistent form patterns
- Working with typical form layouts
- Team prefers simpler API

### Use Explicit Components When:
- Need custom field layouts
- Require maximum control
- Building complex form structures
- Debugging accessibility issues
- Want full transparency

## Best Practices

### 1. **Always Pass Register and Error**
```tsx
<FormInput
  name="fieldName"
  register={register}
  error={errors.fieldName?.message}
/>
```

### 2. **Use Meaningful Labels and Descriptions**
```tsx
<FormInput
  name="password"
  label="Password"
  description="Must be at least 8 characters"
  type="password"
  register={register}
  error={errors.password?.message}
  required
/>
```

### 3. **Consistent Naming**
Use the same `name` prop as your form schema field names.

### 4. **Required Field Indicators**
```tsx
<FormInput
  name="email"
  label="Email Address"
  required  // Shows asterisk automatically
  register={register}
  error={errors.email?.message}
/>
```

## Common Patterns

### 1. **Basic Input Field**
```tsx
<FormInput
  name="title"
  label="Project Title"
  placeholder="Enter project title"
  register={register}
  error={errors.title?.message}
  required
/>
```

### 2. **Select with Options**
```tsx
<FormSelect
  name="priority"
  label="Priority"
  options={[
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ]}
  register={register}
  error={errors.priority?.message}
  required
/>
```

### 3. **Textarea with Character Limit**
```tsx
<FormTextarea
  name="feedback"
  label="Feedback"
  description="Maximum 500 characters"
  maxLength={500}
  rows={3}
  register={register}
  error={errors.feedback?.message}
/>
```

### 4. **Checkbox with Terms**
```tsx
<FormCheckbox
  name="terms"
  label="I agree to the Terms of Service"
  description="Please read our terms before agreeing"
  register={register}
  error={errors.terms?.message}
  required
/>
```

## Error Handling

### Automatic Error Display
```tsx
// Error automatically displayed when present
<FormInput
  name="email"
  error={errors.email?.message}
  register={register}
/>
```

### Custom Error Messages
```tsx
<FormInput
  name="username"
  error={errors.username?.message || "Username is required"}
  register={register}
/>
```

## Styling Customization

### Container Styling
```tsx
<FormInput
  name="field"
  className="mb-8"  // Applied to FormItem
  register={register}
/>
```

### Input Element Styling
```tsx
<FormInput
  name="field"
  inputClassName="bg-gray-50"  // Applied to Input element
  register={register}
/>
```

### Checkbox Layout
```tsx
<FormCheckbox
  name="option"
  className="border p-4 rounded"  // Custom container styling
  register={register}
/>
```

## Migration from Explicit Components

If you have existing explicit form code, you can easily migrate:

**Before (Explicit):**
```tsx
<FormItem>
  <FormLabel htmlFor="name" required>Name</FormLabel>
  <FormControl>
    <Input
      id="name"
      aria-describedby={errors.name ? "name-error" : undefined}
      aria-invalid={!!errors.name}
      {...register("name")}
    />
  </FormControl>
  <FormMessage id="name-error" error={errors.name?.message} />
</FormItem>
```

**After (Convenience):**
```tsx
<FormInput
  name="name"
  label="Name"
  register={register}
  error={errors.name?.message}
  required
/>
```

## Performance Considerations

- Convenience components have minimal overhead
- No extra re-renders compared to explicit components
- Automatic memoization where beneficial
- Efficient prop passing to underlying components

## Conclusion

Convenience form components provide a streamlined development experience while maintaining the solid foundation of explicit form components. They're perfect for most form use cases, offering:

- **80% less boilerplate** compared to explicit components
- **Full accessibility** with automatic ARIA attributes
- **Type safety** with TypeScript support
- **Consistent styling** across your application
- **Easy maintenance** with centralized form logic

Use these components when you want productivity without sacrificing quality or accessibility. For complex or highly customized forms, you can always fall back to the explicit components for maximum control.