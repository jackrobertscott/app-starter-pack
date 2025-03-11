import {createId} from "@paralleldrive/cuid2"
import {collections} from "@server/utils-mongodb"
import {publicProcedure, router} from "@server/utils-trpc"
import {todoCreateInputSchema, todoDeleteInputSchema, todoPublicSchema, todoUpdateInputSchema} from "@shared/schemas-todo"

export const todoRouter = router({
  todoList: publicProcedure.query(async () => {
    const todosCollection = await collections.todos()
    const todos = await todosCollection.find({}).sort({createdAt: -1}).toArray()

    return todos.map((i) => todoPublicSchema.parse(i))
  }),

  todosByUserId: publicProcedure
    .input(todoCreateInputSchema.pick({
      userId: true,
    }))
    .query(async (opts) => {
      const todosCollection = await collections.todos()
      const todos = await todosCollection
        .find({userId: opts.input.userId})
        .sort({createdAt: -1})
        .toArray()

      return todos.map((i) => todoPublicSchema.parse(i))
    }),

  todoById: publicProcedure
    .input(todoUpdateInputSchema.pick({
      id: true,
    }))
    .query(async (opts) => {
      const todosCollection = await collections.todos()
      const todo = await todosCollection.findOne({id: opts.input.id})

      if (!todo) {
        throw new Error(`Todo with ID ${opts.input.id} not found`)
      }

      return todoPublicSchema.parse(todo)
    }),

  todoCreate: publicProcedure
    .input(todoCreateInputSchema)
    .mutation(async (opts) => {
      const todosCollection = await collections.todos()

      const now = new Date()
      const newTodo = {
        id: createId(),
        userId: opts.input.userId,
        title: opts.input.title,
        completed: false,
        createdAt: now,
        updatedAt: now,
      }

      await todosCollection.insertOne(newTodo)

      return todoPublicSchema.parse(newTodo)
    }),

  todoUpdate: publicProcedure
    .input(todoUpdateInputSchema)
    .mutation(async (opts) => {
      const todosCollection = await collections.todos()

      // Check if todo exists
      const existingTodo = await todosCollection.findOne({id: opts.input.id})
      if (!existingTodo) {
        throw new Error(`Todo with ID ${opts.input.id} not found`)
      }

      // Update todo
      const updates: Record<string, any> = {
        updatedAt: new Date(),
      }

      if (opts.input.title !== undefined) {
        updates.title = opts.input.title
      }

      if (opts.input.completed !== undefined) {
        updates.completed = opts.input.completed
      }

      const updatedTodo = {
        ...existingTodo,
        ...updates,
      }

      await todosCollection.updateOne({id: opts.input.id}, {$set: updates})

      return todoPublicSchema.parse(updatedTodo)
    }),

  todoDelete: publicProcedure
    .input(todoDeleteInputSchema)
    .mutation(async (opts) => {
      const todosCollection = await collections.todos()

      // Check if todo exists
      const existingTodo = await todosCollection.findOne({id: opts.input.id})
      if (!existingTodo) {
        throw new Error(`Todo with ID ${opts.input.id} not found`)
      }

      // Delete todo
      await todosCollection.deleteOne({id: opts.input.id})

      return {id: opts.input.id, deleted: true}
    }),
})
