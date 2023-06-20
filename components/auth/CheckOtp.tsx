import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import ResendOtp from "./ResendOtp";

const CheckOtp = () => {
  const { checkOtp, loginLoading } = useAuth();
  const [otp, setOtp] = useState("");

  const handleCheckOtp = async () => {
    if (otp === "") {
      toast.error("کد ورود الزامی است");
      return;
    }

    const pattern = /^[0-9]{6}$/;
    if (!pattern.test(otp)) {
      toast.error("فرمت کد ورود معتبر نیست");
      return;
    }

    await checkOtp(otp);
  };

  return (
    <div className="form_container">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          کد ورود
        </label>
        <input
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <button
          onClick={handleCheckOtp}
          disabled={loginLoading}
          className="btn btn-primary btn-auth"
        >
          ارسال
          {loginLoading && (
            <div className="spinner-border spinner-border-sm ms-2"></div>
          )}
        </button>
        <ResendOtp />
      </div>‍
      <p>تا فعال شدن اس ام اس فعلا کد رو از دیتابیس بگیر</p>
      <a
        href="http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=nextjs_ecommerce&table=users"
        target="_blank"
      >
        database
      </a>
    </div>
  );
};

export default CheckOtp;
