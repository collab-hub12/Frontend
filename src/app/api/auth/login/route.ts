
import {NextApiResponse, NextApiRequest} from "next";
import {NextResponse} from "next/server";

export async function GET(req: NextApiRequest) {
    const oauthURL = await fetch("http://localhost:8000/api/auth/login", {redirect: 'follow'})
    NextResponse.json({"url": oauthURL.url})

}