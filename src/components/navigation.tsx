"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "~/utils/ui";

const Navigation = ({ className }: { className: string }) => {
  const session = useSession();
  const router = useRouter();

  return (
    <NavigationMenu
      className={cn(className, "list-none flex-col items-start pl-0")}
    >
      <NavigationMenuItem className="w-full">
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "mb-4 w-full justify-start rounded-none text-xl uppercase pl-[35%]",
          )}
          href="/"
        >
          home
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="w-full">
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "mb-4 w-full justify-start rounded-none text-xl uppercase pl-[35%]",
          )}
          href="/lists"
        >
          lists
        </NavigationMenuLink>
      </NavigationMenuItem>
      {session.status === "unauthenticated" && (
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "mb-4 w-full justify-start rounded-none text-xl uppercase pl-[35%]",
            )}
            onClick={() => {
              void router.push("/sign-in");
            }}
          >
            sign in
          </NavigationMenuLink>
        </NavigationMenuItem>
      )}
      {session.status === "authenticated" && (
        <>
          <NavigationMenuItem className="w-full">
            <NavigationMenuLink
              href="/new-list"
              className={cn(
                navigationMenuTriggerStyle(),
                "mb-4 w-full justify-start rounded-none text-xl uppercase pl-[35%]",
              )}
            >
              new list
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "mb-4 w-full justify-start rounded-none text-xl uppercase pl-[35%]",
              )}
              onClick={() => {
                void signOut();
              }}
            >
              sign out
            </NavigationMenuLink>
          </NavigationMenuItem>
        </>
      )}
    </NavigationMenu>
  );
};
export default Navigation;
