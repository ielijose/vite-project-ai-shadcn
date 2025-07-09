# Enhanced shadcn/ui FormItem Components - AI Agent Guide

## Component Overview

This codebase uses enhanced form components that adapt the shadcn/ui form pattern to align with the team's architectural preferences. These components use explicit prop specification and direct React Hook Form integration while maintaining the shadcn/ui design system.

## Available Components

### 1. FormItem - Container Component
**Location**: `src/components/ui/explicit-form.tsx:5-14`
**Purpose**: Simple container that provides consistent spacing between form elements

**Props:**
- `className`: string - additional CSS classes
- Plus all standard HTML div attributes

**Usage Example:**
```tsx
<FormItem>
  {/* Form content goes here */}
</FormItem>
```

### 2. FormLabel - Enhanced Label Component
**Location**: `src/components/ui/explicit-form.tsx:17-38`
**Purpose**: Label component with explicit `htmlFor` attribute and required indicator

**Props:**
- `htmlFor`: string - ID of the associated form element (required for accessibility)
- `required`: boolean - shows asterisk indicator
- `className`: string - additional CSS classes
- Plus all standard HTML label attributes

**Usage Example:**
```tsx
<FormLabel htmlFor="email" required>Email Address</FormLabel>
```

### 3. FormControl - Simple Wrapper
**Location**: `src/components/ui/explicit-form.tsx:41-50`
**Purpose**: Simple wrapper component with no automatic behavior

**Props:**
- `className`: string - additional CSS classes
- Plus all standard HTML div attributes

**Usage Example:**
```tsx
<FormControl>
  <Input id="email" {...register("email")} />
</FormControl>
```

### 4. FormDescription - Enhanced Help Text Component
**Location**: `src/components/ui/explicit-form.tsx:53-66`
**Purpose**: Help text component with explicit `id` prop for accessibility

**Props:**
- `id`: string - unique identifier for aria-describedby
- `className`: string - additional CSS classes
- Plus all standard HTML paragraph attributes

**Usage Example:**
```tsx
<FormDescription id="email-help">
  We'll use this to send you important updates
</FormDescription>
```

### 5. FormMessage - Enhanced Error Message Component
**Location**: `src/components/ui/explicit-form.tsx:69-93`
**Purpose**: Error message component with explicit `id` prop and error handling

**Props:**
- `id`: string - unique identifier for aria-describedby
- `error`: string - error message to display
- `className`: string - additional CSS classes
- Plus all standard HTML paragraph attributes

**Usage Example:**
```tsx
<FormMessage id="email-error" error={errors.email?.message} />
```

## Integration Pattern

### 1. Standard React Hook Form Setup
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/explicit-form";
import { Input, Select, Textarea, Checkbox } from "@/components/ui/...";

const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm({
  resolver: zodResolver(validationSchema),
  defaultValues: {
    // your default values
  }
});
```

### 2. Form Implementation Template
```tsx
<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  {/* Text Input Field */}
  <FormItem>
    <FormLabel htmlFor="fieldName" required>Field Label</FormLabel>
    <FormControl>
      <Input
        id="fieldName"
        aria-describedby={errors.fieldName ? "fieldName-error" : undefined}
        aria-invalid={!!errors.fieldName}
        {...register("fieldName")}
      />
    </FormControl>
    <FormMessage id="fieldName-error" error={errors.fieldName?.message} />
  </FormItem>
  
  {/* Select Field */}
  <FormItem>
    <FormLabel htmlFor="selectField" required>Select Label</FormLabel>
    <FormControl>
      <Select onValueChange={(value) => setValue("selectField", value)}>
        <SelectTrigger
          id="selectField"
          aria-describedby={errors.selectField ? "selectField-error" : undefined}
          aria-invalid={!!errors.selectField}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {/* options */}
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage id="selectField-error" error={errors.selectField?.message} />
  </FormItem>
  
  {/* Textarea Field */}
  <FormItem>
    <FormLabel htmlFor="textareaField">Textarea Label</FormLabel>
    <FormControl>
      <Textarea
        id="textareaField"
        aria-describedby={errors.textareaField ? "textareaField-error" : undefined}
        aria-invalid={!!errors.textareaField}
        {...register("textareaField")}
      />
    </FormControl>
    <FormMessage id="textareaField-error" error={errors.textareaField?.message} />
  </FormItem>
  
  {/* Checkbox Field */}
  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
    <FormControl>
      <Checkbox
        id="checkboxField"
        onCheckedChange={(checked) => setValue("checkboxField", !!checked)}
      />
    </FormControl>
    <div className="space-y-1 leading-none">
      <FormLabel htmlFor="checkboxField">Checkbox Label</FormLabel>
    </div>
  </FormItem>
  
  <button type="submit">Submit</button>
</form>
```

## Common Usage Patterns

### 1. Basic Form Field
```tsx
<FormItem>
  <FormLabel htmlFor="storeName" required>Store Name</FormLabel>
  <FormControl>
    <Input
      id="storeName"
      placeholder="Enter store name"
      aria-describedby={errors.storeName ? "storeName-error" : undefined}
      aria-invalid={!!errors.storeName}
      {...register("storeName")}
    />
  </FormControl>
  <FormMessage id="storeName-error" error={errors.storeName?.message} />
</FormItem>
```

### 2. Field with Description
```tsx
<FormItem>
  <FormLabel htmlFor="email" required>Email Address</FormLabel>
  <FormControl>
    <Input
      id="email"
      type="email"
      placeholder="you@example.com"
      aria-describedby="email-help email-error"
      aria-invalid={!!errors.email}
      {...register("email")}
    />
  </FormControl>
  <FormDescription id="email-help">
    We'll use this to send you important updates
  </FormDescription>
  <FormMessage id="email-error" error={errors.email?.message} />
</FormItem>
```

### 3. Conditional Required Fields
```tsx
<FormItem>
  <FormLabel htmlFor="phone" required={someCondition}>Phone Number</FormLabel>
  <FormControl>
    <Input
      id="phone"
      placeholder="(555) 123-4567"
      aria-describedby={errors.phone ? "phone-error" : undefined}
      aria-invalid={!!errors.phone}
      {...register("phone")}
    />
  </FormControl>
  <FormMessage id="phone-error" error={errors.phone?.message} />
</FormItem>
```

### 4. Custom Styling
```tsx
<FormItem className="mb-8">
  <FormLabel htmlFor="customField">Custom Styled Field</FormLabel>
  <FormControl>
    <Input
      id="customField"
      className="bg-gray-50 border-gray-300"
      aria-describedby={errors.customField ? "customField-error" : undefined}
      aria-invalid={!!errors.customField}
      {...register("customField")}
    />
  </FormControl>
  <FormMessage id="customField-error" error={errors.customField?.message} />
</FormItem>
```

### 5. Select with Dynamic Options
```tsx
<FormItem>
  <FormLabel htmlFor="country" required>Country</FormLabel>
  <FormControl>
    <Select onValueChange={(value) => setValue("country", value)}>
      <SelectTrigger
        id="country"
        aria-describedby={errors.country ? "country-error" : undefined}
        aria-invalid={!!errors.country}
      >
        <SelectValue placeholder="Select your country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map(country => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FormControl>
  <FormMessage id="country-error" error={errors.country?.message} />
</FormItem>
```

## AI Agent Best Practices

### 1. **Always Use Enhanced Components for Forms**
When creating forms, use these enhanced components and specify all accessibility attributes explicitly.

### 2. **Required Accessibility Pattern**
ALWAYS include these attributes for proper accessibility:
```tsx
// For input elements
<Input
  id="fieldName"
  aria-describedby={errors.fieldName ? "fieldName-error" : undefined}
  aria-invalid={!!errors.fieldName}
  {...register("fieldName")}
/>

// For labels
<FormLabel htmlFor="fieldName">Label Text</FormLabel>

// For error messages
<FormMessage id="fieldName-error" error={errors.fieldName?.message} />
```

### 3. **ID Consistency**
Always use consistent ID patterns:
- Input: `id="fieldName"`
- Label: `htmlFor="fieldName"`
- Help text: `id="fieldName-help"`
- Error message: `id="fieldName-error"`

### 4. **Complete aria-describedby**
When both help text and error messages are present:
```tsx
<Input
  id="email"
  aria-describedby="email-help email-error"
  aria-invalid={!!errors.email}
  {...register("email")}
/>
<FormDescription id="email-help">Help text</FormDescription>
<FormMessage id="email-error" error={errors.email?.message} />
```

### 5. **Error Handling**
Use explicit error prop on FormMessage:
```tsx
// Good - explicit error handling
<FormMessage id="email-error" error={errors.email?.message} />

// Wrong - don't manually render errors
{errors.email && <p className="error">{errors.email.message}</p>}
```

### 6. **Type Safety**
When using TypeScript, import types from the form schema:
```tsx
import { type FormData } from "@/lib/form-schema";
const form = useForm<FormData>({...});
```

## Code Generation Templates

### Complete Form Template
```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/explicit-form";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Checkbox } from "@/components/ui/...";
import { Button } from "@/components/ui/button";
import { formSchema, type FormData } from "@/lib/form-schema";

export function ExampleForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // default values here
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Text Input */}
      <FormItem>
        <FormLabel htmlFor="name" required>Full Name</FormLabel>
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
      
      {/* Select */}
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
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage id="category-error" error={errors.category?.message} />
      </FormItem>
      
      {/* Textarea */}
      <FormItem>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormControl>
          <Textarea
            id="description"
            aria-describedby={errors.description ? "description-error" : undefined}
            aria-invalid={!!errors.description}
            {...register("description")}
          />
        </FormControl>
        <FormMessage id="description-error" error={errors.description?.message} />
      </FormItem>
      
      {/* Checkbox */}
      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            id="agree"
            onCheckedChange={(checked) => setValue("agree", !!checked)}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel htmlFor="agree">I agree to the terms</FormLabel>
        </div>
      </FormItem>
      
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Error Handling Examples

### 1. Basic Error Display
```tsx
<FormItem>
  <FormLabel htmlFor="email" required>Email</FormLabel>
  <FormControl>
    <Input
      id="email"
      type="email"
      aria-describedby={errors.email ? "email-error" : undefined}
      aria-invalid={!!errors.email}
      {...register("email")}
    />
  </FormControl>
  <FormMessage id="email-error" error={errors.email?.message} />
</FormItem>
```

### 2. Custom Error Messages
```tsx
<FormItem>
  <FormLabel htmlFor="password" required>Password</FormLabel>
  <FormControl>
    <Input
      id="password"
      type="password"
      aria-describedby={errors.password ? "password-error" : undefined}
      aria-invalid={!!errors.password}
      {...register("password")}
    />
  </FormControl>
  <FormMessage 
    id="password-error" 
    error={errors.password?.message || customErrorMessage} 
  />
</FormItem>
```

### 3. Field-Specific Validation with Help Text
```tsx
<FormItem>
  <FormLabel htmlFor="username" required>Username</FormLabel>
  <FormControl>
    <Input
      id="username"
      aria-describedby="username-help username-error"
      aria-invalid={!!errors.username}
      {...register("username")}
    />
  </FormControl>
  <FormDescription id="username-help">
    Must be 3-20 characters, letters and numbers only
  </FormDescription>
  <FormMessage id="username-error" error={errors.username?.message} />
</FormItem>
```

## Common Pitfalls to Avoid

### 1. **Don't Forget ID and htmlFor Attributes**
```tsx
// Wrong - no accessibility connection
<FormLabel>Email</FormLabel>
<Input {...register("email")} />

// Correct - proper label association
<FormLabel htmlFor="email">Email</FormLabel>
<Input id="email" {...register("email")} />
```

### 2. **Don't Skip ARIA Attributes**
```tsx
// Wrong - missing accessibility attributes
<Input id="email" {...register("email")} />

// Correct - full accessibility setup
<Input
  id="email"
  aria-describedby={errors.email ? "email-error" : undefined}
  aria-invalid={!!errors.email}
  {...register("email")}
/>
```

### 3. **Don't Mix Standard and Enhanced Components**
```tsx
// Avoid mixing patterns in the same form
<FormField control={form.control} name="field1" render={...} />
<FormItem>...</FormItem>

// Use one pattern consistently - the enhanced approach
<FormItem>...</FormItem>
<FormItem>...</FormItem>
```

### 4. **Don't Forget Error Message IDs**
```tsx
// Wrong - error message without ID
<FormMessage error={errors.email?.message} />

// Correct - explicit ID for aria-describedby
<FormMessage id="email-error" error={errors.email?.message} />
```

### 5. **Don't Forget Required Indicators**
```tsx
// Good - shows asterisk for required fields
<FormLabel htmlFor="email" required>Email</FormLabel>

// Less clear - no visual indication
<FormLabel htmlFor="email">Email</FormLabel>
```

## Migration Examples

### From Standard shadcn/ui to Enhanced Components

**Before (Standard shadcn/ui):**
```tsx
<FormField
  control={form.control}
  name="storeName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Store Name</FormLabel>
      <FormControl>
        <Input placeholder="Enter store name" {...field} />
      </FormControl>
      <FormDescription>The name of your store</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

**After (Enhanced Components):**
```tsx
<FormItem>
  <FormLabel htmlFor="storeName" required>Store Name</FormLabel>
  <FormControl>
    <Input
      id="storeName"
      placeholder="Enter store name"
      aria-describedby="storeName-help storeName-error"
      aria-invalid={!!errors.storeName}
      {...register("storeName")}
    />
  </FormControl>
  <FormDescription id="storeName-help">
    The name of your store
  </FormDescription>
  <FormMessage id="storeName-error" error={errors.storeName?.message} />
</FormItem>
```

## Performance Tips

1. **Use defaultValues**: Always provide default values to prevent unnecessary re-renders
2. **Memoize options**: For select components, memoize options arrays
3. **Avoid inline functions**: Define event handlers outside render
4. **Batch updates**: Group related field updates together

## Testing Considerations

When writing tests for forms using these components:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input";

const TestForm = () => {
  const { register, formState: { errors } } = useForm();
  
  return (
    <FormInput
      name="testField"
      label="Test Field"
      register={register}
      error={errors.testField?.message}
    />
  );
};

test("renders form input with label", () => {
  render(<TestForm />);
  expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
});
```

Remember: These enhanced components use explicit prop specification to align with the team's architectural preferences. Always specify all accessibility attributes explicitly for the best accessibility and debugging experience. This approach provides full control while maintaining the shadcn/ui design system benefits.