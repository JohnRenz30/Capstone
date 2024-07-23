import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Pixelify_Sans } from "next/font/google";

export const pixelify_Sans = Pixelify_Sans({
  weight: ["400"],
  subsets: [],
});

function PrimaryLogo() {
  return (
    <>
      <Button asChild variant={"outline"}>
        <Link
          className={cn(
            "m500:text-xs w-full m900:w-[unset] font-heading text-2xl",
            pixelify_Sans.className,
            "dark:bg-gradient-to-b dark:from-card-foreground dark:to-primary dark:text-transparent dark:bg-clip-text"
          )}
          href={"/"}
        >
          <span className="font-bold">&#62;&#62;</span>
          <span className="font-semibold">prima</span>
          <span
            className={cn(
              "bg-gradient-to-b from-primary to-foreground dark:from-card-foreground dark:to-primary text-transparent bg-clip-text",
              "font-semibold"
            )}
          >
            LEVELING
          </span>
        </Link>
      </Button>
    </>
  );
}

export default PrimaryLogo;
