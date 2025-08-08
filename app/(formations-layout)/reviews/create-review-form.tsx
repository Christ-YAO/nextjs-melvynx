"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddReviewSafeAction } from "@/lib/actions";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReviewFormSchema } from "@/lib/review.schema";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "sonner";

export default function CreateReview(props: {
  userId: string;
  redirectUrl?: string;
}) {
  const { execute, isPending } = useAction(AddReviewSafeAction, {
    onError: (error) => {
      toast.error(error.error.serverError ?? "Impossible to add more review !");
    },
    onSuccess: () => {
      router.refresh();
      form.reset();
      if (props.redirectUrl) {
        router.push(props.redirectUrl);
      }
    },
  });

  const router = useRouter();

  // const AddNewReview = async (obj: { name: string; review: string }) => {
  //   const result = await fetch("/api/reviews", {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //   }).then((res) => res.json());

  //   router.refresh();
  // };

  // 1. Define your form.
  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ReviewFormSchema>) {
    await execute({ ...values, userId: props.userId });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Patrick" {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className="italic text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I love your courses."
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                This is your public display review.
              </FormDescription>
              <FormMessage className="italic text-xs" />
            </FormItem>
          )}
        />
        <SubmitButton type="submit" isPending={isPending} />
      </form>
    </Form>
  );
}
