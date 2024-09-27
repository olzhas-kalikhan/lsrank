import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { ClipboardPlus, Files } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";

export default async function NavMenu({ className }: { className?: string }) {
  const session = await getServerAuthSession();

  return (
    <nav className={cn("border-r-2 px-10 pt-40", className)}>
      <ul>
        <li className="pb-4">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full justify-start text-lg"
          >
            <Link href={`/${session?.user.name}`} className="flex gap-4">
              <Files />
              <p>My Lists</p>
            </Link>
          </Button>
        </li>
        <li className="pb-4">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full justify-start text-lg"
          >
            <Link href="/new-list" className="flex gap-4">
              <ClipboardPlus />
              <p>Create List</p>
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
