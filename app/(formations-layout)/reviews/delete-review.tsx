"use client";

import Loader from "@/components/Loader";
import { SubmitButton } from "@/components/submit-button";
import { setDeleteReview } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export default function DeleteReview(props: {
  reviewId: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <form>
      <SubmitButton
        formAction={() => {
          startTransition(async () => {
            await setDeleteReview({ reviewId: props.reviewId });
          });
        }}
        isPending={isPending}
      >
        {isPending ? <Loader className="text-muted" /> : <Trash2 size={16} />}
      </SubmitButton>
    </form>
  );
}
