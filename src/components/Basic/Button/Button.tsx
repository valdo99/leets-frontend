import cx from "classnames";
import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";

const colorClassName = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
};

const ringClassName = {
  primary: "focus:ring-primary",
  secondary: "focus:ring-secondary",
  accent: "focus:ring-accent",
  info: "focus:ring-info",
  success: "focus:ring-success",
  warning: "focus:ring-warning",
  error: "focus:ring-error",
};

const sizeClassname = {
  xs: "btn-xs min-w-[4.9875rem] h-7 px-3.5",
  sm: "btn-sm min-w-[5.7rem] h-8 px-4",
  md: "min-w-[7.125rem] h-10 px-5",
  lg: "btn-lg min-w-[8.55rem] h-12 px-6",
};

const textColorClassName = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const variantClassName = {
  solid: "",
  outline: "btn-outline",
  ghost: "btn-ghost disabled:bg-transparent disabled:text-opacity-30",
  link: "btn-link disabled:bg-transparent disabled:text-opacity-30",
};

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: keyof typeof colorClassName;
  size?: keyof typeof sizeClassname;
  variant?: keyof typeof variantClassName;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export type ButtonProps = BaseButtonProps & {
  ref?: Ref<HTMLButtonElement>;
};

export const Button = forwardRef(
  (
    {
      children,
      color = "primary",
      size = "md",
      variant = "solid",
      block,
      disabled,
      loading,
      leftIcon,
      rightIcon,
      className,
      ...props
    }: ButtonProps,
    ref?: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        className={twMerge(
          cx(
            "btn min-h-0 animate-none",
            // Solid and outline variants can affect background, text and border color
            {
              [colorClassName[color]]:
                variant === "solid" || variant === "outline",
            },
            // Ghost and link variants only affect text color
            {
              [textColorClassName[color]]:
                (variant === "ghost" || variant === "link") && !disabled,
            },
            variantClassName[variant],
            ringClassName[color],
            sizeClassname[size],
            { "w-full": block },
            "disabled:cursor-not-allowed disabled:pointer-events-auto disabled:active:transform-none",
            { "loading cursor-not-allowed pointer-events-auto": loading },
            { "space-x-2": leftIcon || rightIcon },
            "focus:outline-none focus-visible:ring-4 focus:ring-opacity-50",
            className
          )
        )}
      >
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
