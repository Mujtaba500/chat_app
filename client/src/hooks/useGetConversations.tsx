import { useEffect, useState } from "react";
import axiosInstance from "../axios/Axios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState<userType[]>([]);

  useEffect(() => {
    const getUsersForConversation = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/users");
        setConversations(response.data.data);
      } catch (err: any) {
        console.log("status: ", err.response.status);
        console.log("Error: ", err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getUsersForConversation();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
