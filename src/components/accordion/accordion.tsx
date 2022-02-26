import { FC } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { chevron, content, header, item, root, trigger } from "./accordion.css";
import { ChevronDownIcon } from "../icons";

type Props = {
  title: string;
  header: React.ReactNode;
  children: React.ReactNode;
};

export const Accordion: FC<Props> = (props) => {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={root}>
      <AccordionPrimitive.Item value={props.title} className={item}>
        <AccordionPrimitive.Header className={header}>
          <AccordionPrimitive.Trigger className={trigger}>
            {props.header}
            <ChevronDownIcon aria-hidden className={chevron} />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className={content}>{props.children}</AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};
