import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                suppressHydrationWarning
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-[40px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
                    {
                        "bg-foreground text-background hover:bg-foreground/90": variant === "default",
                        "border border-border-light bg-transparent hover:bg-background/80 text-foreground": variant === "outline",
                        "hover:bg-primary-50 text-foreground": variant === "ghost",
                        "text-accent underline-offset-4 hover:underline shadow-none bg-transparent hover:shadow-none": variant === "link",
                        "h-10 px-6 py-2 text-sm": size === "default",
                        "h-8 px-4 text-xs": size === "sm",
                        "padding-[14px_32px] h-14 px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
