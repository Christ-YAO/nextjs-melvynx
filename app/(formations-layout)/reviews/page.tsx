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
import { Banknote, UserRound } from "lucide-react";
import { SelectStar } from "./select-star";
import { UpdateTitleForm } from "./edit-title";
import DeleteReview from "./delete-review";
import CreateReview from "./create-review-form";
import { UpdateContentForm } from "./edit-Content";
import { getUser } from "@/lib/auth-server";
import { Input } from "@/components/ui/input";
import { unauthorized } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  const userAgentList = userAgent({
    headers: await headers(),
  });

  const reviews = await prisma.review.findMany({
    // where: {
    //   userId: user?.id,
    // },
    orderBy: {
      createdAt: "desc",
    },
  });

  const isOffLimit = reviews.length >= user.limit.reviewLimit;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses!</CardTitle>
        <CardDescription>{userAgentList.browser?.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Share review link</CardTitle>
          </CardHeader>
          <CardContent>
            {isOffLimit ? (
              <Alert>
                <Banknote />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your review limit of {user.limit.reviewLimit} has been reached
                  <Link
                    href={"/auth/upgrade"}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-2")}
                  >
                    Upgrade
                  </Link>
                </AlertDescription>
              </Alert>
            ) : (
              <Input value={`http://localhost:3000/post-review/${user?.id}`} />
            )}
          </CardContent>
        </Card>
        {reviews.map((review) => (
          <Card className="gap-2 relative" key={review.id}>
            {user && user?.id === review.userId ? (
              <div className="absolute right-4 top-4">
                <DeleteReview reviewId={review.id} />
              </div>
            ) : null}
            <CardHeader>
              <div className="flex items-center gap-1">
                <SelectStar
                  star={review.star}
                  reviewId={review.id}
                  reviewUserId={review.userId}
                  userId={user?.id}
                />
              </div>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-7 bg-muted p-1.5 rounded-full" />
                <UpdateTitleForm
                  reviewId={review.id}
                  reviewUserId={review.userId}
                  userId={user?.id}
                  className="font-bold"
                >
                  {review.name.trim().length > 0 ? review.name : "NaN"}
                </UpdateTitleForm>
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-2 -mb-3">
              <UpdateContentForm
                reviewId={review.id}
                reviewUserId={review.userId}
                userId={user?.id}
                className="text-foreground/70 text-sm"
              >
                {review.review.trim().length > 0 ? review.review : "..."}
              </UpdateContentForm>
            </CardContent>
          </Card>
        ))}
        <hr />
        {user && (
          <Card className="px-4">
            <CreateReview userId={user.id} />
          </Card>
        )}
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
