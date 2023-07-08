import { NextApiRequest as Request, NextApiResponse as Response } from "next";

import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  return  NextResponse.json({ hello: "World" });
}
 