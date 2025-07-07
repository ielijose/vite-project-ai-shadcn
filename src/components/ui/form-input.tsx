import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./explicit-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  register?: any; // React Hook Form register function
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    name, 
    label, 
    description, 
    error, 
    register, 
    required = false,
    className,
    inputClassName,
    ...props 
  }, ref) => {
    const errorId = error ? `${name}-error` : undefined;
    const descriptionId = description ? `${name}-description` : undefined;
    const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(" ");

    return (
      <FormItem className={className}>
        {label && (
          <FormLabel htmlFor={name} required={required}>
            {label}
          </FormLabel>
        )}
        
        <FormControl>
          <Input
            ref={ref}
            id={name}
            name={name}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={error ? "true" : "false"}
            className={cn(
              error && "border-red-500 focus-visible:ring-red-500",
              inputClassName
            )}
            {...(register ? register(name) : {})}
            {...props}
          />
        </FormControl>
        
        {description && (
          <FormDescription id={descriptionId}>
            {description}
          </FormDescription>
        )}
        
        <FormMessage id={errorId} error={error} />
      </FormItem>
    );
  }
);

FormInput.displayName = "FormInput";