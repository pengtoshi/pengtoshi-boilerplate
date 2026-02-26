import clsx from "clsx";
import { HomeIcon } from "lucide-react";
import { useState } from "react";
import { Header, Icon, Sidebar, useMediaQuery } from "@libs/ui-web";
import type { HeaderMenu, SidebarMenu, UIProps } from "@libs/ui-web";
import { ProfileDropdown } from "../../components/ProfileDropdown/ProfileDropdown";

interface MainProps extends UIProps.Div {
  meta?: React.ReactNode;
  header?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  noMaxWidth?: boolean;
}

const headerMenus: HeaderMenu[] = [
  {
    label: "메뉴 항목 A",
    path: "/example",
  },
  {
    label: "메뉴 항목 B",
    path: "/menuB",
  },
  {
    label: "메뉴 항목 C",
    path: "/menuC",
  },
];

const sidebarMenus: SidebarMenu[] = [
  {
    type: "group",
    label: "기본 메뉴",
    items: [
      {
        label: "메뉴 항목 A",
        icon: <Icon component={HomeIcon} />,
        path: "/example",
      },
      {
        label: "메뉴 항목 B",
        icon: <Icon component={HomeIcon} />,
        path: "/menuB",
      },
      {
        label: "메뉴 항목 C",
        icon: <Icon component={HomeIcon} />,
        path: "/menuC",
      },
    ],
  },
  {
    type: "group",
    label: "설정",
    items: [
      {
        label: "메뉴 항목 D",
        icon: <Icon component={HomeIcon} />,
        path: "/menuD",
      },
      {
        label: "메뉴 항목 E",
        icon: <Icon component={HomeIcon} />,
        path: "/menuE",
      },
    ],
  },
];

export const Main = ({
  meta,
  header,
  hideHeader = false,
  hideFooter = false,
  noMaxWidth = false,
  className,
  children,
  ...props
}: MainProps) => {
  const mobile = useMediaQuery("max", 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={clsx("flex min-h-screen w-full flex-col", className)} {...props}>
      {meta}
      {/* Header */}
      <Header
        headerMenus={headerMenus}
        hideHeader={hideHeader}
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
        profileSlot={<ProfileDropdown />}
      >
        {header}
      </Header>
      {/* Content area: Sidebar (left) + Page content (right) */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} menus={sidebarMenus} />
        <div className={clsx("flex flex-1 flex-col overflow-auto", !noMaxWidth && "max-w-[1024px]")}>{children}</div>
      </div>
      {/* {!hideFooter && <Footer className="z-10" theme="bright" mobile={mobile} showSideBackground />} */}
    </div>
  );
};
