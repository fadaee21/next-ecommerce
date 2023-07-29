import axios from "axios";
import { handleError } from "lib/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import apiAxiosServer from "service/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(401).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
      return;
    }

    try {
      const resApi = await apiAxiosServer.post(
        "/profile/info/edit",
        {
          name: req.body.data.name,
          email: req.body.data.email,
        },
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );

      res.status(200).json(resApi.data.data);
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err as any)] } });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
