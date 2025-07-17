"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useTransition } from "react";

export default function CreateReview(props: {
  setAddReview: (name: string, content: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(FormData) => {
        const name = FormData.get("name") as string;
        const content = FormData.get("content") as string;

        startTransition(async () => {
          await props.setAddReview(name, content);
        });
      }}
      className="flex flex-col gap-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" disabled={isPending} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Review</Label>
        <Textarea name="content" id="content" disabled={isPending} />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader className="text-muted" /> : "Submit"}
      </Button>
    </form>
  );
}
