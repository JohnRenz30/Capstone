"use client";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/icons";

export const FormSchema = z.object({
  email: z.string().min(1, "Email or Student ID is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const { status, data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const signInResponse = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (
        !signInResponse ||
        (signInResponse.ok !== true && signInResponse.error !== null)
      ) {
        console.error("Invalid Credentials!");
        toast({
          variant: "destructive",
          title: "Wrong Credentials!",
          description:
            "Please make sure you've entered registered and authorized credentials.",
        });
      } else {
        router.push("/");
        console.log(signInResponse);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof TypeError
          ? "Network error, please try again later"
          : "Invalid credentials";
      toast({
        variant: "destructive",
        title: "Uh Oh",
        description: errorMessage,
      });

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Student ID:</FormLabel>
                <FormControl>
                  <Input placeholder="juan@email.com | 012A-34567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isLoading ? true : false}
          className="w-full uppercase dark:shadow-card-foreground dark:border-card-foreground"
          type="submit"
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Play in!
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
