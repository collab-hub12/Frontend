import {getCookieValue} from '@/lib/session'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const org_id = searchParams.get('org_id')
    const team_id = searchParams.get('team_id')
    const room_id = searchParams.get('room_id')

    type WithRoles = {
        org_id?: string;
        team_id?: string;
        room_id?: string;
    };

    let withRoles: WithRoles = {}
    if (org_id) withRoles.org_id = org_id
    if (team_id) withRoles.team_id = team_id
    if (room_id) withRoles.room_id = room_id

    try {
        let fetch_url = `${process.env.BACKEND_URL}/auth`

        if (Object.keys(withRoles).length > 0) {
            const searchParams = new URLSearchParams(withRoles);
            fetch_url += `?${searchParams.toString()}`;
        }

        const res = await fetch(fetch_url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: `jwt=${getCookieValue('jwt')}`
            },
            cache: "no-store"
        })
        const data = await res.json()

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }

}