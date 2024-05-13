"use server"
import {getCookieValue} from "@/lib/session";
import {CreateOrgSchema} from "@/schema/org.schema";
import {revalidatePath} from "next/cache";

export async function createOrg(formData: FormData) {
    try {
        const orgDetails = CreateOrgSchema.parse({
            org_name: formData.get('org_name'),
            org_desc: formData.get('org_desc'),
            location: formData.get('location')
        })
        await fetch(`${process.env.BACKEND_URL}/orgs`, {
            method: 'POST',
            body: JSON.stringify(orgDetails),
            headers: {
                Cookie: `jwt=${getCookieValue('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err);

    }
    revalidatePath('/orgs')
}

export async function addUserOrg(payload: {org_id: number, user_id: number}, formData: FormData) {
    try {
        const data = await fetch(`${process.env.BACKEND_URL}/orgs/${payload.org_id}/users`, {
            method: 'POST',
            body: JSON.stringify({user_id: payload.user_id}),
            headers: {
                Cookie: `jwt=${getCookieValue('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(await data.json());

    } catch (err) {
        console.log(err);

    }
    revalidatePath('/orgs/[org_id]', "page")
}