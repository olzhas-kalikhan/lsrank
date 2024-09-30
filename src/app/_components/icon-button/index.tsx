import { CircleDashed } from "lucide-react";
import { Button, type ButtonProps } from "@components/ui/button";

export default function IconButton({
  icon,
  isLoading,
  ...props
}: { icon: React.ReactNode; isLoading?: boolean } & ButtonProps) {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} {...props}>
      {isLoading ? <CircleDashed className="animate-spin" /> : icon}
    </Button>
  );
}
