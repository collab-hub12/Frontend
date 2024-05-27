
import {getCookieValue} from "./session";
import {GroupByContainer} from "./utils";
import {Task} from "@/utilities/types";

export async function getMembersOfTeam(org_id: number, team_name: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/${team_name}/users`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()
    return data
}



export async function getTeamsInsideOrg(org_id: number) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()
    if (!Array.isArray(data))
        return null;
    return data;
}

export async function getTeamDetails(org_id: number, team_name: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/${team_name}`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()

    return data;
}



type DNDType = {
    id: string | number;
    title: string;
    items: Task[];
};

export async function getTaskDetails(org_id: number, team_name: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/${team_name}/tasks`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        next: {tags: ["tasks"]}
    })
    const data = await response.json()
    if (Array.isArray(data)) {
        const DefaultContainer: DNDType[] = [
            {
                id: "container-InReview",
                title: "InReview",
                items: [],
            },
            {
                id: "container-InProgress",
                title: "InProgress",
                items: [],
            },
            {
                id: "container-Done",
                title: "Done",
                items: [],
            },
            {
                id: "container-NotStarted",
                title: "NotStarted",
                items: [],
            },
        ];

        return GroupByContainer(data, DefaultContainer)
    } else
        return data
}