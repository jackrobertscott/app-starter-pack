import {publicProcedure, router} from "@server/utils-trpc"
import {userSchema} from "@shared/schemas-user"

export const userRouter = router({
  userList: publicProcedure.query(async () => {
    return [
      {id: "1", name: "Alice"},
      {id: "2", name: "Bob"},
    ]
  }),

  userById: publicProcedure
    .input(
      userSchema().pick({
        id: true,
      })
    )
    .query(async (opts) => {
      return {id: opts.input.id, name: "Alice"}
    }),

  userCreate: publicProcedure
    .input(
      userSchema().pick({
        name: true,
      })
    )
    .mutation(async (opts) => {
      return {id: "3", name: opts.input.name}
    }),
})
