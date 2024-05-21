import {z} from 'zod'
export const CreateTaskSchema = z.object({
    taskTitle: z.string(),
    taskDescription: z.string(),
    taskProgress: z.enum(["InProgress", "Done", "NotStarted", "InReview"]),
    taskDeadline: z.string(),
})