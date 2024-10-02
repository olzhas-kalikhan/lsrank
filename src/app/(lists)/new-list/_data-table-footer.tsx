import { useToast } from "~/app/_hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/app/_components/ui/button";
import { UseFormReturn, useFormState } from "react-hook-form";
import { FormDefaultValues } from "./_types";
import { CircleDashed } from "lucide-react";

export default function DataTableFooter() {
  const { isSubmitting } = useFormState();

  return (
    <Button type="submit">
      {isSubmitting ? <CircleDashed className="animate-spin" /> : "Create List"}
    </Button>
  );
}
