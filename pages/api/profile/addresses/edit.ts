import { handleError } from "lib/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import apiAxiosDataBase from "service/axios";

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
      const resApi = await apiAxiosDataBase.post(
        "/profile/addresses/edit",
        {
          title: req.body.data.title,
          cellphone: req.body.data.cellphone,
          postal_code: req.body.data.postal_code,
          province_id: req.body.data.province_id,
          city_id: req.body.data.city_id,
          address: req.body.data.address,
          address_id:req.body.address_id
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
