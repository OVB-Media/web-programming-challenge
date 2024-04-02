import { create } from 'zustand';

export type Prompt = {
    message: string
    sent: boolean
    model: string
}

export type Actions = {
    updateMessage: (newMessage: string) => void,
    updateSent: (newSent: boolean) => void,
    updateModel: (newModel: string) => void,
}

export const useLLMPromptStore = create<Prompt & Actions>((set) => ({
    message: '',
    sent: false,
    model: 'codellama',
    updateMessage: (newMessage: string) => set(({ message: newMessage })),
    updateSent: (newSent: boolean) => set(({ sent: newSent })),
    updateModel: (newModel: string) => set(({ model: newModel }))
}))