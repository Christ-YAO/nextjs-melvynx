import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { VIDEOS } from "../../data";
import { notFound } from "next/navigation";

export default async function Layout(
  props: PropsWithChildren<{ params: Promise<{ videoId: string }> }>
) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!video) {
    notFound();
  }

  return (
    <div>
      <header className="border-b flex items-center gap-2 -mx-4 px-4 pb-2 mb-4">
        <Link href={`/formations/video/${params.videoId}`} className="font-bold">
          /formations/{params.videoId}
        </Link>

        {video.lessons.map((lesson) => (
          <Link
            href={`/formations/video/${params.videoId}/lesson/${lesson.id}`}
            key={lesson.id}
          >
            {lesson.title}
          </Link>
        ))}
      </header>
      {props.children}
    </div>
  );
}
