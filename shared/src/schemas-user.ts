import {z} from "zod"

export const userSchema = () => {
  return z.object({
    id: z.string(),
    email: z.string().email(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
}

export type TypeofUser = z.infer<ReturnType<typeof userSchema>>
