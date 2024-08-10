import {getCookieValue} from "./session"

export async function getTaskDetails(org_id: number, team_id:number, task_id: number) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/${team_id}/tasks/${task_id}`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()

    return data
}