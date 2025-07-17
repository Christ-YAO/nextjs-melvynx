import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { UserRound } from "lucide-react";
import { SelectStar } from "./select-star";
import { revalidatePath } from "next/cache";
import { UpdateTitleForm } from "./edit-title";
import DeleteReview from "./delete-review";
import CreateReview from "./create-review";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const metadata: Metadata = {
  title: "Courses!",
};

export default async function Page() {
  const userAgentList = userAgent({
    headers: await headers(),
  });

  const reviews = await prisma.review.findMany();

  const setReviewStar = async (reviewId: string, star: number) => {
    "use server";

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
    "use server";

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

  const setDeleteReview = async (reviewId: string) => {
    "use server";

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    revalidatePath("/courses");
  };

  const setAddReview = async (name: string, content: string) => {
    "use server";

    await prisma.review.create({
      data: {
        name: name,
        review: content,
        star: 0,
      },
    });

    revalidatePath("/courses")
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses!</CardTitle>
        <CardDescription>{userAgentList.browser?.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card className="gap-2 relative" key={review.id}>
            <div className="absolute right-4 top-4">
              <DeleteReview
                reviewId={review.id}
                setDeleteReview={setDeleteReview.bind(null)}
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-1">
                <SelectStar
                  star={review.star}
                  setReviewStar={setReviewStar.bind(null, review.id)}
                />
              </div>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-7 bg-muted p-1.5 rounded-full" />
                <UpdateTitleForm
                  setReviewName={setReviewName.bind(null, review.id)}
                  className="font-bold"
                >
                  {review.name.trim().length > 0 ? review.name : "NaN"}
                </UpdateTitleForm>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/70 text-sm">
              {review.review}
            </CardContent>
          </Card>
        ))}
        <hr />
        <Card className="px-4">
          <CreateReview setAddReview={setAddReview.bind(null)} />
        </Card>
      </CardContent>
      <CardFooter>
        <Link
          className="bg-accent py-1 px-3 rounded transition-all hover:bg-accent-foreground/20"
          href={`/`}
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
