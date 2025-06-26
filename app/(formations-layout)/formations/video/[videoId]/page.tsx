import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { VIDEOS } from "../../data";
import Link from "next/link";
import { Metadata } from "next";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const videos = VIDEOS;

  const result = videos.map((video) => ({ videoId: video.id }));

  console.log("result =>", result);

  return result;
}

type PageProps = {
  params: Promise<{ videoId: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  return {
    title: `Video - ${video?.title}`,
  };
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  await new Promise((resolve) => setTimeout(resolve, 1500));

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
              <Link
                href={`/formations/video/${video.id}/lesson/${lesson.id}`}
                className="transition-all hover:underline"
              >
                {lesson.title}
              </Link>
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
