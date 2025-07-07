import * as React from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./explicit-form";
import type { UseFormRegister, FieldValues, FieldPath } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  error?: string;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function FormSelectComponent<TFieldValues extends FieldValues = FieldValues>(
  {
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
  }: FormSelectProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
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
      <FormItem className={className}>
        {label && (
          <FormLabel htmlFor={name} required={required}>
            {label}
          </FormLabel>
        )}
        
        <FormControl>
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

export const FormSelect = React.forwardRef(FormSelectComponent) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormSelectProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => React.ReactElement;