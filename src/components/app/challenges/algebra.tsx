"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

// const getRandomNumber = () => {
//   return Math.floor(Math.random() * 100);
// };

interface ArithmeticOperationChallProps {
  operation: "add" | "subtract" | "multiply" | "divide";
  firstNumber: number;
  secondNumber: number;
  answer: number;
  duration: number;
}

function ArithmeticOperationChall(props: ArithmeticOperationChallProps) {
  return (
    <>
      <Card className="w-full h-[80vh] flex justify-between flex-col">
        <CardHeader>
          <CardTitle>Primary Algebra</CardTitle>
          <CardDescription>Challenge your Mathematical skills</CardDescription>
        </CardHeader>
        <CardContent className="flex-center flex-col">
          {/* <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form> */}
          <div className="flex-between flex-col gap-2 sm:text-4xl md:text-7xl text-2xl w-full">
            <div className="h-2/3 bg-pink-500/0 w-full flex justify-between">
              <div className="w-2/5 bg-primary/0 flex items-end justify-end">
                {props.operation == "add"
                  ? "+"
                  : props.operation == "subtract"
                  ? "-"
                  : props.operation == "divide"
                  ? "÷"
                  : props.operation == "multiply" && "x"}
              </div>
              <div className="w-3/5 bg-primary/0 flex-center flex-col border-foreground border-b-8">
                <div>{props.firstNumber}</div>
                <div>{props.secondNumber}</div>
              </div>
              <div className="w-2/5 bg-primary/0 flex items-end justify-end"></div>
            </div>

            <div className="h-1/3  bg-green-500/0 w-full flex-center">
              <Input
                type="number"
                placeholder={
                  props.operation == "add"
                    ? "Sum?"
                    : props.operation == "subtract"
                    ? "Difference?"
                    : props.operation == "divide"
                    ? "Quotient"
                    : props.operation == "multiply"
                    ? "Product"
                    : ""
                }
                className="sm:text-4xl md:text-7xl text-2xl h-full  placeholder:text-center text-center w-full sm:w-2/5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Next</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ArithmeticOperationChall;
