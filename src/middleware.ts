import {NextRequest, NextResponse} from "next/server";
import {getSession} from "./lib/session";
import {parseUrlPath} from "./utilities/parseUrl";


export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/orgs")) {
        const withRole = parseUrlPath(request.nextUrl.pathname)

        if (withRole) {
            const data = await getSession(withRole!)

            const res = NextResponse.next()
            if (data?.token) {
                res.cookies.set('jwt', data?.token, {httpOnly: true})
            }
            return res
        }
    }
}

// export const config = {
//     matcher: ['/api/auth']
// };
