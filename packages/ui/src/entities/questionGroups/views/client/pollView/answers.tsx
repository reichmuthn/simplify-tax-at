"use client";
import { NumberCircle } from "./number-circle";
import { createUserAnswerItem } from "./actions";
import React, { useState } from "react";
import { useLocalStorage } from "@ui/lib/useLocalStorage";
import { cn } from "@ui/lib/utils";
import va from "@vercel/analytics";
import {
  PollAnswerDetails,
  PollQuestionDetails,
} from "@ui/entities/questionGroups/views/client/pollView/view";

type PollViewAnswers = {
  question: PollQuestionDetails;
};

export function PollAnswers({ question }: PollViewAnswers) {
  const storageKey = `question_${question.id}`;

  const [userAnswer, setUserAnswer] = useLocalStorage(storageKey, "");
  const [isAnswered, setIsAnswered] = useState(false);

  const totalCount = question.answers.reduce(
    (prev, current) => prev + current.userAnswers.length,
    0,
  );

  const handleUserAnswer = async (answer: PollAnswerDetails) => {
    if (userAnswer) return;

    setIsAnswered(true);
    setUserAnswer(answer.id);

    const result = await createUserAnswerItem(question.id, answer.id);

    if (!result?.errors) {
      va.track(question.title, {
        answer: answer.title,
      });
    }
  };

  const getPercentage = (answer: PollAnswerDetails) => {
    let number =
      (answer.userAnswers.length +
        (isAnswered && answer.id === userAnswer ? 1 : 0)) /
      (totalCount + (isAnswered ? 1 : 0));

    if (isNaN(number)) return 0;

    return number;
  };

  return (
    <div className={"flex flex-col gap-2 sm:gap-4 mt-4 sm:mt-6"}>
      {question.answers.map((answer) => (
        <div
          key={answer.id}
          className={cn(
            "p-1.5 sm:px-4 rounded-lg bg-white text-base flex items-center justify-between border-2 border-appAccent",
            answer.id === userAnswer && "border-green-500 bg-green-50",
            !userAnswer && "cursor-pointer hover:bg-sky-50",
          )}
          onClick={() => handleUserAnswer(answer)}
        >
          <span className={"text-sm sm:text-base"}>{answer.title}</span>
          <div className={cn("w-8 h-8 sm:w-12 sm:h-12 text-sm shrink-0")}>
            {userAnswer && (
              <div
                className={
                  "h-full w-full rounded-full text-white flex items-center justify-center"
                }
              >
                <NumberCircle percentage={getPercentage(answer)} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PollAnswersSkeleton() {
  return (
    <>
      <div
        className={cn(
          "p-1.5 sm:px-4 rounded-lg bg-gray-100 text-base flex items-center justify-between border-2 border-appAccent",
        )}
      >
        <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
        <div className={cn("w-8 h-8 sm:w-12 sm:h-12 text-sm shrink-0")}></div>
      </div>
      <div
        className={cn(
          "p-1.5 sm:px-4 rounded-lg bg-gray-100 text-base flex items-center justify-between border-2 border-appAccent",
        )}
      >
        <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
        <div className={cn("w-8 h-8 sm:w-12 sm:h-12 text-sm shrink-0")}></div>
      </div>
      <div
        className={cn(
          "p-1.5 sm:px-4 rounded-lg bg-gray-100 text-base flex items-center justify-between border-2 border-appAccent",
        )}
      >
        <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
        <div className={cn("w-8 h-8 sm:w-12 sm:h-12 text-sm shrink-0")}></div>
      </div>
    </>
  );
}
