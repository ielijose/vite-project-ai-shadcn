import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./explicit-form";
import type { UseFormRegister, FieldValues, FieldPath } from "react-hook-form";

interface FormTextareaProps<TFieldValues extends FieldValues = FieldValues> 
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  error?: string;
  register?: UseFormRegister<TFieldValues>;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
}

function FormTextareaComponent<TFieldValues extends FieldValues = FieldValues>(
  {
    name, 
    label, 
    description, 
    error, 
    register, 
    required = false,
    className,
    textareaClassName,
    ...props 
  }: FormTextareaProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
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
          <Textarea
            ref={ref}
            id={name}
            name={name}
            aria-describedby={ariaDescribedBy || undefined}
            aria-invalid={error ? "true" : "false"}
            className={cn(
              error && "border-red-500 focus-visible:ring-red-500",
              textareaClassName
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

export const FormTextarea = React.forwardRef(FormTextareaComponent) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormTextareaProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLTextAreaElement> }
) => React.ReactElement;