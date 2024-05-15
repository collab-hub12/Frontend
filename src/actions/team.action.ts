"use server"
import {getCookieValue} from "@/lib/session";
import {CreateTeamSchema} from "@/schema/team.schema";
import {revalidatePath} from "next/cache";

export async function createTeam(org_id: number, prevState: any, formData: FormData) {
    try {
        const teamDetails = CreateTeamSchema.parse({
            team_name: formData.get('team_name'),
        })
        const data = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams`, {
            method: 'POST',
            body: JSON.stringify(teamDetails),
            headers: {
                Cookie: `jwt=${getCookieValue('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        const response = await data.json();
        if (response?.error) {
            return {
                message: 'User does not have right access to do this operation',
                error: true
            }
        } else {
            revalidatePath("orgs/[orgs_id]", "page")
            return {
                message: "Team created",
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