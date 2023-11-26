import { cn } from "~/utils/ui";

const AppBar = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("h-16 w-full border-b", className)}>{children}</div>
  );
};
export default AppBar;
