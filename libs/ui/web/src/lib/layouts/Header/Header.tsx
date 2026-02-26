import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IconButton } from "../../components";

export type HeaderMenu = {
  label: string;
  path: string;
};

export const Header = ({
  children,
  headerMenus,
  onLogoClick,
  hideHeader = false,
  hideSidebar = false,
  isSidebarOpen: isSidebarOpenProp,
  onSidebarToggle,
  profileSlot,
}: {
  children?: React.ReactNode;
  headerMenus?: HeaderMenu[];
  onLogoClick?: () => void;
  hideHeader?: boolean;
  hideSidebar?: boolean;
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  profileSlot?: React.ReactNode;
}) => {
  const [, setInternalSidebarOpen] = useState(true);

  const isControlled = isSidebarOpenProp !== undefined;
  const handleSidebarToggle = isControlled ? onSidebarToggle : () => setInternalSidebarOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line-normal bg-white dark:border-dark-line-normal dark:bg-black">
      {!hideHeader && (
        <div className="flex h-16 w-full items-center justify-between pl-6 pr-10">
          <div className="flex items-center gap-6">
            {/* Sidebar Trigger */}
            {!hideSidebar && <IconButton icon={<MenuIcon />} className="h-8 w-8" onClick={handleSidebarToggle} />}
            {/* TODO: Replace with your app logo */}
            <Link href={onLogoClick?.() || "/"}>
              <div className="h-8 w-16 rounded-md bg-primary-normal" />
            </Link>
          </div>
          <div className="flex items-center gap-16">
            {/* Header Menu List */}
            <div className="flex items-center gap-8">
              {headerMenus?.map((menu) => {
                return (
                  <Link href={menu.path || "/"} key={menu.label}>
                    <div className="text-16/button text-label-assertive transition-all duration-300 hover:text-label-normal dark:text-dark-label-assertive dark:hover:text-dark-label-normal">
                      {menu.label}
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Profile Slot */}
            {profileSlot}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">{children}</div>
    </header>
  );
};
