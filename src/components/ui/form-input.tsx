import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./explicit-form";
import type { UseFormRegister, FieldValues, FieldPath } from "react-hook-form";

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  /** Field name for form registration */
  name: FieldPath<TFieldValues>;
  /** Display label for the input */
  label?: string;
  /** Help text displayed below the input */
  description?: string;
  /** Error message to display */
  error?: string;
  /** React Hook Form register function */
  register?: UseFormRegister<TFieldValues>;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** CSS class for the container FormItem */
  className?: string;
  /** CSS class for the input element */
  inputClassName?: string;
  /** Success state indicator */
  success?: boolean;
  /** Warning state indicator */
  warning?: boolean;
}

function FormInputComponent<TFieldValues extends FieldValues = FieldValues>(
  {
    name, 
    label, 
    description, 
    error, 
    register, 
    required = false,
    className,
    inputClassName,
    success = false,
    warning = false,
    ...props 
  }: FormInputProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
    const errorId = error ? `${name}-error` : undefined;
    const descriptionId = description ? `${name}-description` : undefined;
    const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(" ");

    // Determine validation state styling
    const getValidationStyles = () => {
      if (error) {
        return "border-destructive focus-visible:ring-destructive";
      }
      if (warning) {
        return "border-yellow-500 focus-visible:ring-yellow-500";
      }
      if (success) {
        return "border-green-500 focus-visible:ring-green-500";
      }
      return "";
    };

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
              getValidationStyles(),
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

export const FormInput = React.forwardRef(FormInputComponent) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormInputProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;