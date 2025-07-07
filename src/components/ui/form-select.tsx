import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  register?: any; // React Hook Form register function
  required?: boolean;
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  ({ 
    name, 
    label, 
    description, 
    error, 
    register, 
    required = false,
    className,
    placeholder = "Select an option",
    options,
    defaultValue,
    onValueChange,
    ...props 
  }, ref) => {
    const errorId = error ? `${name}-error` : undefined;
    const descriptionId = description ? `${name}-description` : undefined;
    const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(" ");

    const [value, setValue] = React.useState(defaultValue || "");

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
      // Trigger React Hook Form's onChange if register is provided
      if (register) {
        const { onChange } = register(name);
        onChange({ target: { name, value: newValue } });
      }
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-1 after:text-red-500")}>
            {label}
          </Label>
        )}
        
        <Select
          value={value}
          onValueChange={handleValueChange}
          {...(register ? register(name) : {})}
        >
          <SelectTrigger 
            ref={ref}
            id={name}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={error ? "true" : "false"}
            className={cn(
              error && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
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

FormSelect.displayName = "FormSelect";