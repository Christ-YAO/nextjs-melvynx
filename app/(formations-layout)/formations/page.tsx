import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { VIDEOS } from "./data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan de formation!",
  description: "Blabla!!!"
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de formation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {VIDEOS.map((video) => (
          <div key={video.id}>
            <Link
              href={`/formations/video/${video.id}`}
              className="text-indigo-500 underline"
            >
              {video.title}
            </Link>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Link
          className="bg-accent py-1 px-3 rounded transition-all hover:bg-accent-foreground/20"
          href="/"
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
