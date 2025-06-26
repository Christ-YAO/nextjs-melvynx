import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses!",
};

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses!</CardTitle>
      </CardHeader>
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
