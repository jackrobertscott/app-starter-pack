import {userRouter} from "@server/router-user"
import {serverConfig} from "@server/server-config"
import {createHTTPServer} from "@trpc/server/adapters/standalone"
import {mergeRouters} from "@trpc/server/unstable-core-do-not-import"
import cors from "cors"

console.log(serverConfig.APP_NAME)

const appRouter = mergeRouters(userRouter)

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
})

server.listen(4000)
