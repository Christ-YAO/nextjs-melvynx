import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function loading() {
  return (
    <div>
      <header className="border-b flex items-center gap-2 -mx-4 px-4 pb-2 mb-4">
        <Skeleton className="w-24 h-10"></Skeleton>
      </header>
      <Card>
        <CardHeader>
          <Skeleton className="h-10 w-full"></Skeleton>
          <Skeleton className="h-10 w-full"></Skeleton>
        </CardHeader>
        <CardFooter>
          <Skeleton className="h-10 w-16"></Skeleton>
        </CardFooter>
      </Card>
    </div>
  );
}
