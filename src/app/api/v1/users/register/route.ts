import { NextResponse } from "next/server";
export function POST(req: Request, res: Response) {
  return NextResponse.json({ hello: "World" });
}
