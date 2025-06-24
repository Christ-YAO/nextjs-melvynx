import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VIDEOS } from "@app/formations/data";
import Link from "next/link";

export default async function Page(props: {
  params: { videoId: string; lessonId: string };
}) {
  const params = await props.params;

  const video = VIDEOS.find((video) => video.id === params.videoId);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!video) {
    return <p>Invalid video</p>;
  }

  const lesson = video.lessons.find((lesson) => lesson.id === params.lessonId);

  if (!lesson) {
    throw new Error("Invalid lesson!");
    return <p>Invalid lesson</p>;
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
          href={`/formations/${video.id}`}
        >
          Back
        </Link>
      </CardFooter>
    </Card>
  );
}
