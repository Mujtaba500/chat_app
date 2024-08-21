import axiosInstance from "../axios/Axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
  };

  const signup = async (inputs: SignupInputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signup", inputs);
      console.log(response);
      toast.success(response.data.message);
      setAuthUser(response.data.data);
    } catch (err: any) {
      console.log("status: ", err.response.status);
      console.log("Error: ", err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setLoading(true);
    }
  };

  return { signup, loading };
};

export default useSignup;
