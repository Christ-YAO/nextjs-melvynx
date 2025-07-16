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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
          <form
            action={async (FormData) => {
              "use server";

              const name = FormData.get("name") as string;
              const review = FormData.get("review") as string;

              await prisma.review.create({
                data: {
                  name,
                  review,
                  star: 5,
                },
              });

              revalidatePath("/courses");
            }}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Review</Label>
              <Textarea name="review" id="review" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
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
