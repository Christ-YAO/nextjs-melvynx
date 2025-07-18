"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { actionClient, SafeError } from "./safe-action-client";
import z from "zod";

const setReviewStar = async (reviewId: string, star: number) => {
  await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      star,
    },
  });

  revalidatePath("/courses");
};

const setReviewName = async (reviewId: string, name: string) => {
  if (name === "error") {
    revalidatePath("/courses");
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

  revalidatePath("/courses");
};

const setReviewContent = async (reviewId: string, content: string) => {
  if (content === "error") {
    revalidatePath("/courses");
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

  revalidatePath("/courses");
};

const setDeleteReview = async (reviewId: string) => {
  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  revalidatePath("/courses");
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

//   revalidatePath("/courses");
// };

const AddReviewSafeAction = actionClient
  .schema(
    z.object({
      name: z.string(),
      review: z.string(),
    })
  )
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

    revalidatePath("/courses");

    return newReview;
  });

export {
  AddReviewSafeAction,
  setDeleteReview,
  setReviewContent,
  setReviewName,
  setReviewStar,
};
