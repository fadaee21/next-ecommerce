import { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiAxiosClient } from "service/axios";
import { AuthContextValue, Children, ErrorResponse, User } from "type";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Children) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  //login user
  const login = async (cellphone: string) => {
    try {
      setLoginLoading(true);
      const res = await apiAxiosClient.post(`/auth/login`, { cellphone });
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
      const res = await apiAxiosClient.post(`/auth/checkOtp`, { otp });
      setUser(res.data.user);
      router.push("/");
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    } finally {
      setLoginLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await apiAxiosClient.post(`/auth/resendOtp`);

      toast.success("کد ورود دوباره برای شما ارسال شد");
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    }
  };
  const logout = async () => {
    try {
      setLoginLoading(true);
      await apiAxiosClient.post(`/auth/logout`);
      setUser(null);
      router.push("/");
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    const checkedUserLoggedIn = async () => {
      try {
        setLoginLoading(true);
        const res = await apiAxiosClient.post(`/auth/me`);
        if (res.status === 200) {
          setUser(res.data.user);
        } else {
          setUser(null);
          // router.push("/");
        }
      } catch (error: any) {
        console.log(error.response);
        setUser(null);
        // router.push("/");
      } finally {
        setLoginLoading(false);
      }
    };
    checkedUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, resendOtp, login, checkOtp, loginLoading, logout }}
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
