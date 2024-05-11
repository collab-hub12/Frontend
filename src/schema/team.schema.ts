import {z} from 'zod'
export const CreateTeamSchema = z.object({
    team_name: z.string(),
})