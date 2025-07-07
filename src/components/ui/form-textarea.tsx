import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";
import { Label } from "./label";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  register?: any; // React Hook Form register function
  required?: boolean;
  className?: string;
  textareaClassName?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ 
    name, 
    label, 
    description, 
    error, 
    register, 
    required = false,
    className,
    textareaClassName,
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

FormTextarea.displayName = "FormTextarea";