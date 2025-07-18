import { prisma } from "@/lib/prisma";
import { SafeError } from "@/lib/safe-action-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
  name: z.string(),
  review: z.string(),
});

export const GET = async (request: NextRequest) => {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(reviews);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const input = Schema.parse(body);

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

  return NextResponse.json({
    review: newReview,
  });
};
