import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignInForm from "../_components/sign-in-form";
import TextToSpeech from "@/components/app/TextToSpeech";
import DotPattern from "@/components/ui/DotPattern";
import { cn } from "@/lib/utils";

const page = async () => {
  const session = await getServerSession(authOptions);
  // const isAdmin =
  //   session?.user.role == "ADMIN" || session?.user.role == "MASTERADMIN";
  // if (session && !isAdmin) {
  //   return redirect("/");
  // }
  return (
    <>
      {session ? (
        <></>
      ) : (
        <>
          <div className="flex-1  h-full">
            <div className="flex-1 flex-center bg-black/70 dark:bg-primary/20 h-full">
              <Card className="w-[24rem] max-w-sm shadow-xl h-fit pb-8">
                <CardHeader className="text-center">
                  <div className="flex-center">
                    <CardTitle className="text-lg font-semibold tracking-tight text-balance">
                      <span className="text-primary">&gt;&gt; </span>Welcome{" "}
                      <span className="text-primary">Hero</span> of Prima!{" "}
                      <span className="text-primary">&lt;&lt; </span>
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-pretty">
                    <span className="text-muted-foreground">
                      What is the magic word?
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignInForm />
                </CardContent>
                <CardFooter className="flex w-full p-0 justify-center">
                  <p className="text-center text-xs text-muted-foreground">
                    By proceeding to sign in, you agree to our <br />
                    <Link
                      href="/terms"
                      target="_blank"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
