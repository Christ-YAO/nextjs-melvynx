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
import { UpdateTitleForm } from "./edit-title";
import DeleteReview from "./delete-review";
import CreateReview from "./create-review-form";
import { UpdateContentForm } from "./edit-Content";
import {
  setDeleteReview,
  setReviewContent,
  setReviewName,
  setReviewStar,
} from "@/lib/actions";

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

  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
            <CardContent className="-mt-2 -mb-3">
              <UpdateContentForm
                setReviewContent={setReviewContent.bind(null, review.id)}
                className="text-foreground/70 text-sm"
              >
                {review.review.trim().length > 0 ? review.review : "..."}
              </UpdateContentForm>
            </CardContent>
          </Card>
        ))}
        <hr />
        <Card className="px-4">
          <CreateReview />
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
