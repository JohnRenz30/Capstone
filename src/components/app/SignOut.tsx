"use client";
import { Loader, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const SignOut = () => {
  useEffect(() => {
    signOut({
      callbackUrl: "/home",
      redirect: true,
    });
  }, []);

  return (
    <>
      <main
        className="w-full min-h-screen flex-center bg-background dark:bg-background overflow-x-hidden space-y-2 scrollbarGutterStable"
        style={{ minHeight: "100dvh" }}
      >
        <section>
          <h1 className="text-primary dark:text-primary-foreground">
            <Loader className="animate-spin" size={100} />
          </h1>
        </section>
      </main>
    </>
  );
};

export default SignOut;
