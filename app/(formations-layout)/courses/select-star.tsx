"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle, Star } from "lucide-react";
import { useState, useTransition } from "react";

export const SelectStar = (props: {
  star: number;
  setReviewStar: (star: number) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  return (
    <div className="flex items-center gap-2 mb-2">
      {isPending ? (
        <span className="text-foreground/20">
          <LoaderCircle className="size-5 animate-spin" />
        </span>
      ) : (
        <>
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
                    await props.setReviewStar(i + 1);
                  });
                  setHoverIndex(null);
                }}
              >
                <Star
                  className={cn(
                    "text-yellow-500 size-4 transition-all cursor-pointer hover:-translate-y-0.5 hover:fill-orange-400 hover:text-orange-400",
                    {
                      "fill-yellow-400": isFilled,
                      "-translate-y-0.5 fill-orange-400 text-orange-400":
                        isNewFilled,
                    }
                  )}
                />
              </button>
            );
          })}
        </>
      )}
    </div>
  );
};
