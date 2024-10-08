import {WithRoles} from "@/utilities/types";
import {cookies} from "next/headers";

// Get cookie value
export const getCookieValue = (key: string) => {
    const nextCookies = cookies();
    const nextSessionToken = nextCookies.get(key)
    return nextSessionToken?.value
}


export async function getSession(withRoles?: WithRoles) {
    let fetch_url = `http://127.0.0.1:3000/api/auth`
    if (withRoles) {
        let fetchRoleOptions: {
            org_id?: string;
            team_id?: string;
            room_id?: string;
        } = {}

        if (withRoles?.org_id) fetchRoleOptions.org_id = withRoles.org_id.toString()
        if (withRoles?.team_id) fetchRoleOptions.team_id = withRoles.team_id.toString()
        if (withRoles?.room_id) fetchRoleOptions.room_id = withRoles.room_id.toString()

        if (Object.keys(fetchRoleOptions).length > 0) {
            const searchParams = new URLSearchParams(fetchRoleOptions);
            fetch_url += `?${searchParams.toString()}`;
        }
    }

    const response = await fetch(fetch_url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()

    return data;
}






