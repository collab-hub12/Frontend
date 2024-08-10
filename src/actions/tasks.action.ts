"use server"
import {getCookieValue} from "@/lib/session";
import {CreateTaskSchema} from "@/schema/task.schema";
import { revalidateTag} from "next/cache";

export async function createTask({org_id, team_id}: {org_id: number, team_id: number}, prevState: any, formData: FormData) {
    try {
        const taskDetail = CreateTaskSchema.parse({
            taskTitle: formData.get("taskTitle"),
            taskDescription: formData.get("taskDescription"),
            taskProgress: formData.get("taskProgress"),
            taskDeadline: formData.get("taskDeadline")
        })
        
        const data = await fetch(`${process.env.BACKEND_URL}/orgs/${org_id}/teams/${team_id}/tasks`, {
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
            revalidateTag('tasks')
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