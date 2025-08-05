"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { actionClient, SafeError } from "./safe-action-client";
import z from "zod";
import { ReviewFormSchema } from "./review.schema";

const setReviewStar = async (reviewId: string, star: number) => {
  await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      star,
    },
  });

  revalidatePath("/reviews");
};

const setReviewName = async (reviewId: string, name: string) => {
  if (name === "error") {
    revalidatePath("/reviews");
    return;
  }

  await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      name,
    },
  });

  revalidatePath("/reviews");
};

const setReviewContent = async (reviewId: string, content: string) => {
  if (content === "error") {
    revalidatePath("/reviews");
    return;
  }

  await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      review: content,
    },
  });

  revalidatePath("/reviews");
};

const setDeleteReview = async (reviewId: string) => {
  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  revalidatePath("/reviews");
};

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
  .schema(ReviewFormSchema)
  .action(async ({ parsedInput: input }) => {
    if (input.name === "méchant") {
      throw new SafeError("Invalid name");
    }

    const newReview = await prisma.review.create({
      data: {
        name: input.name,
        review: input.review,
        star: 0,
      },
    });

    revalidatePath("/reviews");

    return newReview;
  });

export {
  AddReviewSafeAction,
  setDeleteReview,
  setReviewContent,
  setReviewName,
  setReviewStar,
};
