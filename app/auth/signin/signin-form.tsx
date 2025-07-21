"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Github } from "lucide-react";

type ProviderEnum = Parameters<typeof signIn.social>[0]["provider"];

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export function SignInForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // console.log(values);

    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Singing In Successfully !");
          router.push("/auth");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  async function signInWithProvider(provider: string) {
    await signIn.social(
      {
        provider: provider,
        callbackURL: "/auth",
      },
      {
        onSuccess: () => {
          toast.success("Singing In With Github Successfully !");
          router.push("/auth");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="" {...field} />
                </FormControl>
                <FormMessage className="italic text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage className="italic text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
        <p className="text-muted-foreground text-sm">Or</p>
        <div className="flex w-full gap-4">
          <Button
            onClick={() => signInWithProvider("github")}
            variant={"outline"}
            className="flex-1"
          >
            <Github size={16} />
            Sign in with Github
          </Button>
        </div>
      </Form>
    </div>
  );
}
