// app/actions.ts
"use server";

import { streamAiResponse } from "@/services/aiChat";

// This server action calls your existing service function and returns the streamable value.
export async function getAIStream(prompt: string) {
  const result = await streamAiResponse(prompt);
  // The result will be in the shape of { value: StreamableValue } or { error: string }
  return result;
}
