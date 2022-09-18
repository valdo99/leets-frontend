import React from "react";
import classNames from "classnames";
import Spinner from "@components/Spinner";

const variantClassNames = {
  primary:
    "text-text-secondary bg-primary hover:bg-primary-hover disabled:bg-primary",
  secondary: "text-gray-800 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200",
};

const sizeClassNames = {
  small: "py-1.5 px-4 text-sm",
  medium: "py-2.5 px-5 text-sm",
  large: "py-3 px-6",
};

const Button = React.forwardRef(
  (
    {
      children,
      leftIcon,
      rightIcon,
      variant = "primary",
      size = "medium",
      disabled,
      loading,
      as: Tag = "button",
      fullWidth,
      className,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Tag
        {...props}
        aria-busy={loading}
        disabled={disabled || loading}
        ref={forwardedRef}
        className={classNames(
          variantClassNames[variant],
          sizeClassNames[size],
          "rounded-default",
          "focus-visible:outline-none",
          "focus-visible:ring-4",
          "ring-primary ring-opacity-50",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "relative",
          "inline-flex",
          "items-center",
          "justify-center",
          "cursor-pointer",
          { "w-full": fullWidth },
          className
        )}
      >
        <span
          className={classNames("flex justify-center items-center gap-2", {
            "opacity-0": loading,
          })}
        >
          {leftIcon && <span className="fill-current w-5">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="fill-current w-5">{rightIcon}</span>}
        </span>
        {loading && <Spinner className="animate-spin w-4 absolute" />}
      </Tag>
    );
  }
);

Button.displayName = "Button";

export default Button;
