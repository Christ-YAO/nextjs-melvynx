"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export default function DeleteReview(props: {
  reviewId: string;
  setDeleteReview: (reviewId: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await props.setDeleteReview(props.reviewId);
        });
      }}
      disabled={isPending}
    >
      {isPending ? <Loader className="text-muted" /> : <Trash2 size={16} />}
    </Button>
  );
}
