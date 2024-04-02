'use client';

import { Textarea } from "@nextui-org/input";
import { useLLMPromptStore } from '@/lib/promptStore';


export default function TextInput() {
    const maxChars = 200;
    const message = useLLMPromptStore((state) => state.message);
    const updateMessage = useLLMPromptStore(state => state.updateMessage);
    const length = message.length;


  return (
    <div className="">
        <Textarea
            maxLength={maxChars}
            isRequired
            label="Input field"
            labelPlacement="outside"
            placeholder="Enter your question here!"
            className=""
            value={message}
            onValueChange={updateMessage}
        />
        <p className="">Remaining characters: {maxChars - length}/{maxChars}</p>
    </div>
  )
}
