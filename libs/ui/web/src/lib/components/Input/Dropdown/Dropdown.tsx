import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DropdownListText } from "./Dropdown.element";
import type { UIProps } from "../../../props";
import { Interaction } from "../../Display/Interaction/Interaction";
import { Icon } from "../../Icon/Icon";

export interface DropdownProps<T> extends Omit<UIProps.Div, "onSelect"> {
  options: T[];
  onSelect: (option: T) => void;
  renderOption?: (option: T) => React.ReactNode;
  disabled?: boolean;
  guide?: string;
  error?: string;
}

export const Dropdown = <T extends string | number>({
  options,
  onSelect,
  renderOption,
  guide,
  error,
  disabled = false,
  className,
  ...props
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: T) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx("flex w-60 flex-col items-start gap-1.5 text-14/body", className)}
      {...props}
    >
      <div className="relative inline-block w-full">
        <button
          type="button"
          className={clsx(
            "group relative flex h-10 w-full items-center justify-between gap-2 rounded-md border px-4",
            "border-line-normal bg-white focus:border-primary-normal dark:border-dark-line-normal dark:bg-black dark:focus:border-dark-primary-normal",
            selected
              ? "text-label-normal dark:text-dark-label-normal"
              : "text-label-placeholder dark:!text-dark-label-placeholder",
            disabled &&
              "cursor-not-allowed bg-background-disabled text-label-disabled dark:bg-dark-background-disabled dark:text-dark-label-disabled",
          )}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          {!disabled && <Interaction />}
          {selected ? selected.toString() : "Select an option"}
          <Icon
            component={ChevronDownIcon}
            size={20}
            className={clsx(
              "text-label-normal transition-transform duration-500 dark:text-dark-label-normal",
              isOpen && "rotate-180",
            )}
          />
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-2 w-full rounded-md border border-line-normal bg-white p-1 shadow-emphasize dark:border-dark-line-normal dark:bg-black">
            {options.map((option, index) => (
              <DropdownListText<T>
                key={index}
                option={option}
                onSelect={handleSelect}
                selected={selected}
                renderOption={renderOption}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-0.5">
        {!!guide && <div className="text-12/body text-label-assertive dark:text-dark-label-assertive">{guide}</div>}
        {!!error && <div className="text-12/body text-status-negative dark:text-dark-status-negative">{error}</div>}
      </div>
    </div>
  );
};
