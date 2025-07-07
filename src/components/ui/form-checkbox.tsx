import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

interface FormCheckboxProps {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  register?: any; // React Hook Form register function
  required?: boolean;
  className?: string;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const FormCheckbox = React.forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ 
    name, 
    label, 
    description, 
    error, 
    register, 
    required = false,
    className,
    defaultChecked = false,
    onCheckedChange,
    ...props 
  }, ref) => {
    const errorId = error ? `${name}-error` : undefined;
    const descriptionId = description ? `${name}-description` : undefined;
    const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(" ");

    const [checked, setChecked] = React.useState(defaultChecked);

    const handleCheckedChange = (newChecked: boolean) => {
      setChecked(newChecked);
      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }
      // Trigger React Hook Form's onChange if register is provided
      if (register) {
        const { onChange } = register(name);
        onChange({ target: { name, checked: newChecked } });
      }
    };

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center space-x-2">
          <Checkbox
            ref={ref}
            id={name}
            name={name}
            checked={checked}
            onCheckedChange={handleCheckedChange}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={error ? "true" : "false"}
            className={cn(
              error && "border-red-500 focus-visible:ring-red-500"
            )}
            {...(register ? register(name) : {})}
            {...props}
          />
          
          {label && (
            <Label 
              htmlFor={name} 
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                required && "after:content-['*'] after:ml-1 after:text-red-500"
              )}
            >
              {label}
            </Label>
          )}
        </div>
        
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground ml-6">
            {description}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="text-sm text-red-500 font-medium ml-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";