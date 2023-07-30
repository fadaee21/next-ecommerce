// import { AxiosError } from "axios";
import { handleError } from "lib/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import apiAxiosDataBase from "service/axios";
// import { ErrorResponse } from "type";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.cookies.login_token);
    if (!req.cookies.token) {
      res.status(401).json({ message: "خروج نا موفق یکبار دیگر تلاش کنید" });
      return;
    }

    try {
      const resApi = await apiAxiosDataBase.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 0,
          path: "/",
        })
      );

      res.status(200).json({ message: "کاربر از سیستم خارج شد." });
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err as any)] } });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
