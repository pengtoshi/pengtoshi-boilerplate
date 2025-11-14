import clsx from "clsx";
import type { UIProps } from "../../../props";
import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from "../../../shadcn/ui/tabs";

export interface TabsProps extends UIProps.Div {
  elements: {
    label: string;
    value: string;
    default?: boolean;
    disabled?: boolean;
    content?: React.ReactNode;
  }[];
}

export const Tabs = ({ elements, className, ...props }: TabsProps) => {
  const defaultValue = elements.find((element) => element.default)?.value ?? elements[0]?.value;
  return (
    <div className={clsx("flex w-full flex-col gap-6", className)} {...props}>
      <ShadcnTabs defaultValue={defaultValue}>
        <TabsList>
          {elements.map((element) => (
            <TabsTrigger key={element.value} value={element.value} disabled={element.disabled}>
              {element.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {elements.map((element) => (
          <TabsContent key={element.value} value={element.value}>
            {element.content}
          </TabsContent>
        ))}
      </ShadcnTabs>
    </div>
  );
};
