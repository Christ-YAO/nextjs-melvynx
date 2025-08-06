import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import CreateReview from "@app/(formations-layout)/reviews/create-review-form";
import { notFound } from "next/navigation";
import React from "react";

export default async function RootePage(props: {
  params: Promise<{ userId: string }>;
}) {
  const params = await props.params;
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <Card>
      <CardContent>
        <Button variant="outline" size="sm" className="py-5 w-full mb-6">
          <Avatar className="size-6">
            {user.image ? <AvatarImage src={user.image} /> : null}
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p>{user.name}</p>
          {/* {user.plan === "PRO" ? <Star className="size-3"></Star> : null} */}
        </Button>
        <CreateReview />
      </CardContent>
    </Card>
  );
}
