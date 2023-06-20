import { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import apiAxios from "service/axios";
import { ErrorResponse } from "type";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // res.status(200).json({ message: "ok" });
    try {
      const resApi = await apiAxios.post("/auth/login", {
        cellphone: req.body.cellphone,
      });
      //   console.log(resApi.data.data.login_token)

      res.setHeader(
        "set-Cookie",
        cookie.serialize("login_token", resApi.data.data.login_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", //user must address https:// not http:// - in development in localhost you can not use https
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        })
      );
      res.status(200).json({ message: "کد ورود برای شما ارسال شد" });
    } catch (error: any) {
      // console.log(error.response);

      res.status(422).json({
        message: {
          err: [handleError(error as AxiosError<ErrorResponse, any>)],
        },
      }); //i want to get this error and give it again to the handleError so it mus be in array
    }
  } else {
    res.setHeader("allow", ["post"]); // response that header must be post
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
