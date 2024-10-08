import { PollAnswers, PollAnswersSkeleton } from "./answers";
import { QuestionGroupDetails } from "@app/entities/questionGroups/queries/getQuestionDetails/schemas";
import React from "react";

type PollViewQuestionProps = {
  questionGroupDetail: Promise<QuestionGroupDetails | null>;
};

export function PollQuestion({ questionGroupDetail }: PollViewQuestionProps) {
  const questionGroup = React.use(questionGroupDetail);

  if (!questionGroup || !questionGroup.questions[0]) return;

  return (
    <div className="relative isolate overflow-hidden max-w-3xl lg:max-w-7xl bg-gradient-to-br from-midnight to-darkness rounded-2xl text-center mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div>
        <div className="text-base sm:text-lg text-center text-white">
          {questionGroup.questions[0]?.title}
        </div>
        <PollAnswers question={questionGroup.questions[0]} />
      </div>
      <div
        className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
    </div>
  );
}

export function PollQuestionSkeleton() {
  return (
    <div className="relative isolate overflow-hidden max-w-3xl lg:max-w-7xl bg-gradient-to-br from-midnight to-darkness rounded-2xl text-center mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className={"animate-pulse"}>
        <div className="text-base sm:text-lg flex justify-center text-center text-white">
          <div className="h-4 bg-gray-200 rounded-full basis-1/3"></div>
        </div>
        <div className={"flex flex-col gap-2 sm:gap-4 mt-4 sm:mt-6"}>
          <PollAnswersSkeleton />
        </div>
      </div>
      <div
        className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
    </div>
  );
}
