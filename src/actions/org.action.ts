"use server"
import {CreateOrgSchema} from "@/schema/org.schema";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export async function createOrg(formData: FormData) {
    try {
        const orgDetails = CreateOrgSchema.parse({
            org_name: formData.get('org_name'),
            org_desc: formData.get('org_desc'),
            location: formData.get('location')
        })

        const cookiesList = cookies()
        const token = cookiesList.get('jwt')?.value

        if (!token) {
            throw new Error('No token')
        }

        const data = await fetch(`${process.env.BACKEND_URL}/orgs`, {
            method: 'POST',
            body: JSON.stringify(orgDetails),
            headers: {
                Cookie: `jwt=${token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(await data.json());

    } catch (err) {
        console.log(err);

    }
    revalidatePath('/orgs')
}

export async function addUserOrg(payload: {org_id: number, user_id: number}, prevState: any, formData: FormData) {

    try {
        const cookiesList = cookies()
        const token = cookiesList.get('jwt')?.value
        if (!token) {
            throw new Error('No token')
        }
        const data = await fetch(`${process.env.BACKEND_URL}/orgs/${payload.org_id}/users`, {
            method: 'POST',
            body: JSON.stringify({user_id: payload.user_id}),
            headers: {
                Cookie: `jwt=${token}`,
                'Content-Type': 'application/json'
            },
            cache: "no-store"
        })

        const response = await data.json();

        if (response?.error || response?.message === "Unauthorized") {
            return {
                message: 'User does not have right access to do this operation',
                error: true
            }
        } else {
            revalidatePath("/orgs/[org_id]", "page")
            return {
                message: "Successfully added User to the org",
                error: false
            }
        }


    } catch (err) {
        return {
            message: 'internal server error',
            error: true
        }
    }
}


export async function removeUserOrg(payload: {org_id: number, user_id: number}, prevState: any, formData: FormData) {

    try {
        const cookiesList = cookies()
        const token = cookiesList.get('jwt')?.value

        if (!token) {
            throw new Error('No token')
        }

        const data = await fetch(`${process.env.BACKEND_URL}/orgs/${payload.org_id}/users/${payload.user_id}`, {
            method: 'DELETE',
            headers: {
                Cookie: `jwt=${token}`,
                'Content-Type': 'application/json'
            }
        })
        const response = await data.json();
        if (response?.error === "Forbidden") {
            return {
                message: 'User does not have right access to do this operation',
                error: true
            }
        } else {

            return {
                message: "Successfully Removed User from the org",
                error: false
            }
        }
    } catch (err) {
        console.log(err);

        return {
            message: 'internal server error',
            error: true
        }
    }
}