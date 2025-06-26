import { ThemeToggle } from "@/components/theme-toggle";
import { PageLayout } from "@/layout";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-2xl font-bold">Learn Next.js with Prisma</h1>
        <div className="bg-foreground w-[50px] h-[5px]"></div>
      </div>
      <Link href="/courses" className="text-indigo-500 underline">
        Courses
      </Link>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de formation
      </Link>
      <ThemeToggle />
    </PageLayout>
  );
}
