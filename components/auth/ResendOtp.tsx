import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";

const MinuteCounter = () => {
  const countNum = 10;
  const [count, setCount] = useState(countNum);
  const [loadingResend, setLoadingResend] = useState(false);
  const { resendOtp } = useAuth();

  const handleResendOtp = async () => {
    setLoadingResend(true);
    await resendOtp();
    setCount(countNum);
    setLoadingResend(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeRemaining = formatTime(count);

  return (
    <>
      {count ? (
        <div className="mt-3">{timeRemaining}</div>
      ) : (
        <button
          onClick={handleResendOtp}
          disabled={loadingResend}
          className="btn btn-dark"
        >
          ارسال دوباره
          {loadingResend && (
            <div className="spinner-border spinner-border-sm ms-2"></div>
          )}
        </button>
      )}
    </>
  );
};

export default MinuteCounter;
