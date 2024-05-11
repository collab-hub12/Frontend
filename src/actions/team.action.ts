"use server"
import {getCookieValue} from "@/lib/session";
import {CreateTeamSchema} from "@/schema/team.schema";
import {revalidatePath} from "next/cache";

export async function createTeam(org_id: number, formData: FormData) {
    try {
        const teamDetails = CreateTeamSchema.parse({
            team_name: formData.get('team_name'),
        })

        await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams`, {
            method: 'POST',
            body: JSON.stringify(teamDetails),
            headers: {
                Cookie: `jwt=${getCookieValue('jwt')}`,
                'Content-Type': 'application/json'
            }
        })

    } catch (err) {
        console.log(err);
    }
    revalidatePath(`/orgs/${org_id}`)
}