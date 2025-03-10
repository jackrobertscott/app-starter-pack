import {z} from "zod"

export const userSchema = () => {
  return z.object({
    id: z.string(),
    email: z.string().email(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
}

export type TypeofUser = z.infer<ReturnType<typeof userSchema>>
