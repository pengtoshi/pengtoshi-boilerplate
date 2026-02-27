import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarMenuItem = {
  icon?: React.ReactNode;
  label: string;
  path?: string;
  /** path 없이 클릭 핸들러만 사용할 때 */
  onClick?: () => void;
};

export type SidebarMenuGroup = {
  type: "group";
  label?: string;
  items: SidebarMenuItem[];
};

export type SidebarCustomMenu = {
  type: "custom";
  content: React.ReactNode;
};

export type SidebarMenu = SidebarMenuGroup | SidebarCustomMenu;

const SidebarItem = ({ item, pathname }: { item: SidebarMenuItem; pathname: string }) => {
  const inner = (
    <>
      {item.icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>}
      <span
        className={clsx(
          "flex-1 text-left",
          pathname === item.path
            ? "text-16/button text-primary-normal dark:text-dark-primary-normal"
            : "text-16/button text-label-assertive dark:text-dark-label-assertive",
        )}
      >
        {item.label}
      </span>
    </>
  );

  const containerClass = clsx(
    "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 transition-colors duration-300",
    "hover:bg-background-emphasize dark:hover:bg-dark-background-emphasize",
  );

  if (item.path) {
    return (
      <Link href={item.path} className={containerClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={containerClass} onClick={item.onClick}>
      {inner}
    </button>
  );
};

const SidebarGroup = ({
  menu,
  pathname,
  hasDivider,
}: {
  menu: SidebarMenuGroup;
  pathname: string;
  hasDivider: boolean;
}) => (
  <div className={clsx("px-3 py-6", hasDivider && "border-t border-line-normal dark:border-dark-line-normal")}>
    {menu.label && (
      <p className="mb-2 px-4 text-14/body text-label-placeholder dark:text-dark-label-placeholder">{menu.label}</p>
    )}
    <div className="flex flex-col gap-0.5">
      {menu.items.map((item, i) => (
        <SidebarItem key={i} item={item} pathname={pathname} />
      ))}
    </div>
  </div>
);

export const Sidebar = ({
  isOpen = true,
  menus,
  className,
}: {
  isOpen?: boolean;
  menus?: SidebarMenu[];
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "flex shrink-0 flex-col overflow-hidden border-r border-line-normal bg-background-strong transition-[width] duration-300 dark:border-dark-line-normal dark:bg-dark-normal",
        isOpen ? "w-64" : "w-0",
        className,
      )}
    >
      {/* Menu Sections */}
      <nav
        className={clsx(
          "flex flex-col overflow-y-auto transition-opacity",
          isOpen ? "opacity-100 delay-150 duration-200" : "opacity-0 duration-150",
        )}
      >
        {menus?.map((menu, index) => {
          const hasDivider = index > 0;

          if (menu.type === "custom") {
            return (
              <div
                key={index}
                className={clsx("px-3 py-6", hasDivider && "border-t border-line-normal dark:border-dark-line-normal")}
              >
                {menu.content}
              </div>
            );
          }

          return <SidebarGroup key={index} menu={menu} pathname={pathname} hasDivider={hasDivider} />;
        })}
      </nav>
    </aside>
  );
};
