"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AddReviewSafeAction } from "@/lib/actions";
import { useAction } from "next-safe-action/hooks";
import React, { ComponentProps, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function CreateReview() {
  const [isPending, startTransition] = useTransition();
  const { executeAsync, hasErrored, result, hasSucceeded } =
    useAction(AddReviewSafeAction);

  return (
    <form
      action={(FormData) => {
        const name = FormData.get("name") as string;
        const review = FormData.get("content") as string;

        startTransition(async () => {
          await executeAsync({ name, review });
        });
      }}
      className="flex flex-col gap-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" disabled={isPending} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Review</Label>
        <Textarea name="content" id="content" disabled={isPending} required />
      </div>
      <SubmitButton type="submit" />
      {hasErrored ? (
        <p className="text-red-500 italic text-sm">{result.serverError}</p>
      ) : null}

      {hasSucceeded ? (
        <p className="text-green-500 italic text-sm">Review created !</p>
      ) : null}
    </form>
  );
}

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={props.disabled || pending}>
      {pending ? <Loader className="text-muted" /> : "Submit"}
    </Button>
  );
};
