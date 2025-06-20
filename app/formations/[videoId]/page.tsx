import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { VIDEOS } from "../data";
import Link from "next/link";

export default async function Page(props: {
  params: Promise<{ videoId: string }>;
}) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  if (!video) {
    return <p>Invalid video</p>;
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>{video?.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ul className="list-disc list-inside">
            {video?.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link href={`/formations/${video.id}/lesson/${lesson.id}`} className="transition-all hover:underline">{lesson.title}</Link>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Link
            className="bg-accent py-1 px-3 rounded transition-all hover:bg-accent-foreground/20"
            href={`/formations`}
          >
            Back
          </Link>
        </CardFooter>
      </Card>
  );
}
