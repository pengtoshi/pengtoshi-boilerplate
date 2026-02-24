import clsx from "clsx";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "../../Icon/Icon";

export interface ThemeSwitchProps {
  size?: "small" | "medium";
  className?: string;
  disabled?: boolean;
}

const SwitchSize = {
  toggle: {
    small: "h-[14px] w-[14px]",
    medium: "h-[22px] w-[22px]",
  },
  container: {
    small: "h-[18px] w-8",
    medium: "h-[26px] w-12",
  },
};

const getTranslateClass = (isDark: boolean, size: "small" | "medium") => {
  if (!isDark) return "translate-x-0";
  return size === "medium" ? "translate-x-[22px]" : "translate-x-[14px]";
};

export const ThemeSwitch = ({ size = "medium", className, disabled }: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={toggleTheme}
      className={clsx(
        isDark ? "bg-dark-background-disabled" : "bg-background-disabled",
        "relative flex-shrink-0 overflow-hidden rounded-full transition-all duration-300 disabled:opacity-40",
        SwitchSize.container[size],
        className,
      )}
    >
      {/* Light mode icon */}
      <Icon
        component={SunIcon}
        size={size === "medium" ? 14 : 10}
        className={clsx(
          isDark ? "opacity-0" : "opacity-100",
          "pointer-events-none absolute top-1/2 -translate-y-1/2 !text-dark-label-assertive transition-all duration-300",
          size === "medium" ? "right-1.5" : "right-1",
        )}
        aria-hidden={isDark}
      />

      {/* Dark mode icon */}
      <Icon
        component={MoonIcon}
        size={size === "medium" ? 14 : 10}
        className={clsx(
          isDark ? "opacity-100" : "opacity-0",
          "pointer-events-none absolute top-1/2 -translate-y-1/2 !text-label-assertive transition-all duration-300",
          size === "medium" ? "left-1.5" : "left-1",
        )}
        aria-hidden={!isDark}
      />

      {/* Toggle circle */}
      <div
        className={clsx(
          isDark ? "bg-dark-normal" : "bg-normal",
          "absolute left-0.5 top-0.5 rounded-full transition-all duration-300",
          SwitchSize.toggle[size],
          getTranslateClass(isDark, size),
        )}
      />
    </button>
  );
};
