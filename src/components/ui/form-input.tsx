import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

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
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-red-500")}>
            {label}
          </Label>
        )}
        
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
        
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";