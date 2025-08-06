"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateReviewAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Check, Edit } from "lucide-react";
import { useOptimistic, useRef, useState, useTransition } from "react";

export const UpdateContentForm = (props: {
  children: string;
  reviewId: string;
  className?: string;
  userId: string | undefined;
  reviewUserId: string
}) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useOptimistic(
    props.children,
    () => "loading..."
  );

  const submit = () => {
    setIsEditing(false);
    const newContent = ref.current?.value ?? "";
    updateReviewAction({ reviewId: props.reviewId, review: newContent });
    startTransition(() => {
      setContent(newContent);
    });
  };

  if (isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <Textarea
          ref={ref}
          className={cn(props.className)}
          defaultValue={props.children}
          name="content"
        />
        <Button
          variant={"ghost"}
          className="group-hover:opacity-100 opacity-0 p-1"
          onClick={() => submit()}
        >
          <Check size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-2">
      <pre
        className={cn("font-sans", props.className, {
          "animate-pulse": isPending,
        })}
      >
        {content}
      </pre>
      {props.userId && props.userId === props.reviewId  && (
        <Button
          variant={"ghost"}
          className="group-hover:opacity-100 opacity-0 p-1"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              ref.current?.focus();
            }, 100);
          }}
        >
          <Edit size={16} />
        </Button>
      )}
    </div>
  );
};
