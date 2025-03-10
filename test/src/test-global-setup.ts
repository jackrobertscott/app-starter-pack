import {collections} from "@server/utils-mongodb"

export default async function () {
  console.log("🚀 Global setup: Initializing test environment")

  try {
    // Ensure MongoDB connection is established
    const usersCollection = await collections.users()

    // Delete any test users created in previous test runs
    await usersCollection.deleteMany({
      email: {
        $regex: /^test-.*@example\.com$/,
      },
    })

    console.log("✅ Global setup complete: Test users cleaned up")
  } catch (error) {
    console.error("❌ Global setup failed:", error)
    throw error
  }
}
