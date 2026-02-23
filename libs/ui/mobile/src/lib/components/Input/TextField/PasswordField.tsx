import clsx from "clsx";
import { CheckCircle2, Eye, EyeOff, XCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";
import { Text } from "../../Display/Text/Text";
import { AnimatedColorIcon, Icon } from "../../Icon/Icon";

export type PasswordRule = {
  id: string;
  label: string;
  regex: RegExp;
};

export const DEFAULT_PASSWORD_RULES: PasswordRule[] = [
  { id: "len", label: "8자 이상", regex: /^.{8,}$/ },
  { id: "letter", label: "영문 포함", regex: /[A-Za-z]/ },
  { id: "digit", label: "숫자 포함", regex: /\d/ },
  { id: "symbol", label: "특수문자 포함", regex: /[^A-Za-z0-9]/ },
];

export type PasswordFieldProps = Omit<TextFieldProps, "secureTextEntry" | "trailingIcon" | "keyboardType"> & {
  hiddenByDefault?: boolean;
  rules?: PasswordRule[];
};

const PasswordRuleIndicator = ({ rule, password }: { rule: PasswordRule; password: string }) => {
  const passed = rule.regex.test(password);

  return (
    <View className="flex-row items-center gap-[4px]">
      <AnimatedColorIcon
        component={passed ? CheckCircle2 : XCircle}
        size={14}
        fromColor="#FF4242"
        toColor="#00BF40"
        active={passed}
        duration={200}
      />
      <Text
        className={clsx(
          "text-12/body transition-colors duration-300",
          passed ? "text-status-positive" : "text-status-negative",
        )}
      >
        {rule.label}
      </Text>
    </View>
  );
};

export const PasswordFieldRulesGuide = ({ rules, password }: { rules: PasswordRule[]; password: string }) => {
  return (
    <View className="w-full flex-row flex-wrap gap-3">
      {rules.map((rule) => (
        <PasswordRuleIndicator key={rule.id} rule={rule} password={password} />
      ))}
    </View>
  );
};

export const PasswordField = ({
  hiddenByDefault = true,
  rules,
  value,
  defaultValue,
  onChangeText,
  guide,
  isError: isInitialError = false,
  errorGuide: initialErrorGuide,
  ...props
}: PasswordFieldProps) => {
  const [isHidden, setIsHidden] = useState(hiddenByDefault);
  const [password, setPassword] = useState(value ?? defaultValue ?? "");

  useEffect(() => {
    if (value === undefined) return;
    setPassword(value);
  }, [value]);

  const handleChangeText = (nextValue: string) => {
    setPassword(nextValue);
    onChangeText?.(nextValue);
  };

  const IconComponent = isHidden ? EyeOff : Eye;

  const showRules = !!rules?.length && password.length > 0;
  const hasRuleError = showRules && !!rules?.some((rule) => !rule.regex.test(password));
  const isError = isInitialError || hasRuleError;

  const errorGuide =
    initialErrorGuide ??
    (showRules && rules ? <PasswordFieldRulesGuide rules={rules} password={password} /> : undefined);

  return (
    <View className="w-full">
      <TextField
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={isHidden}
        keyboardType="default"
        value={password}
        defaultValue={undefined}
        onChangeText={handleChangeText}
        guide={showRules ? undefined : guide}
        isError={isError}
        errorGuide={errorGuide}
        trailingIcon={
          <Pressable
            accessibilityLabel={isHidden ? "Show password" : "Hide password"}
            accessibilityRole="button"
            className="rounded-md px-[4px] py-[2px] active:opacity-70"
            onPress={() => setIsHidden((prev) => !prev)}
          >
            <Icon component={IconComponent} size={20} color="#6F6F6F" />
          </Pressable>
        }
        {...props}
      />
    </View>
  );
};
