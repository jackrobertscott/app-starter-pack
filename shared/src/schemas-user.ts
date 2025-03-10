import {z} from "zod"

export const userSchema = () => {
  return z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    password: z.string().min(6),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
}

export const userPublicSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const signupInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
})

export type TypeofUser = z.infer<ReturnType<typeof userSchema>>
export type UserPublic = z.infer<typeof userPublicSchema>
export type LoginInput = z.infer<typeof loginInputSchema>
export type SignupInput = z.infer<typeof signupInputSchema>
