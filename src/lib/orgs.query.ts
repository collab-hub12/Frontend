import {getCookieValue} from "./session";

export async function getMemberOfOrg(org_id: number) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/users`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()

    return data?.map((d: any) => {return {isAdmin: d?.is_admin, ...d.user}})
}

export async function getOrgDetails() {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        next: {revalidate: 1}
    })
    const data = await response.json()
    return data;
}

export async function getCurrentOrg(org_id: number) {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${getCookieValue('jwt')}`
        },
        cache: "no-store"
    })
    const data = await response.json()


    return data;
}


