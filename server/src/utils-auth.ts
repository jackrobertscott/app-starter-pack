import {TypeofUser} from "@shared/schemas-user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {serverConfig} from "./server-config"
import {collections} from "./utils-mongodb"
import {TRPCError} from "@trpc/server"

const SALT_ROUNDS = 10

export interface JWTPayload {
  userId: string
  email: string
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(user: Pick<TypeofUser, "id" | "email">): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
  }

  return jwt.sign(payload, serverConfig.JWT_SECRET, {
    expiresIn: "7d",
  })
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, serverConfig.JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid or expired token",
    })
  }
}

/**
 * Get a user by their email
 */
export async function getUserByEmail(email: string): Promise<TypeofUser | null> {
  const usersCollection = await collections.users()
  return usersCollection.findOne({email}) as Promise<TypeofUser | null>
}

/**
 * Get a user by their ID
 */
export async function getUserById(id: string): Promise<TypeofUser | null> {
  const usersCollection = await collections.users()
  return usersCollection.findOne({id}) as Promise<TypeofUser | null>
}