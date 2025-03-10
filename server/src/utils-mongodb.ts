import {TypeofUser} from "@shared/schemas-user"
import {Collection, Db, Document, MongoClient, ServerApiVersion} from "mongodb"
import {serverConfig} from "./server-config"

// Global MongoDB client instance
let client: MongoClient | null = null
let db: Db | null = null
let connectionPromise: Promise<MongoClient> | null = null

// MongoDB collection names
const COLLECTIONS = {
  USERS: "users",
} as const

/**
 * Get MongoDB client instance
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (client) return client
  
  // If a connection is already in progress, return that promise to avoid multiple connection attempts
  if (connectionPromise) return connectionPromise
  
  connectionPromise = new Promise<MongoClient>((resolve, reject) => {
    const newClient = new MongoClient(serverConfig.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    
    newClient.connect()
      .then(() => {
        console.log("Connected to MongoDB")
        client = newClient
        resolve(newClient)
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error)
        connectionPromise = null
        reject(error)
      })
  })
  
  return connectionPromise
}

/**
 * Get MongoDB database instance
 */
export async function getMongoDb(): Promise<Db> {
  if (db) return db

  const client = await getMongoClient()
  db = client.db()
  return db
}

/**
 * Get a MongoDB collection with proper type
 */
export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const db = await getMongoDb()
  return db.collection<T>(collectionName)
}

/**
 * Type-safe helper for accessing MongoDB collections
 */
export const collections = {
  users: () => getCollection<TypeofUser>(COLLECTIONS.USERS),
}

/**
 * Close MongoDB connection
 */
export async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log("MongoDB connection closed")
  }
}
