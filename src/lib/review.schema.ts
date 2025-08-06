import z from "zod";

export const ReviewFormSchema = z.object({
  name: z.string().min(2).max(50),
  review: z.string().min(10).max(500),
});

export const UpadateReviewFormSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  review: z.string().min(10).max(500).optional(),
  reviewId: z.string(),
  star: z.number().optional(),
});

export const DeleteReviewFormSchema = z.object({
  reviewId: z.string(),
});
