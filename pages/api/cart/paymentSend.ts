import { handleError } from "lib/handleError";
import apiAxiosDataBase from "service/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(403).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
      return;
    }
    const { cart, coupon, address_id } = req.body;
    try {
      const resApi = await apiAxiosDataBase.post(
        "/payment/send",
        {
          cart,
          coupon,
          address_id,
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
