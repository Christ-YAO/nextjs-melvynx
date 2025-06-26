import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VIDEOS } from "@app/(formations-layout)/formations/data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const videos = VIDEOS;

  const result = videos.flatMap((video) => {
    const params = video.lessons.map((lesson) => ({
      videoId: video.id,
      lessonId: lesson.id,
    }));

    return params;
  });

  return result;
}

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ videoId: string; lessonId: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);
  const lesson = video?.lessons.find((lesson) => lesson.id === params.lessonId);

  return {
    title: `${video?.title} - ${lesson?.title}`,
  };
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!video) {
    return <p>Invalid video</p>;
  }

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson?.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          className="bg-accent py-1 px-3 rounded transition-all hover:bg-accent-foreground/20"
          href={`/formations/video/${video.id}`}
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
