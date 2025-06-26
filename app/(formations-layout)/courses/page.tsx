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

export const metadata: Metadata = {
  title: "Courses!",
};

export default async function Page() {
  const userAgentList = userAgent({
    headers: await headers(),
  });

  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => response.json()
  );
  console.log('users', users);
  

  // console.log("userAgentList ==>", userAgentList);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses!</CardTitle>
        <CardDescription>{userAgentList.browser?.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Counter />
        <ul>
          {users.map(user => {
            <li key={user.id}>{user.name}</li>
          })}
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
