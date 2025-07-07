import * as React from "react";
import { cn } from "@/lib/utils";

// FormItem - Simple container with spacing, no context
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    );
  }
);
FormItem.displayName = "FormItem";

// FormLabel - Explicit label with required indicator, manual htmlFor
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          required && "after:content-['*'] after:ml-1 after:text-red-500",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";

// FormControl - Simple wrapper, no automatic props injection
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props} />
    );
  }
);
FormControl.displayName = "FormControl";

// FormDescription - Help text with explicit id prop
interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

// FormMessage - Error message with explicit id prop and error handling
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string;
}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, error, children, ...props }, ref) => {
    // Show error prop or children, but only if there's content
    const content = error || children;
    
    if (!content) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={cn("text-sm text-red-500 font-medium", className)}
        {...props}
      >
        {content}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";