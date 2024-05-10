"use server"
import {CreateOrgSchema} from "@/schema/org.schema";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export async function createOrg(formData: FormData) {
    try {
        const nextCookies = cookies();
        const nextSessionToken = nextCookies.get('jwt')
        const orgDetails = CreateOrgSchema.parse({
            org_name: formData.get('org_name'),
            org_desc: formData.get('org_desc'),
            location: formData.get('location')
        })
        const data = await fetch(`${process.env.BACKEND_URL}/orgs`, {
            method: 'POST',
            body: JSON.stringify(orgDetails),
            headers: {
                Cookie: `jwt=${nextSessionToken?.value}`,
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