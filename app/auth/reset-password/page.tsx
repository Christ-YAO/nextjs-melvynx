"use client";

import { SubmitButton } from "@/components/submit-button";
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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string | null;

  function onSubmit(formData: FormData) {
    const password = formData.get("password") as string;

    if (!token) {
      toast.error("Invalid token");
      return;
    }

    startTransition(async () => {
      await authClient.resetPassword(
        {
          newPassword: password,
          token,
        },
        {
          onSuccess: () => {
            router.push("/auth/signin");
            toast.success("Password reseted successfully!");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    });
  }

  return (
    <Card className="mx-12">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>{token}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" />
          </div>
          <SubmitButton isPending={isPending} type="submit">
            Reset Password
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
