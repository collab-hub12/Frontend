import {getCookieValue} from "./session";

export async function getTeamDetails(org_id: number) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        next: {revalidate: 1}
    })
    const data = await response.json()
    if (!Array.isArray(data))
        return null;
    return data;
}