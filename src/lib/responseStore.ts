import { create } from "zustand";

export type Message = {
  role: string;
  content: string;
  images?: Uint8Array[] | string[];
};

export type Response = {
  model: string;
  created_at: Date;
  message: Message;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

export type Actions = {
  updateContent: (newContent: string) => void;
  updateResponse: (newResponse: Response) => void;
  clearResponse: () => void;
  updateDone: (newDone: boolean) => void;
};

export const useLLMResponseStore = create<Response & Actions>((set) => ({
  model: "",
  created_at: new Date(),
  message: { content: "", role: "" },
  done: false,
  total_duration: 0,
  load_duration: 0,
  prompt_eval_count: 0,
  prompt_eval_duration: 0,
  eval_count: 0,
  eval_duration: 0,
  updateContent: (newContent: string) =>
    set((state) => ({ message: { ...state.message, content: newContent } })),
  updateResponse: (newResponse: Response) =>
    set((state) => ({ ...state, ...newResponse })),
  clearResponse: () =>
    set((state) => ({
      ...state,
      message: { content: "", role: "" },
      done: false,
      total_duration: 0,
      load_duration: 0,
      prompt_eval_count: 0,
      prompt_eval_duration: 0,
      eval_count: 0,
      eval_duration: 0,
    })),
    updateDone: (newDone: boolean) => 
      set((state) => ({ done: newDone }))
}));
