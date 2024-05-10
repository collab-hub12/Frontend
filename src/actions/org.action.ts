"use server"
import {getCookieValue} from "@/lib/session";
import {CreateOrgSchema} from "@/schema/org.schema";
import {revalidatePath} from "next/cache";

export async function getOrgDetails() {
    const response = await fetch(`${process.env.BACKEND_URL}/orgs`, {
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

export async function createOrg(formData: FormData) {
    try {
        const orgDetails = CreateOrgSchema.parse({
            org_name: formData.get('org_name'),
            org_desc: formData.get('org_desc'),
            location: formData.get('location')
        })
        const data = await fetch(`${process.env.BACKEND_URL}/orgs`, {
            method: 'POST',
            body: JSON.stringify(orgDetails),
            headers: {
                Cookie: `jwt=${getCookieValue('jwt')}`,
                'Content-Type': 'application/json'
            },
            next: {revalidate: 1}
        })

        console.log(await data.json())
    } catch (err) {
        console.log(err);

    }
    revalidatePath('/orgs')
}