import { useState } from "react";
import axiosInstance from "../axios/Axios";
import useConversation from "../zustand/useConversations";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, messages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) {
      return;
    }
    setLoading(false);
    try {
      const data = {
        message: message,
      };
      const response = await axiosInstance.post(
        `/messages/send/${selectedConversation.id}`,
        data
      );
      toast.success(response.data.message);
      setMessages([...messages, response.data.data]);
    } catch (err: any) {
      console.log("status: ", err.response.status);
      console.log("Error: ", err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
