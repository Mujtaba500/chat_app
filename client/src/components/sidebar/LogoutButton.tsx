import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/Axios";
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success(response.data.message);
      setAuthUser(null);
    } catch (err: any) {
      console.log("status: ", err.response.status);
      console.log("Error: ", err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="mt-auto">
      <LogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout} />
    </div>
  );
};
export default LogoutButton;
