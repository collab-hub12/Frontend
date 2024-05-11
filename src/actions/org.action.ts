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