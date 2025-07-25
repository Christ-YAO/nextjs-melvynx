"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "./signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card className="mx-12">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground mx-auto">
          Already have an account?{" "}
          <Link href={"/auth/signin"} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
