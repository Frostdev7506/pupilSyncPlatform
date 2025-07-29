// services/aiChat.ts (or your path)
import { createStreamableValue } from "ai/rsc";
import { apiClient } from "./http-client";
import axios from "axios";

type AiChatResponse = ReadableStream<Uint8Array> | null;

export async function streamAiResponse(prompt: string) {
  const stream = createStreamableValue();

  // Use a self-invoking async function to run the streaming logic without blocking the return
  (async () => {
    try {
      const response = await apiClient.post<AiChatResponse>(
        "/ai-chat/chat",
        { prompt },
        {
          responseType: "stream",
          withCredentials: true,
        }
      );
      console.log(response.data);

      if (!response.data) {
        throw new Error("No response data received from AI server");
      }

      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true }); // stream: true is safer
          stream.update(chunk);
        }
      }

      stream.done();
    } catch (error) {
      console.error("Error in streamAiResponse:", error);

      let errorMessage = "Failed to connect to AI server";
      if (axios.isAxiosError(error)) {
        // You might want to try and read the error from the stream if possible
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      stream.error(errorMessage);
    }
  })();

  // Immediately return the streamable value
  return { value: stream.value };
}

// This function is not used in the streaming implementation but is kept for completeness.
export async function sendChatMessage(
  messages: Array<{ role: string; content: string }>
) {
  try {
    const response = await apiClient.post("/ai-chat/chat", { messages });
    return response.data;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}
