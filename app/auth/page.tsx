import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { cn } from "@/lib/utils";
import { Check, Edit } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import React from "react";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="mx-8">
      <CardHeader className="flex items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle>User Profile</CardTitle>
          <div className="w-8 h-1 bg-accent-foreground"></div>
        </div>
        <Link
          href={"/auth/edit"}
          className={cn(
            "flex items-center gap-1",
            buttonVariants({ size: "sm", variant: "outline" })
          )}
        >
          <Edit className="text-muted-foreground text-sm" /> Edit
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground flex gap-1 items-center">
              Email
              {user.emailVerified ? <Check size={14} /> : null}
            </span>
            <span>{user?.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
