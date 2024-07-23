import { pixelify_Sans } from "@/components/app/logo/primaryLogo";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { CirclePlay } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <main>
      <header className="inset-0 flex min-h-[100vh] w-full flex-col items-center justify-center bg-background bg-[linear-gradient(to_right,#766c8933_1px,transparent_1px),linear-gradient(to_bottom,#766c8933_1px,transparent_1px)] bg-[size:5rem_5rem]">
        <div className="flex-center flex-col w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
          <h1 className="text-lg font-heading md:text-xl lg:text-xl">
            Welcome <span className="text-primary"></span> to{" "}
            <span
              className={cn(
                "m500:text-xl w-full m900:w-[unset] font-heading text-3xl",
                pixelify_Sans.className,
                "dark:bg-gradient-to-b dark:from-white dark:to-white/10 dark:text-transparent dark:bg-clip-text inline-flex items-center text-text justify-center"
              )}
            >
              <span className="font-bold">&#62;&#62;</span>
              <span className="font-semibold">prima </span>
              <span
                className={cn(
                  "bg-gradient-to-b from-primary to-foreground dark:to-card text-transparent bg-clip-text",
                  "font-semibold"
                )}
              >
                LEVELING
              </span>
            </span>
          </h1>
          <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
            Level-up and play while learning and having fun.
            <br /> Learning? while having fun? seems impossible right?
          </p>
          <Button
            size="lg"
            className="flex-between text-primary-foreground border-primary-foreground gap-1 h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl "
          >
            Start <CirclePlay className="w-9 h-9" absoluteStrokeWidth={true} />
          </Button>
        </div>
      </header>

      {/* <div className="min-h-screen w-full container">
    <div className="max-w-full">
      <ArithmeticOperationChall
        answer={3}
        firstNumber={firstNum}
        operation={operator}
        secondNumber={secondNum}
        duration={duration}
      />
    </div>
  </div> */}
    </main>
  );
}

export default page;
