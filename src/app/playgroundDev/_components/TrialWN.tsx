"use client";

import TextToSpeech from "@/components/app/TextToSpeech";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Info, Search } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Question {
  number: number;
  isWord: boolean;
}

const numberRanges = [
  [10, 90],
  [100, 900],
  [1000, 9000],
  [10000, 90000],
  [100000, 900000],
  [1000000, 1000000],
];

const generateRandomNumber = (range: number[]): number => {
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateQuestion = (): Question => {
  const range = numberRanges[Math.floor(Math.random() * numberRanges.length)];
  const number = generateRandomNumber(range);
  const isWord = Math.random() > 0.5;
  return { number, isWord };
};

const numberToWords = (num: number): string => {
  const belowTwenty = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "million"];

  if (num === 0) return belowTwenty[0];

  let word = "";
  let thousandCounter = 0;

  const helper = (n: number): string => {
    if (n === 0) return "";
    if (n < 20) return belowTwenty[n] + " ";
    if (n < 100)
      return tens[Math.floor(n / 10)] + " " + belowTwenty[n % 10] + " ";
    return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
  };

  while (num > 0) {
    if (num % 1000 !== 0) {
      word = helper(num % 1000) + thousands[thousandCounter] + " " + word;
    }
    num = Math.floor(num / 1000);
    thousandCounter++;
  }

  return word.trim();
};

const createClue = (text: string, percentage: number): string => {
  const chars = text.split("");
  const numToRemove = Math.floor(chars.length * percentage);
  let removedCount = 0;

  while (removedCount < numToRemove) {
    const index = Math.floor(Math.random() * chars.length);
    if (chars[index] !== "_") {
      chars[index] = "_";
      removedCount++;
    }
  }

  return chars.join("");
};

function trimTrailingZero(input: string): string {
  // Regular expression to match all occurrences of " zero "
  return input
    .replace(/\bzero\b/g, "")
    .trim()
    .replace(/\s{2,}/g, " ");
}

const NumberPractice: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const newQuestions = Array.from({ length: 15 }, () => generateQuestion());
    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleNext = () => {
    if (checkAnswer()) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setAnswer("");
    setTimeLeft(90);
    if (currentQuestionIndex === 14) {
      setIsCompleted(true);
    }
  };

  const handlePass = () => {
    handleNext();
  };

  const checkAnswer = (): boolean => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;
    const userAnswer = answer.replace(/\s+/g, "").toLowerCase();
    if (currentQuestion.isWord) {
      return parseInt(answer) == currentQuestion.number;
    } else {
      return (
        userAnswer ==
        trimTrailingZero(
          numberToWords(currentQuestion.number).replace(/\s+/g, "")
        )
      );
    }
  };

  const handleRestart = () => {
    const newQuestions = Array.from({ length: 15 }, () => generateQuestion());
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(90);
    setIsCompleted(false);
  };

  const renderClue = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    if (!currentQuestion.isWord) {
      const word = trimTrailingZero(numberToWords(currentQuestion.number));
      const clue = createClue(word, 0.2);
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-accent w-full">Clue?</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex-center gap-2">
                  <span className="text-primary">&gt;&gt;</span> Clue for you!{" "}
                  <span className="text-primary">&lt;&lt;</span>
                </DialogTitle>
                <DialogDescription>
                  <div className="w-full text-center">
                    <span className="text-primary text-sm">
                      {trimTrailingZero(clue)}
                    </span>
                  </div>
                  <div className="text-card-foreground">
                    <TextToSpeech text={questionText} />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    }
    return null;
  };

  const renderInstruction = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return currentQuestion.isWord ? "Symbol:" : "Words:";
  };

  if (isCompleted) {
    const percentage = (score / 15) * 100;
    return (
      <div>
        <h1>Game Over!</h1>
        <p>Score: {score} / 15</p>
        <p>Accuracy: {percentage.toFixed(2)}%</p>
        <Button variant="default" onClick={handleRestart}>
          Restart
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  const questionText = currentQuestion.isWord
    ? numberToWords(currentQuestion.number)
    : currentQuestion.number.toLocaleString();

  return (
    <div className="text-xs sm:text-xl w-full">
      <div className="flex-center flex-col w-full">
        <h1 className="text-2xl">
          Question{" "}
          <strong className="text-primary">{currentQuestionIndex + 1}</strong> /
          15
        </h1>
        <div className="flex-between w-full flex-col md:flex-row">
          <div>
            <p className="text-xs">
              <strong>Time left:</strong>{" "}
              <strong className="text-primary text-sm">{timeLeft}</strong>{" "}
              seconds
            </p>
          </div>

          <div>
            <p className="text-xs">
              <strong>Score:</strong>{" "}
              <strong className="text-primary text-sm">{score}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex-center mt-2">
        <div className="max-w-sm w-full flex-center gap-3 flex-col">
          <div className="w-full flex-between">
            <p className="text-sm text-start w-full">
              <strong>{!currentQuestion.isWord ? "Symbol" : "Word"}</strong>:
            </p>
            {currentQuestion.isWord && <TextToSpeech text={questionText} />}
          </div>

          <p className="flex-center text-center text-xl">
            <strong className="text-primary">{questionText}</strong>
          </p>

          <p className="text-sm text-start w-full">
            <strong>{renderInstruction()}</strong>
          </p>

          <Input
            type={currentQuestion.isWord ? "number" : "text"}
            value={answer}
            onChange={handleAnswerChange}
          />

          <Button variant="default" className="w-full" onClick={handleNext}>
            Submit
          </Button>
          {renderClue()}
          <Button variant="outline" className="w-full" onClick={handlePass}>
            Pass
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NumberPractice;
