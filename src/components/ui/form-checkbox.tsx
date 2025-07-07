import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./explicit-form";

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
      <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
        <FormControl>
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
        </FormControl>
        
        <div className="space-y-1 leading-none">
          {label && (
            <FormLabel htmlFor={name} required={required}>
              {label}
            </FormLabel>
          )}
          
          {description && (
            <FormDescription id={descriptionId}>
              {description}
            </FormDescription>
          )}
        </div>
        
        <FormMessage id={errorId} error={error} />
      </FormItem>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";