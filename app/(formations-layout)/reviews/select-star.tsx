"use client";

import Loader from "@/components/Loader";
import { updateReviewAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

export const SelectStar = (props: { star: number; reviewId: string }) => {
  const [isPending, startTransition] = useTransition();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-2 mb-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < props.star;
        const isNewFilled = hoverIndex ? i - 1 < hoverIndex : null;
        return (
          <button
            key={i}
            onMouseEnter={() => {
              setHoverIndex(i);
            }}
            onMouseLeave={() => {
              setHoverIndex(null);
            }}
            onClick={() => {
              startTransition(async () => {
                await updateReviewAction({
                  reviewId: props.reviewId,
                  star: i + 1,
                });
              });
              setHoverIndex(null);
            }}
            disabled={isPending}
          >
            <Star
              className={cn(
                "size-4 cursor-pointer transition-all text-yellow-500 hover:fill-orange-400 hover:text-orange-400 hover:-translate-y-0.5",
                isFilled && "fill-yellow-400",
                isNewFilled &&
                  "-translate-y-0.5 fill-orange-400 text-orange-400",
                isPending &&
                  "animate-pulse hover:text-yellow-500 hover:-translate-y-0",
                isPending && isFilled && "hover:fill-yellow-400",
                isPending && !isFilled && "hover:fill-none",
                !isFilled && !isNewFilled && "text-yellow-500"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
