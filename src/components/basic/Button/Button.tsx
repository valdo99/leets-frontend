import cx from "classnames";
import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from "react";

const colorClassName = {
  primary: "btn-primary focus:ring-primary",
  secondary: "btn-secondary focus:ring-secondary",
  accent: "btn-accent focus:ring-accent",
  info: "btn-info focus:ring-info",
  success: "btn-success focus:ring-success",
  warning: "btn-warning focus:ring-warning",
  error: "btn-error focus:ring-error",
};

const sizeClassname = {
  xs: "btn-xs min-w-[4.9875rem] h-7 px-3.5",
  sm: "btn-sm min-w-[5.7rem] h-8 px-4",
  md: "min-w-[7.125rem] h-10 px-5",
  lg: "btn-lg min-w-[8.55rem] h-12 px-6",
};

const textColorClassname = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const variantClassname = {
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
  variant?: keyof typeof variantClassname;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

type ButtonProps = BaseButtonProps & {
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
        className={cx(
          "btn min-h-0 animate-none",
          // Solid and outline variants can affect background, text and border color
          {
            [colorClassName[color]]:
              variant === "solid" || variant === "outline",
          },
          // Ghost and link variants only affect text color
          {
            [textColorClassname[color]]:
              (variant === "ghost" || variant === "link") && !disabled,
          },
          variantClassname[variant],
          sizeClassname[size],
          { "w-full": block },
          "disabled:cursor-not-allowed disabled:pointer-events-auto disabled:active:transform-none",
          { "loading cursor-not-allowed pointer-events-auto": loading },
          { "gap-2": leftIcon || rightIcon },
          "focus:outline-none focus:ring-4 focus:ring-opacity-50",
          className
        )}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
