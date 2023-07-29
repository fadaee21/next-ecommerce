import { NextApiRequest, NextApiResponse } from "next";
import apiAxiosServer from "service/axios";
import cookie from "cookie";
import { handleError } from "lib/handleError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clearCookie = cookie.serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0,
    expires: new Date(0), // Set the expiration date to a past date
    path: "/",
    sameSite: "strict",
  });
  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(401).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
      return;
    }
    try {
      const resApi = await apiAxiosServer.post(
        "/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );

      res.status(200).json({ user: resApi.data.data });
      if (resApi.status !== 200) {
        res.setHeader("Set-Cookie", clearCookie);
      }
    } catch (error: any) {
      res.setHeader("Set-Cookie", clearCookie);
      res.status(422).json({ message: { err: [handleError(error)] } });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
