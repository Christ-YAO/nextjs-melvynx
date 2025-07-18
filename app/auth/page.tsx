import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import React from "react";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="mx-8">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <div className="w-8 h-1 bg-accent-foreground"></div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Email</span>
            <span>{user?.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
