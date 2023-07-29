import { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import React, { useState } from "react";
import { toast } from "react-toastify";
import apiAxiosServer from "service/axios";
import { ErrorResponse } from "type";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (![name, email, subject, text].every(Boolean)) {
      toast.error("تمام موارد فرم تماس با ما الزامی است");
      return;
    }
    try {
      setLoading(true);
      const res = await apiAxiosServer.post("/contact-us", {
        name,
        email,
        subject,
        text,
      });
      res.data.status === "success" && toast.success("پیام شما ثبت شد");
    } catch (error) {
      toast.error(handleError(error as AxiosError<ErrorResponse, any>));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          placeholder="نام و نام خانوادگی"
        />
      </div>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          placeholder="ایمیل"
        />
      </div>
      <div>
        <input
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          type="text"
          className="form-control"
          placeholder="موضوع پیام"
        />
      </div>
      <div>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          rows={10}
          style={{ height: "100px" }}
          className="form-control"
          placeholder="متن پیام"
        ></textarea>
      </div>
      <div className="btn_box">
        <button type="submit" disabled={loading}>
          ارسال پیام
          {loading && (
            <div className="spinner-border spinner-border-sm ms-2"></div>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
