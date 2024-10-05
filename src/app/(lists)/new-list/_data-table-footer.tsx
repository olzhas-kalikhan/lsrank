"use client";

import { useFormState } from "react-hook-form";
import { CircleDashed } from "lucide-react";
import { Button } from "~/app/_components/ui/button";

export default function DataTableFooter() {
  const { isSubmitting } = useFormState();

  return (
    <Button type="submit">
      {isSubmitting ? <CircleDashed className="animate-spin" /> : "Create List"}
    </Button>
  );
}
