import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loader(props : {className?: string}) {
  return (
    <span className="text-foreground/20">
      <LoaderCircle className={cn("size-5 animate-spin", props.className)} />
    </span>
  );
}
