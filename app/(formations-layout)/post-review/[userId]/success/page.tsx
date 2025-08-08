import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { CheckCircle2Icon } from "lucide-react";
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
        <Button
          variant="outline"
          size="sm"
          className="py-5 w-full mb-6 cursor-default"
        >
          <Avatar className="size-6">
            {user.image ? <AvatarImage src={user.image} /> : null}
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p>{user.name}</p>
        </Button>
        <Alert className="border-green-700 text-green-700">
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>
            Thank you for your review !
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
