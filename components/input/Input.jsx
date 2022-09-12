import React from "react";
import classNames from "classnames";

const iconClass =
  "absolute text-lg fill-current top-1/2 transform -translate-y-1/2 w-5";

const sizeClassNames = {
  small: "py-1.5 px-4 text-sm",
  medium: "py-2.5 px-5 text-sm",
  large: "py-3 px-6",
};

const InputField = React.forwardRef(
  (
    {
      className,
      leftIcon,
      rightIcon,
      label,
      fullWidth = false,
      size = "medium",
      controlId,
      onValueChange,
      type = "text",
      error,
      ...props
    },
    forwardedRef
  ) => {
    const onInput = (event) => {
      const { value } = event.currentTarget;

      if (onValueChange) {
        onValueChange(value);
      }
    };

    return (
      <div
        className={classNames(
          { "inline-flex flex-col": !fullWidth },
          className
        )}
      >
        {label && (
          <label
            className={classNames(
              "block text-sm font-bold mb-1 tracking-wide",
              { "cursor-pointer": controlId }
            )}
            htmlFor={controlId}
          >
            {label}
          </label>
        )}
        <div className="relative flex-1">
          {leftIcon && (
            <span className={classNames(iconClass, "left-2")}>{leftIcon}</span>
          )}
          <input
            id={controlId}
            onInput={onInput}
            ref={forwardedRef}
            type={type}
            {...props}
            className={classNames(
              "bg-transparent",
              "border-gray-500 border-2",
              "focus:ring-0",
              "placeholder-gray-500",
              sizeClassNames[size],
              { "pl-8": leftIcon },
              { "pr-8": rightIcon },
              "rounded-default",
              "w-full",
              "h-full",
              error ? "focus:border-red-400" : "focus:border-primary"
            )}
          />
          {rightIcon && (
            <span className={classNames(iconClass, "right-2")}>
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <div className="text-red-400 ml-1 mt-0.5 flex-1 text-xs" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
