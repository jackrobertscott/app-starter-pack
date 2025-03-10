import {TypeofUser} from "@shared/schemas-user"
import {TRPCError, initTRPC} from "@trpc/server"
import {getUserById, verifyToken} from "./utils-auth"

// Context type
export interface Context {
  user: TypeofUser | null
  token: string | null
}

export const createContext = async ({
  req,
}: {
  req: {headers: {authorization?: string}}
}): Promise<Context> => {
  const token = req.headers.authorization?.split(" ")[1] || null

  if (!token) {
    return {user: null, token: null}
  }

  try {
    const payload = verifyToken(token)
    const user = await getUserById(payload.userId)
    return {user, token}
  } catch (error) {
    return {user: null, token: null}
  }
}

export type ContextType = Awaited<ReturnType<typeof createContext>>

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<ContextType>().create()

/**
 * Middleware to check if user is authenticated
 */
const isAuthenticated = t.middleware(({ctx, next}) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    })
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthenticated)
