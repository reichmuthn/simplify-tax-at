"use server";

import { createUserAnswerCommand } from "@app/entities/userAnswers/commands/createUserAnswer/command";
import { revalidateTag, unstable_noStore as noStore } from "next/cache";
import { pollRateLimitProvider } from "@app/providers/rateLimitProvider/provider";
import { headers } from "next/headers";

function IP() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}

export async function createUserAnswerItem(
  questionId: string,
  answerId: string,
) {
  noStore();

  const ip = IP();

  const { success } = await pollRateLimitProvider.limit(
    `question_${questionId}_${ip}`,
  );

  if (!success) {
    return {
      data: null,
      errors: { root: ["Du hast diese Umfrage schon beantwortet."] },
    };
  }

  try {
    await createUserAnswerCommand({
      answerId: answerId,
    });
  } catch (err: any) {
    return {
      data: null,
      errors: { root: [err.message] },
    };
  }

  revalidateTag("userAnswers");
}
