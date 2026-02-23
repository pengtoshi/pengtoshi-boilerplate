import clsx from "clsx";
import { Text as RNText, type TextProps } from "react-native";

const TYPOGRAPHY_FONT_CLASS_MAP: Record<string, string> = {
  "text-28/title": "font-semiBold",
  "text-24/heading": "font-semiBold",
  "text-20/heading": "font-semiBold",
  "text-18/button": "font-medium",
  "text-18/heading": "font-semiBold",
  "text-16/button": "font-medium",
  "text-14/button": "font-medium",
  "text-16/body/emp": "font-medium",
  "text-16/body": "font-regular",
  "text-14/body/emp": "font-medium",
  "text-14/body": "font-regular",
  "text-12/body": "font-regular",
};

const EXPLICIT_FONT_CLASS_REGEX = /\bfont-(?:bold|semiBold|medium|regular)\b/;

const normalizeToken = (token: string) => {
  const lastSegment = token.split(":").pop() ?? token;
  return lastSegment.replace(/^!/, "");
};

const getAutoFontClassName = (className?: string) => {
  if (!className || EXPLICIT_FONT_CLASS_REGEX.test(className)) {
    return undefined;
  }

  const matchedToken = className
    .trim()
    .split(/\s+/)
    .find((token) => Boolean(TYPOGRAPHY_FONT_CLASS_MAP[normalizeToken(token)]));

  return matchedToken ? TYPOGRAPHY_FONT_CLASS_MAP[normalizeToken(matchedToken)] : undefined;
};

export const Text = ({ className, ...props }: TextProps) => {
  const autoFontClassName = getAutoFontClassName(className);

  return <RNText className={clsx(autoFontClassName, className)} {...props} />;
};
