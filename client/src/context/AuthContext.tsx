import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import axiosInstance from "../axios/Axios";
import toast from "react-hot-toast";

type AuthUserType = {
  username: string;
  fullName: string;
  password: string;
  profilePic: string | null;
};

const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/user");
        console.log(response);
        setAuthUser(response.data);
      } catch (err: any) {
        console.log("status: ", err.response.status);
        console.log("Error: ", err.response.data.message);
        toast.error(err.response.data.message);
      } finally {
        setisLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { useAuthContext };
