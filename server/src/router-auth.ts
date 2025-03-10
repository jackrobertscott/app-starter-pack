import {TRPCError} from "@trpc/server"
import {createId} from "@paralleldrive/cuid2"
import {loginInputSchema, signupInputSchema} from "@shared/schemas-user"
import {publicProcedure, router} from "./utils-trpc"
import {
  comparePassword,
  generateToken,
  getUserByEmail,
  hashPassword,
} from "./utils-auth"
import {collections} from "./utils-mongodb"

export const authRouter = router({
  login: publicProcedure.input(loginInputSchema).mutation(async ({input}) => {
    const user = await getUserByEmail(input.email)

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      })
    }

    const passwordValid = await comparePassword(input.password, user.password)

    if (!passwordValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      })
    }

    const token = generateToken(user)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    }
  }),

  signup: publicProcedure.input(signupInputSchema).mutation(async ({input}) => {
    const existingUser = await getUserByEmail(input.email)

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already in use",
      })
    }

    const hashedPassword = await hashPassword(input.password)
    const now = new Date()
    const id = createId()

    const newUser = {
      id,
      email: input.email,
      password: hashedPassword,
      name: input.name,
      createdAt: now,
      updatedAt: now,
    }

    const usersCollection = await collections.users()
    await usersCollection.insertOne(newUser)

    const token = generateToken(newUser)

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
    }
  }),
})