"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

const LoginButton = () => {
  const session = useSession();
  if (session.status === "authenticated") {
    return void redirect("/");
  }
  return (
    <Button
      onClick={() => {
        void signIn("twitch");
      }}
    >
      Login
    </Button>
  );
};
export default LoginButton;
