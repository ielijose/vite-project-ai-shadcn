import * as React from "react";
import { cn } from "@/lib/utils";

// Context for automatic accessibility connections
interface FormItemContextValue {
  id: string;
  errorId?: string;
  descriptionId?: string;
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

// FormItem - Container with spacing and context
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string; // Optional: for automatic ID generation
}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, name, ...props }, ref) => {
    const id = React.useId();
    const itemId = name || id;
    
    const context = React.useMemo(
      () => ({
        id: itemId,
        errorId: `${itemId}-error`,
        descriptionId: `${itemId}-description`,
      }),
      [itemId]
    );

    return (
      <FormItemContext.Provider value={context}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

// FormLabel - Accessible label with required indicator
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { id } = React.useContext(FormItemContext);

    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          required && "after:content-['*'] after:ml-1 after:text-red-500",
          className
        )}
        htmlFor={id}
        {...props}
      >
        {children}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";

// FormControl - Wrapper that adds accessibility attributes
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ ...props }, ref) => {
    const { id, errorId, descriptionId } = React.useContext(FormItemContext);
    
    return (
      <div ref={ref} {...props}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              id,
              "aria-describedby": [
                child.props["aria-describedby"],
                errorId,
                descriptionId,
              ]
                .filter(Boolean)
                .join(" ") || undefined,
              "aria-invalid": !!props["data-error"] || undefined,
              ...child.props,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
FormControl.displayName = "FormControl";

// FormDescription - Help text
interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = React.useContext(FormItemContext);

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

// FormMessage - Error message with automatic styling
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string;
}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, error, children, ...props }, ref) => {
    const { errorId } = React.useContext(FormItemContext);
    
    // Show error prop or children, but only if there's content
    const content = error || children;
    
    if (!content) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={errorId}
        className={cn("text-sm text-red-500 font-medium", className)}
        {...props}
      >
        {content}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";