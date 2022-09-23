import cx from "classnames";
import { forwardRef, InputHTMLAttributes, ReactNode, Ref, useId } from "react";

const iconClass =
  "absolute top-1/2 transform -translate-y-1/2 [&>svg]:max-w-min";

const variantClassname = {
  solid: "border-base-300 bg-base-300",
  bordered: "border-base-300 bg-transparent",
  ghost: "input-ghost disabled:bg-transparent",
};

const sizeClassname = {
  xs: "input-xs min-w-[4.55rem] h-7 px-3.5",
  sm: "input-sm min-w-[5.2rem] h-8 px-4",
  md: "min-w-[6.5rem] h-10 px-5",
  lg: "input-lg min-w-[7.8rem] h-12 px-6",
};

export interface BaseInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "onChange"
  > {
  variant?: keyof typeof variantClassname;
  size?: keyof typeof sizeClassname;
  placeholder?: string;
  label?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  error?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

type InputProps = BaseInputProps & {
  ref?: Ref<HTMLInputElement>;
};

export const Input = forwardRef(
  (
    {
      variant = "solid",
      size = "md",
      placeholder,
      label,
      topRightLabel,
      bottomLeftLabel,
      bottomRightLabel,
      leftIcon,
      rightIcon,
      disabled,
      error,
      className,
      onValueChange,
      ...props
    }: InputProps,
    ref?: Ref<HTMLInputElement>
  ) => {
    const id = useId();

    const maxIconSize =
      size === "xs" || size === "sm" ? "[&>svg]:max-h-4" : "[&>svg]:max-h-6";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      onValueChange?.(value);
    };

    return (
      <div className={cx("form-control relative", className)}>
        {(label || topRightLabel) && (
          <label className="label py-1.5">
            {label && <span className="label-text font-medium">{label}</span>}
            {topRightLabel && (
              <span className="label-text-alt font-medium text-base-content">
                {topRightLabel}
              </span>
            )}
          </label>
        )}
        {leftIcon && (
          <span
            className={cx(
              iconClass,
              maxIconSize,
              "left-3 text-base-content/50"
            )}
          >
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          id={id}
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          className={cx(
            "input",
            "border-2",
            "text-base-content",
            "placeholder:text-base-content/50",
            "focus:outline-none focus:border-primary",
            "w-full",
            variantClassname[variant],
            sizeClassname[size],
            { "pl-11": leftIcon },
            { "pr-11": rightIcon },
            { "border-2 border-error focus:ring-error": error }
          )}
        />
        {rightIcon && (
          <span
            className={cx(
              iconClass,
              maxIconSize,
              "right-3 text-base-content/50"
            )}
          >
            {rightIcon}
          </span>
        )}
        {(bottomLeftLabel || bottomRightLabel) && (
          <label className="label py-1.5">
            {bottomLeftLabel && (
              <span className="label-text-alt font-medium text-base-content">
                {bottomLeftLabel}
              </span>
            )}
            {bottomRightLabel && (
              <span className="label-text-alt font-medium text-base-content">
                {bottomRightLabel}
              </span>
            )}
          </label>
        )}
        {error && (
          <label className="label py-1.5">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
