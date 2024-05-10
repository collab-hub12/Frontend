import {WithRoles} from "@/utilities/types";
import {cookies} from "next/headers";

// Get cookie value
export const getCookieValue = (key: string) => {
    const nextCookies = cookies();
    const nextSessionToken = nextCookies.get(key)
    return nextSessionToken?.value
}

// function for adding query parameters for getting ROLE url
function getUrl(withRoles: WithRoles) {
    let url = `${process.env.BACKEND_URL}/roles?org_id=${withRoles.org_id}`;
    if (withRoles.team_id)
        url = url.concat(`&team_id=${withRoles.team_id}`)
    if (withRoles.room_id)
        url = url.concat(`&room_id=${withRoles.room_id}`)
    return url
}

export async function getSession(withRoles?: WithRoles) {

    const fetch_url = withRoles ? getUrl(withRoles) : `${process.env.BACKEND_URL}/users`

    const response = await fetch(fetch_url, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        next: {revalidate: 1}
    })

    const data = await response.json()
    if (!data.email) return null;
    return data;
}





