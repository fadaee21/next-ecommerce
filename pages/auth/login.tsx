import React, { useState } from "react";
import LoginComp from "@/components/auth/Login";
import CheckOtp from "@/components/auth/CheckOtp";
import MinuteCounter from "@/components/auth/ResendOtp";

const Login = () => {
  const [step, setStep] = useState(1);
  return (
    <section className="auth_section book_section">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <hr />
            <div className="card">
              <div className="card-body">
                {step === 1 && <LoginComp setStep={setStep} />}
                {step === 2 && <CheckOtp />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
