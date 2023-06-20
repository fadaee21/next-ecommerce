import { NextApiRequest, NextApiResponse } from "next";
import apiAxios from "service/axios";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const resApi = await apiAxios.post(
        "/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );
      if (resApi.status === 200) {
        res.status(200).json({ user: resApi.data.data });
      } else {
        res.status(401).json({ message: "Unauthenticated.me" });
      }
    } catch (error: any) {
      // Clear the token cookie if an error occurs
      const clearCookie = cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 0,
        expires: new Date(0), // Set the expiration date to a past date
        path: "/",
      });
      res.setHeader("Set-Cookie", clearCookie);
      res.status(500).json({ message: "500" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
