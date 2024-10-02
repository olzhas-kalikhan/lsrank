import { CircleDashed } from "lucide-react";
import { Button, type ButtonProps } from "@components/ui/button";

export type IconButtonProps = {
  icon: React.ReactNode;
  isLoading?: boolean;
} & ButtonProps;

export default function IconButton({
  icon,
  isLoading,
  ...props
}: IconButtonProps) {
  return (
    <Button size="icon" variant="secondary" tabIndex={-1} {...props}>
      {isLoading ? <CircleDashed className="animate-spin" /> : icon}
    </Button>
  );
}
