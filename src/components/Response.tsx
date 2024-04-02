import React from "react";
import { Button } from "@nextui-org/button";
import { useLLMResponseStore } from "@/lib/responseStore";
import { useLLMPromptStore } from "@/lib/promptStore";
import { Textarea } from "@nextui-org/input";
import ollama from "ollama/browser";

export default function Response() {
  const promptMessage = useLLMPromptStore((state) => state.message);
  const promptSent = useLLMPromptStore((state) => state.sent);
  const response = useLLMResponseStore((state) => state.message.content);
  const model = useLLMPromptStore((state) => state.model);
  const updatepromptSent = useLLMPromptStore((state) => state.updateSent);
  const done = useLLMResponseStore((state) => state.done);
  const updateContent = useLLMResponseStore((state) => state.updateContent);
  const updateDone = useLLMResponseStore((state) => state.updateDone);
  const clearResponse = useLLMResponseStore((state) => state.clearResponse);

  async function getResponse() {
    clearResponse();
    updateContent("Loading response...");
    updatepromptSent(true);

    try {
      const stream = await ollama.chat({
        model: model,
        messages: [{ role: "user", content: promptMessage }],
        stream: true,
      });

      let updatedResponse = "";

      for await (const chunk of stream) {
        updatedResponse += chunk.message.content;
        updateContent(updatedResponse);
      }

      updateDone(true);
      updatepromptSent(false);
    } catch (error) {
      updateContent("Error fetching response");
      updatepromptSent(false);
    }
  }

  return (
    <div className="mt-2">
      <Button
        size="lg"
        isDisabled={promptSent && !done}
        isLoading={promptSent && !done}
        className="mb-6 float-right"
        radius="full"
        color="primary"
        variant="shadow"
        onPress={(e) => getResponse()}
      >
        Submit
      </Button>
      <Textarea
        isReadOnly
        maxRows={28}
        label="Answer"
        variant="bordered"
        placeholder=""
        className=""
        value={response}
      />
    </div>
  );
}
