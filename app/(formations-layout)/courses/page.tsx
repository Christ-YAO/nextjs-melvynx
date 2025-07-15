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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses!</CardTitle>
        <CardDescription>{userAgentList.browser?.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Counter />
        <ul className="list-disc list-inside">
          {reviews.map((review) => (
            <li key={review.id}>{review.name}</li>
          ))}
        </ul>
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
