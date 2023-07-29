import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies.token) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
}
