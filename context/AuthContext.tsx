import axios, { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContextValue, Children, ErrorResponse, User } from "type";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Children) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkedUserLoggedIn();
  }, []);

  //login user
  const login = async (cellphone: string) => {
    try {
      setLoginLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
        { cellphone }
      );
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    } finally {
      setLoginLoading(false);
    }
  };
  //check OTP user
  const checkOtp = async (otp: string) => {
    try {
      setLoginLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/checkOtp`,
        { otp }
      );
      setUser(res.data.user);
      router.push("/");
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    } finally {
      setLoginLoading(false);
    }
  };
  const checkedUserLoggedIn = async () => {
    try {
      setLoginLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/me`
      );
      if (res.status === 200) {
        setUser(res.data.user);
      }
      setUser(null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoginLoading(false);
    }
  };
  const resendOtp = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/resendOtp`);

      toast.success("کد ورود دوباره برای شما ارسال شد");
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, resendOtp, login, checkOtp, loginLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth can not be undefined aaa");
  }
  return ctx;
};
