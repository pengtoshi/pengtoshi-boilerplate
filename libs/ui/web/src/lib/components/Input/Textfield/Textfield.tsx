import clsx from "clsx";
import React, { forwardRef, useEffect, useId, useState } from "react";
import type { UIProps } from "../../../props";

export interface TextFieldProps extends UIProps.Input {
  id?: string;
  type?: "number" | "text";
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  guide?: string;
  isError?: boolean;
  errorGuide?: string | React.ReactNode;
  onClear?: () => void;
}

const getDefaultValue = (type?: "number" | "text", value?: string | number, defaultValue?: string | number) => {
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  if (type === "number") return 0;
  return "";
};

const fieldCommon =
  "flex h-10 px-4 gap-2.5 items-center justify-between self-stretch rounded-md border border-line-normal dark:border-dark-line-normal autofill-hide transition-all duration-300";
const inputCommon = "text-14/body peer w-full self-stretch overflow-ellipsis bg-transparent focus:outline-none";
const fieldColor =
  "bg-background-strong dark:bg-dark-background-strong hover:bg-normal dark:hover:bg-dark-normal focus-within:border-primary-normal dark:focus-within:border-dark-primary-normal focus-within:bg-normal dark:focus-within:bg-dark-normal";
const textColor =
  "text-label-normal dark:text-dark-label-normal placeholder:text-label-placeholder dark:placeholder:text-dark-label-placeholder disabled:text-label-disabled dark:disabled:text-dark-label-disabled";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function Textfield(
  {
    id,
    type = "text",
    label,
    leadingIcon,
    trailingIcon,
    placeholder,
    value,
    defaultValue,
    guide,
    isError,
    errorGuide,
    required,
    disabled = false,
    onChange,
    className,
    ...props
  },
  ref,
) {
  const localId = `ui-${useId()}`;
  const inputId = id || localId;

  const [internalValue, setInternalValue] = useState(getDefaultValue(type, value, defaultValue));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  return (
    <div className={clsx("flex w-full flex-col items-start gap-1.5", className)}>
      <div
        className={clsx(
          fieldCommon,
          fieldColor,
          isError && "border-status-negative dark:border-dark-status-negative",
          disabled && "!bg-background-disabled dark:!bg-dark-background-disabled",
        )}
      >
        {!!leadingIcon && leadingIcon}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          type={type}
          value={internalValue}
          onChange={handleChange}
          className={clsx(inputCommon, textColor)}
          {...props}
        />
        {!!trailingIcon && trailingIcon}
      </div>
      <div className="flex w-full flex-col items-start gap-0.5">
        {!!guide && <div className="text-12/body text-label-assertive dark:text-dark-label-assertive">{guide}</div>}
        {!!errorGuide &&
          (typeof errorGuide === "string" ? (
            <div className="text-12/body text-status-negative dark:text-dark-status-negative">{errorGuide}</div>
          ) : (
            errorGuide
          ))}
      </div>
    </div>
  );
});
