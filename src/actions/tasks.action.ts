"use server"
import {getCookieValue} from "@/lib/session";
import {CreateTaskSchema} from "@/schema/task.schema";
import {revalidatePath, revalidateTag} from "next/cache";

export async function createTask({org_id, team_name}: {org_id: number, team_name: string}, prevState: any, formData: FormData) {
    try {
        const taskDetail = CreateTaskSchema.parse({
            taskTitle: formData.get("taskTitle"),
            taskDescription: formData.get("taskDescription"),
            taskProgress: formData.get("taskProgress"),
            taskDeadline: formData.get("taskDeadline")
        })


        const data = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/${team_name}/tasks`, {
            method: 'POST',
            body: JSON.stringify(taskDetail),
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
            return {
                message: "Task Added",
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