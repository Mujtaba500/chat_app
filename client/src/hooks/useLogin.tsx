import axiosInstance from "../axios/Axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

type LoginInputValues = {
  username: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (values: LoginInputValues) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", values);
      toast.success(response.data.message);
      setAuthUser(response.data.data);
    } catch (err: any) {
      console.log("status: ", err.response.status);
      console.log("Error: ", err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
