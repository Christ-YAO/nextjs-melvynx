"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AddReviewAction } from "@/lib/actions";
import React, { ComponentProps, useTransition } from "react";
import { useFormStatus } from "react-dom";

export default function CreateReview() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(FormData) => {
        startTransition(async () => {
          await AddReviewAction(FormData);
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
