import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define the base styles for the label
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

// Create the Label component using React.forwardRef
const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...rest} />;
});

Label.displayName = "Label";

export { Label };
