"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateReviewAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Check, Edit } from "lucide-react";
import {
  Children,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";

export const UpdateTitleForm = (props: {
  children: string;
  reviewId: string;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useOptimistic(props.children, () => "loading...");

  const submit = () => {
    setIsEditing(false);
    const newName = ref.current?.value ?? "";
    updateReviewAction({ reviewId: props.reviewId, name: newName });
    startTransition(() => {
      setTitle(newName);
    });
  };

  if (isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <Input
          ref={ref}
          className={cn(props.className)}
          defaultValue={props.children}
          //   style={{
          //     //   @ts-espect-error - new field api
          //     fieldSizing: "content",
          //   }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit();
            }
          }}
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
      <p
        className={cn(props.className, {
          "animate-pulse": isPending,
        })}
      >
        {title}
      </p>
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
    </div>
  );
};
