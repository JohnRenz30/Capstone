"use client";
import ArithmeticOperationChall from "@/components/app/challenges/algebra";
import { pixelify_Sans } from "@/components/app/logo/primaryLogo";
import MicrophoneComponent from "@/components/app/SpeechToText";
import TextToSpeech from "@/components/app/TextToSpeech";

import { Button } from "@/components/ui/button";
import Countdown from "@/components/ui/countdown";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { CirclePlay } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

function generateOperation() {
  const operations = ["add", "subtract", "multiply", "divide"] as const;
  const operator = operations[Math.floor(Math.random() * operations.length)];

  let firstNum: number;
  let secondNum: number;
  let answer: number | string;
  let duration: number;

  switch (operator) {
    case "add":
    case "subtract":
      firstNum = Math.floor(Math.random() * 100);
      secondNum = Math.floor(Math.random() * 100);
      answer = operator === "add" ? firstNum + secondNum : firstNum - secondNum;
      duration = 15; // Easy
      break;

    case "multiply":
    case "divide":
      firstNum = Math.floor(Math.random() * 9) + 1;
      secondNum = Math.floor(Math.random() * 9) + 1;

      if (operator === "multiply") {
        answer = firstNum * secondNum;
        // Set duration based on complexity
        duration = firstNum >= 10 || secondNum >= 10 ? 60 : 30; // Hard for 10 or above, else Medium
      } else {
        // Ensure the second number is not zero and divides evenly
        secondNum = secondNum === 0 ? 1 : secondNum; // Avoid division by zero
        answer =
          firstNum % secondNum === 0 ? firstNum / secondNum : "Not divisible";
        duration = 30; // Medium, but could be adjusted as needed
      }

      // Optional: Special cases for larger numbers like 10x10 or 11x11
      if (Math.random() > 0.5 && (firstNum === 10 || secondNum === 10)) {
        firstNum = 10;
        secondNum = 10;
        answer = firstNum * secondNum;
        duration = 60; // Hard
      } else if (Math.random() > 0.5 && (firstNum === 11 || secondNum === 11)) {
        firstNum = 11;
        secondNum = 11;
        answer = firstNum * secondNum;
        duration = 60; // Hard
      }
      break;

    default:
      throw new Error("Invalid operation");
  }

  return { firstNum, secondNum, operator, answer, duration };
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { firstNum, secondNum, operator, answer, duration } =
    generateOperation();

  if (!session) {
    return redirect("/home");
  }

  const handleCountdownComplete = () => {
    console.log("Countdown finished!");
    // Trigger any other actions here
  };
  return (
    <main>
      <header className="inset-0 flex min-h-[100vh] w-full flex-col items-center justify-center bg-background bg-[linear-gradient(to_right,#766c8933_1px,transparent_1px),linear-gradient(to_bottom,#766c8933_1px,transparent_1px)] bg-[size:5rem_5rem]">
        <div className="flex-center flex-col w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
          <h1 className="text-lg font-heading md:text-xl lg:text-xl">
            Welcome <span className="text-primary">{session?.user.role}</span>{" "}
            to{" "}
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
          <Button size="lg" asChild>
            <Link
              href="/playgroundDev"
              className="flex-between text-primary-foreground border-primary-foreground gap-1 h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
            >
              Start{" "}
              <CirclePlay className="w-9 h-9" absoluteStrokeWidth={true} />
            </Link>
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
      {/* <div className="min-h-screen w-full container">
        <div className="max-w-full overflow-x-hidden">
          <TextToSpeech />
        </div>
      </div>
      <div className="min-h-screen w-full container">
        <div className="max-w-full">
          <MicrophoneComponent />
        </div>
      </div> */}
    </main>
  );
}
