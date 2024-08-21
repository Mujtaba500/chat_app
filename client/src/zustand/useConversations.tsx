import { create } from "zustand";

export type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  // shouldShake?: boolean;
};

// Saved in global types file
// export type ConversationType = {
//   id: string;
//   fullName: string;
//   profilePic: string;
// };

interface ConversationState {
  selectedConversation: userType | null;
  messages: MessageType[];
  setSelectedConversation: (conversation: userType | null) => void;
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
}));

export default useConversation;
