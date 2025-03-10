import {createId} from "@paralleldrive/cuid2"
import {collections} from "@server/utils-mongodb"
import {publicProcedure, router} from "@server/utils-trpc"
import {TypeofUser, UserPublic, userPublicSchema, userSchema} from "@shared/schemas-user"
import {z} from "zod"
import {hashPassword} from "./utils-auth"

export const userRouter = router({
  userList: publicProcedure.query(async () => {
    const usersCollection = await collections.users()
    const users = await usersCollection.find({}).sort({createdAt: -1}).toArray()

    return users.map((user): UserPublic => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }),

  userById: publicProcedure
    .input(
      userSchema().pick({
        id: true,
      })
    )
    .query(async (opts) => {
      const usersCollection = await collections.users()
      const user = await usersCollection.findOne({id: opts.input.id})

      if (!user) {
        throw new Error(`User with ID ${opts.input.id} not found`)
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } as UserPublic
    }),

  userCreate: publicProcedure
    .input(
      userSchema().pick({
        email: true,
      }).extend({
        password: z.string().min(6)
      })
    )
    .mutation(async (opts) => {
      const usersCollection = await collections.users()

      // Check if user with this email already exists
      if (opts.input.email) {
        const existingUser = await usersCollection.findOne({
          email: opts.input.email,
        })
        if (existingUser) {
          throw new Error(`User with email ${opts.input.email} already exists`)
        }
      }

      const now = new Date()
      const hashedPassword = await hashPassword(opts.input.password)
      
      const newUser: TypeofUser = {
        id: createId(),
        email: opts.input.email,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      }

      await usersCollection.insertOne(newUser)

      return {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      } as UserPublic
    }),

  userUpdate: publicProcedure
    .input(
      userSchema().pick({
        id: true,
        email: true,
      })
    )
    .mutation(async (opts) => {
      const usersCollection = await collections.users()

      // Check if user exists
      const existingUser = await usersCollection.findOne({id: opts.input.id})
      if (!existingUser) {
        throw new Error(`User with ID ${opts.input.id} not found`)
      }

      // If email is being changed, check if new email is already in use
      if (opts.input.email && opts.input.email !== existingUser.email) {
        const emailInUse = await usersCollection.findOne({
          email: opts.input.email,
          id: {$ne: opts.input.id},
        })

        if (emailInUse) {
          throw new Error(`Email ${opts.input.email} is already in use`)
        }
      }

      // Update user
      const updatedUser = {
        ...existingUser,
        email: opts.input.email || existingUser.email,
        updatedAt: new Date(),
      }

      await usersCollection.updateOne({id: opts.input.id}, {$set: updatedUser})

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      } as UserPublic
    }),

  userDelete: publicProcedure
    .input(
      userSchema().pick({
        id: true,
      })
    )
    .mutation(async (opts) => {
      const usersCollection = await collections.users()

      // Check if user exists
      const existingUser = await usersCollection.findOne({id: opts.input.id})
      if (!existingUser) {
        throw new Error(`User with ID ${opts.input.id} not found`)
      }

      // Delete user
      await usersCollection.deleteOne({id: opts.input.id})

      return {id: opts.input.id, deleted: true}
    }),
})
