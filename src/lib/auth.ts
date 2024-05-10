import {cookies} from "next/headers";

export async function getSession() {
    const nextCookies = cookies();
    const nextSessionToken = nextCookies.get('jwt')
    const response = await fetch(`${process.env.BACKEND_URL}/users`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${nextSessionToken?.value}`
        },
        next: {revalidate: 1}
    })
    const data = await response.json()
    if (!data?.email)
        return null;
    return data;
}

export async function getOrgDetails() {
    const nextCookies = cookies();
    const nextSessionToken = nextCookies.get('jwt')
    const response = await fetch(`${process.env.BACKEND_URL}/orgs`, {
        method: 'GET',
        headers: {
            Cookie: `jwt=${nextSessionToken?.value}`
        },
        next: {revalidate: 1}
    })
    const data = await response.json()
    if (!Array.isArray(data))
        return null;
    return data;
}