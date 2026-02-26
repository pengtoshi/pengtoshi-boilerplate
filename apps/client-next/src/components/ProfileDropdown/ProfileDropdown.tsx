import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { AuthTokenManager, useAuth, useFindUser, useSignOut } from "@libs/graphql-next";
import type { User } from "@libs/graphql-next";
import { Avatar, Icon } from "@libs/ui-web";

const getDisplayLabel = (user: User): string => {
  if (user.email) {
    const local = user.email.split("@")[0];
    return local.length > 14 ? `${local.slice(0, 14)}…` : local;
  }
  return `user_${user.id.slice(0, 8)}`;
};

export const ProfileDropdown = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data } = useFindUser(isAuthenticated);
  const [signOutMutation] = useSignOut();

  const [isOpen, setIsOpen] = useState(false);

  const user = data?.findUser;

  const handleSignOut = useCallback(async () => {
    try {
      await signOutMutation();
    } catch {
      // Ignore API failure, force cleanup below.
    } finally {
      AuthTokenManager.removeToken();
      await router.replace("/login");
    }
  }, [router, signOutMutation]);

  if (!user) return null;

  const label = getDisplayLabel(user);

  return (
    <DropdownMenuPrimitive.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-line-normal px-4 py-2 outline-none transition-colors duration-300 hover:bg-background-strong dark:hover:bg-dark-background-strong"
        >
          <span className="max-w-[120px] truncate text-16/body/emp text-label-normal dark:text-dark-label-normal">
            {label}
          </span>
          <ChevronDownIcon
            className={clsx(
              "h-5 w-5 shrink-0 text-label-assertive transition-transform duration-300 dark:text-dark-label-assertive",
              isOpen ? "rotate-180" : "",
            )}
          />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={8}
          className={clsx(
            "z-50  rounded-xl border border-line-normal bg-normal shadow-emphasize",
            "dark:border-dark-line-normal dark:bg-dark-normal",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
          )}
        >
          {/* Profile header (non-interactive) */}
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar seed={user.id} className="min-h-8 min-w-8 shrink-0" />
            <div className="flex min-w-[180px] flex-col items-start gap-0.5">
              <span className="text-14/body text-label-assertive dark:text-dark-label-assertive">안녕하세요,</span>
              <div className="flex items-center gap-1">
                <span className="text-16/body/emp text-label-normal dark:text-dark-label-normal">{label}</span>
                <span className="text-14/body text-label-assertive dark:text-dark-label-assertive">님 !</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-line-normal dark:bg-dark-line-normal" />

          {/* Menu items */}
          <DropdownMenuPrimitive.Group className="p-2">
            <DropdownMenuPrimitive.Item
              onSelect={handleSignOut}
              className={clsx(
                "relative flex h-10 cursor-default select-none items-center gap-2 rounded-md px-4 py-3 outline-none",
                "text-14/body text-status-negative dark:text-dark-status-negative",
                "transition-colors duration-300 focus:bg-background-strong dark:focus:bg-dark-background-strong",
              )}
            >
              <Icon component={LogOutIcon} size={16} className="text-status-negative dark:text-dark-status-negative" />
              로그아웃
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Group>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
