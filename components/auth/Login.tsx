import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { toast } from "react-toastify";
interface Prop {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
const LoginComp = ({ setStep }: Prop) => {
  const { login } = useAuth();
  const [cellphone, setCellphone] = useState("09100000000");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cellphone) {
      toast.error("شماره موبایل الزامی است");
      return;
    }

    const phonePattern = /^(\+98|0)9\d{9}$/;

    if (!phonePattern.test(cellphone)) {
      toast.error("فرمت شماره موبایل معتبر نمی باشد");
      return;
    }
    await login(cellphone);
    setStep(2);
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            شماره موبایل
          </label>
          <input
            onChange={(e) => setCellphone(e.target.value)}
            value={cellphone}
            type="tel"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-auth">
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginComp;
