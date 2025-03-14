// import * as React from "react"
// import * as LabelPrimitive from "@radix-ui/react-label"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/lib/utils"

// const labelVariants = cva(
//   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// )

// const Label = React.forwardRef<
//   React.ElementRef<typeof LabelPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
//     VariantProps<typeof labelVariants>
// >(({ className, ...props }, ref) => (
//   <LabelPrimitive.Root
//     ref={ref}
//     className={cn(labelVariants(), className)}
//     {...props}
//   />
// ))
// Label.displayName = LabelPrimitive.Root.displayName

// export { Label }
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva("text-sm font-medium leading-none", {})

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  asChild?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp ref={ref} className={cn(labelVariants(), className)} {...props}>
        {children}
      </Comp>
    );
  }
);

Label.displayName = "Label"

export { Label }
