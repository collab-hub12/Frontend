import {z} from 'zod'
export const CreateOrgSchema = z.object({
    org_name: z.string(),
    org_desc: z.string(),
    location: z.string(),
})