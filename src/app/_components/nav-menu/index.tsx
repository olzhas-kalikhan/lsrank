import Link from "next/link";
import { ClipboardPlus, Files, type LucideProps } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

type LucidIconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

const NavLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: LucidIconComponent;
}) => {
  return (
    <Button
      asChild
      variant="secondary"
      size="lg"
      className="w-full justify-start xl:text-base 2xl:text-lg"
    >
      <Link href={href} className="flex justify-center gap-4 lg:justify-start">
        <Icon className="w-5 shrink-0 2xl:w-6" />
        <p className="hidden lg:inline">{label}</p>
      </Link>
    </Button>
  );
};

export default async function NavMenu({ className }: { className?: string }) {
  const session = await getServerAuthSession();

  return (
    <nav className={cn("border-r-2 px-1 pt-40 xl:px-4 2xl:px-6", className)}>
      <ul>
        <li className="pb-4">
          <NavLink
            href={`/${session?.user.name}`}
            label="My Lists"
            Icon={Files}
          />
        </li>
        <li className="pb-4">
          <NavLink href="/new-list" label="Create List" Icon={ClipboardPlus} />
        </li>
      </ul>
    </nav>
  );
}
