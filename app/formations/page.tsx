import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageLayout } from "@/layout";
import Link from "next/link";
import React from "react";
import { VIDEOS } from "./data";

export default function Page() {
  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle>Plan de formation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {VIDEOS.map((video) => (
            <div key={video.id}>
              <Link
                href={`/formations/${video.id}`}
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
    </PageLayout>
  );
}
