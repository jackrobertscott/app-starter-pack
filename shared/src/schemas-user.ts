import {z} from "zod"

export const userSchema = () => {
  return z.object({
    id: z.string(),
    name: z.string(),
  })
}

export type TypeofUser = z.infer<ReturnType<typeof userSchema>>
