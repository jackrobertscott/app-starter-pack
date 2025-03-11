import {z} from "zod"

export const todoSchema = () => {
  return z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string().min(1),
    completed: z.boolean().default(false),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
}

export const todoPublicSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1),
  completed: z.boolean(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
})

export const todoCreateInputSchema = z.object({
  title: z.string().min(1),
  userId: z.string(),
})

export const todoUpdateInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  completed: z.boolean().optional(),
})

export const todoDeleteInputSchema = z.object({
  id: z.string(),
})

export type TypeofTodo = z.infer<ReturnType<typeof todoSchema>>
export type TodoPublic = z.infer<typeof todoPublicSchema>
export type TodoCreateInput = z.infer<typeof todoCreateInputSchema>
export type TodoUpdateInput = z.infer<typeof todoUpdateInputSchema>
export type TodoDeleteInput = z.infer<typeof todoDeleteInputSchema>
