import { useEffect, useState } from "react";
import axiosInstance from "../axios/Axios";
import useConversation from "../zustand/useConversations";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    getMessages(selectedConversation!.id);
  }, [selectedConversation]);

  const getMessages = async (recipentId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/messages/${recipentId}`);

      setMessages(response.data.data);
    } catch (err: any) {
      console.log("status: ", err.response.status);
      console.log("Error: ", err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { messages, loading, getMessages };
};

export default useGetMessages;
