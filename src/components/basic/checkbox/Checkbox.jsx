import React from "react";
import classNames from "classnames";

const Checkbox = ({
  checked,
  onChange: baseOnChange,
  label,
  className,
  id,
  onValueChange,
  ...props
}) => {
  const onChange = (event) => {
    const { checked } = event.target;

    if (onValueChange) {
      onValueChange(checked);
    }

    if (baseOnChange) {
      baseOnChange(event);
    }
  };

  return (
    <label
      htmlFor={id}
      className={classNames(
        "inline-flex items-center cursor-pointer select-none",
        className
      )}
    >
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className={classNames(
          "cursor-pointer",
          "rounded-md",
          "w-5 h-5",
          "bg-transparent",
          "border-gray-500 border-2",
          "text-primary",
          "focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50"
        )}
        {...props}
      />
      {label && (
        <span
          className={classNames(
            "ml-2 select-none text-sm",
            checked ? "opacity-100" : "opacity-60 hover:opacity-100"
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
