import dotenv from "dotenv"
import path, {dirname} from "node:path"
import {fileURLToPath} from "node:url"
import {z} from "zod"

dotenv.config({
  path: path.resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
})

export const serverConfig = z
  .object({
    IS_DEV: z.boolean(),

    PORT: z.coerce.number().int(),
    APP_NAME: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    URL_CLIENT: z.string().min(1),

    MONGO_URI: z.string().min(1),

    // AWS_ACCESS_KEY_ID: z.string().optional(),
    // AWS_SECRET_ACCESS_KEY: z.string().optional(),
    // AWS_DEFAULT_REGION: z.string().optional(),

    // AWS_SES_FROM_EMAIL: z.string().min(1),
    // AWS_S3_BUCKET: z.string().min(1),
    // AWS_S3_BUCKET_FOLDER: z.string().min(1),

    // STRIPE_SECRET_KEY: z.string().min(1).startsWith("sk_"),
  })
  .parse({
    ...process.env,
    IS_DEV: process.env.URL_CLIENT?.startsWith("http://localhost"),
  })
