"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, Edit } from "lucide-react";
import {
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";

export const UpdateContentForm = (props: {
  children: string;
  setReviewContent: (newContent: string) => void;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useOptimistic(props.children, () => "loading...");

  const submit = () => {
    setIsEditing(false);
    const newContent = ref.current?.value ?? "";
    props.setReviewContent(newContent);
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
        {content}
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
