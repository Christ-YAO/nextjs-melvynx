import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import React from "react";
import { AccountForm } from "./account-form";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="mx-8">
      <CardHeader>
        <div>
          <CardTitle>Edit Account</CardTitle>
          <div className="w-8 h-1 bg-accent-foreground"></div>
        </div>
      </CardHeader>
      <CardContent>
        <AccountForm
          defaultValues={{
            name: user.name ?? null,
            image: user.image ?? null,
          }}
        />
      </CardContent>
    </Card>
  );
}
