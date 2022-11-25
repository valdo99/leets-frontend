import cx from "classnames";
import {
  forwardRef,
  TextareaHTMLAttributes,
  ReactNode,
  Ref,
  useId,
} from "react";

const iconClass =
  "absolute top-1/2 transform -translate-y-1/2 [&>svg]:max-w-min";

const variantClassName = {
  solid: "border-base-200 bg-base-200",
  bordered: "border-base-200 bg-transparent",
  ghost: "textarea-ghost disabled:bg-transparent",
};

const sizeClassName = {
  xs: "textarea-xs min-w-[4.55rem] px-3.5",
  sm: "textarea-sm min-w-[5.2rem] px-4",
  md: "min-w-[6.5rem] px-5",
  lg: "textarea-lg min-w-[7.8rem] px-6",
};

const iconSizeClassName = {
  xs: "[&>svg]:max-h-4",
  sm: "[&>svg]:max-h-4",
  md: "[&>svg]:max-h-6",
  lg: "[&>svg]:max-h-6",
};

export interface BaseTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  variant?: keyof typeof variantClassName;
  size?: keyof typeof sizeClassName;
  placeholder?: string;
  label?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  block?: boolean;
  error?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export type TextareaProps = BaseTextareaProps & {
  ref?: Ref<HTMLTextAreaElement>;
};

export const Textarea = forwardRef(
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
      block,
      error,
      className,
      onValueChange,
      onChange: baseOnChange,
      ...props
    }: TextareaProps,
    ref?: Ref<HTMLTextAreaElement>
  ) => {
    const id = useId();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      onValueChange?.(value);
      baseOnChange?.(event);
    };

    return (
      <div
        className={cx(
          "form-control relative",
          { "inline-flex flex-col": !block },
          className
        )}
      >
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
              iconSizeClassName[size],
              "left-3 text-base-content-neutral"
            )}
          >
            {leftIcon}
          </span>
        )}
        <textarea
          {...props}
          id={id}
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          className={cx(
            "textarea block",
            "border-2",
            "text-base-content",
            "placeholder:text-base-content-neutral",
            "focus:outline-none focus:border-primary focus:ring-0",
            "w-full",
            variantClassName[variant],
            sizeClassName[size],
            { "pl-11": leftIcon },
            { "pr-11": rightIcon },
            { "border-2 border-error focus:ring-error": error }
          )}
        />
        {rightIcon && (
          <span
            className={cx(
              iconClass,
              iconSizeClassName[size],
              "right-3 text-base-content-neutral"
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

Textarea.displayName = "Textarea";
