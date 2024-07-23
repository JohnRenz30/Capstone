import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NumberPractice from "./TrialWN";
function WriteNumberChall() {
  return (
    <Card className="w-full min-h-[80vh] flex justify-start flex-col">
      <CardHeader>
        <CardTitle>
          Game 2.1 :{" "}
          <span className="text-primary">The Detective Digy T. I</span> -
          Uncovering the Symbols
        </CardTitle>
        <CardDescription>
          Challenge your Writing in Symbols and Words
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-center flex-col py-5">
        <NumberPractice />
      </CardContent>
    </Card>
  );
}

export default WriteNumberChall;
