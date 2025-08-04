"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const email = formData.get("email");

    await authClient.forgetPassword(
      {
        email: email as string,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  return (
    <Card className="mx-8">
      <CardHeader>
        <div>
          <CardTitle>Reset password</CardTitle>
          <div className="w-8 h-1 bg-accent-foreground mb-3"></div>
          <CardDescription>
            Enter your email and we'll send you a link to reset your password.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" />
          </div>
          <Button type="submit">Reset Password</Button>
        </form>
      </CardContent>
    </Card>
  );
}
