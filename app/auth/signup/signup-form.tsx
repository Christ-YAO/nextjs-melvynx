"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
import { useTransition } from "react";

const SignUpFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // console.log(values);

    startTransition(async () => {
      await signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Singing Up Successfully !");
            router.push("/auth");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="italic text-xs" />
            </FormItem>
          )}
        />
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
        <SubmitButton isPending={isPending} type="submit">
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
}
