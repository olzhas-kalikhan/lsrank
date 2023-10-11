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
import { redirect, useRouter } from "next/navigation";
import { cn } from "~/utils/ui";

const styleTrigger = navigationMenuTriggerStyle({ className: "text-xl mb-4 uppercase", });
const Navigation = ({ className }: { className: string }) => {
  const session = useSession();
  const router = useRouter();

  return (
    <NavigationMenu className={cn(className, "list-none flex-col items-start")}>
      <NavigationMenuItem>
        <NavigationMenuLink
          className={styleTrigger}
          href="/"
        >
          home
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          className={styleTrigger}
          href="/lists"
        >
          lists
        </NavigationMenuLink>
      </NavigationMenuItem>
      {session.status === "unauthenticated" && (
        <NavigationMenuItem>
          <NavigationMenuLink
            className={styleTrigger}
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
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/new-list"
              className={styleTrigger}
            >
              new list
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={styleTrigger}
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
