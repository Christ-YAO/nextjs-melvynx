"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { actionClient, actionUser, SafeError } from "./safe-action-client";
import {
  DeleteReviewFormSchema,
  ReviewFormSchema,
  UpadateReviewFormSchema,
} from "./review.schema";
import z from "zod";
import { LIMITATIONS } from "./auth-plan";
import { UserPlan } from "@prisma/client";

const updateReviewAction = actionUser
  .schema(UpadateReviewFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.update({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
      data: {
        name: input.name,
        review: input.review,
        star: input.star,
      },
    });

    revalidatePath("/reviews");
  });

const setDeleteReview = actionUser
  .schema(DeleteReviewFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.delete({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
    });

    revalidatePath("/reviews");
  });

// const AddReviewAction = async (FormData: FormData) => {
//   const name = FormData.get("name") as string;
//   const content = FormData.get("content") as string;

//   await prisma.review.create({
//     data: {
//       name: name,
//       review: content,
//       star: 0,
//     },
//   });

//   revalidatePath("/reviews");
// };

const AddReviewSafeAction = actionClient
  .schema(ReviewFormSchema.extend({ userId: z.string() }))
  .action(async ({ parsedInput: input, ctx }) => {
    if (input.name === "méchant") {
      throw new SafeError("Invalid name");
    }

    const userPlan = await prisma.user.findUnique({
      where: {
        id: input.userId,
      },
      select: {
        plan: true,
      },
    });

    if (!userPlan) {
      throw new SafeError("No user find");
    }

    const limit = LIMITATIONS[userPlan?.plan as UserPlan];

    const currentReviewCount = await prisma.review.count({
      where: { userId: input.userId },
    });

    if (currentReviewCount > limit.reviewLimit) {
      throw new SafeError("Impossible to add more review. Ask owner to increase limitation.");
    }

    const newReview = await prisma.review.create({
      data: {
        userId: input.userId,
        name: input.name,
        review: input.review,
        star: 0,
      },
    });

    revalidatePath("/reviews");

    return newReview;
  });

export { AddReviewSafeAction, setDeleteReview, updateReviewAction };
