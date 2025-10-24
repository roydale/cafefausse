import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Root component
const Accordion = AccordionPrimitive.Root;

// Accordion Item (no TypeScript generics)
const AccordionItem = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...rest} />;
});
AccordionItem.displayName = "AccordionItem";

// Accordion Trigger
const AccordionTrigger = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:bg-accent data-[state=open]:rotate-180",
          className
        )}
        {...rest}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content
const AccordionContent = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...rest}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
