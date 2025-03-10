// **type-only** import
import {browserConfig} from "@browser/browser-config"
import type {AppRouter} from "@server/server"
import {createTRPCClient, httpBatchLink} from "@trpc/client"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: browserConfig.VITE_SERVER_URL,
    }),
  ],
})
