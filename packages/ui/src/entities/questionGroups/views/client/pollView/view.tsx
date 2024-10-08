import { Suspense } from "react";
import { getQuestionGroupDetailsQuery } from "@app/entities/questionGroups/queries/getQuestionDetails/query";
import {
  PollQuestion,
  PollQuestionSkeleton,
} from "@ui/entities/questionGroups/views/client/pollView/question";
import { QuestionGroupDetails } from "@app/entities/questionGroups/queries/getQuestionDetails/schemas";
import { unstable_cache as cache } from "next/cache";

type QuestionGroupPollViewProps = {
  questionGroupId: string;
};

export type PollQuestionDetails = QuestionGroupDetails["questions"][0];
export type PollAnswerDetails =
  QuestionGroupDetails["questions"][0]["answers"][0];

export const getQuestionGroupDetailsQueryCached = cache(
  async (slug) => {
    return getQuestionGroupDetailsQuery(slug);
  },
  ["posts-getQuestionGroupDetailsQuery"],
  {
    tags: ["questionsGroups", "questions", "answers", "userAnswer"],
  },
);

export function PollView({ questionGroupId }: QuestionGroupPollViewProps) {
  const questionGroupDetail =
    getQuestionGroupDetailsQueryCached(questionGroupId);

  return (
    <Suspense fallback={<PollQuestionSkeleton />}>
      <PollQuestion questionGroupDetail={questionGroupDetail} />
    </Suspense>
  );
}
