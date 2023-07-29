import { handleError } from "lib/handleError";
import apiAxiosServer from "service/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.query.page)
  if (req.method === "GET") {
    console.log(req.cookies.token);
    if (!req.cookies.token) {
      res.status(401).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
      return;
    }

    try {
      const resApi = await apiAxiosServer.get(
        `/profile/orders?page=${req.query.page}`,
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
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
