import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Root components
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// Overlay
const AlertDialogOverlay = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...rest}
    />
  );
});
AlertDialogOverlay.displayName = "AlertDialogOverlay";

// Content
const AlertDialogContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out sm:rounded-lg",
          className
        )}
        {...rest}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

// Header
const AlertDialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

// Footer
const AlertDialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

// Title
const AlertDialogTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...rest} />;
});
AlertDialogTitle.displayName = "AlertDialogTitle";

// Description
const AlertDialogDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";

// Action button
const AlertDialogAction = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...rest} />;
});
AlertDialogAction.displayName = "AlertDialogAction";

// Cancel button
const AlertDialogCancel = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
      {...rest}
    />
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";

// Exports
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
