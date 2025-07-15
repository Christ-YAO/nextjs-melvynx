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
import Counter from "./counter";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { UserRound } from "lucide-react";
import { SelectStar } from "./select-star";
import { revalidatePath } from "next/cache";

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

  const setNewStar = async (reviewId: string, star: number) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses!</CardTitle>
        <CardDescription>{userAgentList.browser?.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {reviews.map((review) => (
          <Card className="gap-2" key={review.id}>
            <CardHeader>
              <div className="flex items-center gap-1">
                <SelectStar
                  star={review.star}
                  setNewStar={setNewStar.bind(null, review.id)}
                />
              </div>
              <CardTitle className="flex items-end gap-2">
                <UserRound className="size-4" />
                {review.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/70 text-sm">
              {review.review}
            </CardContent>
          </Card>
        ))}
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
