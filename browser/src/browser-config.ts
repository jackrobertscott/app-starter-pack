import {z} from "zod"

export const browserConfig = z
  .object({
    IS_PROD: z.boolean(),
    VITE_SERVER_URL: z.string().url(),
    VITE_BROWSER_URL: z.string().url(),
    VITE_STRIPE_KEY: z.string().startsWith("pk_"),
  })
  .parse({
    ...import.meta.env,
    IS_PROD: !location.href.includes("localhost"),
  })
