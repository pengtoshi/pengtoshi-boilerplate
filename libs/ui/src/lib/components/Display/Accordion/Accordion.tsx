import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "../../../shadcn/ui/accordion";

export interface AccordionProps {
  items: {
    label?: string;
    value?: string;
    content?: React.ReactNode;
  }[];
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <ShadcnAccordion type="single" collapsible className="w-full" defaultValue={items[0]?.value ?? "item-0"}>
      {items.map((item, index) => (
        <AccordionItem key={item.value ?? `item-${index}`} value={item.value ?? `item-${index}`}>
          <AccordionTrigger>{item.label}</AccordionTrigger>
          {item.content && <AccordionContent>{item.content}</AccordionContent>}
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  );
};
