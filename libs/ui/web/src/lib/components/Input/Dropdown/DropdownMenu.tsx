import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuTrigger,
} from "../../../shadcn";
import { Icon } from "../../Icon/Icon";
import { IconButton } from "../Button/IconButton";

export interface DropdownMenuProps {
  items: (React.ComponentProps<typeof DropdownMenuItem> & {
    label: string;
    onClick: () => void;
  })[];
  trigger?: React.ReactNode;
  menuLabel?: string;
  avoidCollisions?: boolean;
}

export const DropdownMenu = ({ items, trigger, menuLabel, avoidCollisions = true }: DropdownMenuProps) => {
  return (
    <DropdownMenuPrimitive modal={false}>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <IconButton
            icon={
              <Icon
                component={EllipsisVerticalIcon}
                size={20}
                className="text-label-normal dark:text-dark-label-normal"
              />
            }
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" avoidCollisions={avoidCollisions}>
        {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}
        <DropdownMenuGroup>
          {items.map(({ label, onClick, ...props }) => (
            <DropdownMenuItem key={label} onSelect={onClick} {...props}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
};
