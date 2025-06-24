import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>404</CardTitle>
        <CardDescription>video not found.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href={"/formations"}
          className="bg-accent py-1 px-3 rounded transition-all hover:bg-accent-foreground/20"
        >
          Bact to /formations
        </Link>
      </CardFooter>
    </Card>
  );
}
