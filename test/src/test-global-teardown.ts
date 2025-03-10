import {collections} from "@server/utils-mongodb"

export default async function () {
  console.log("🧹 Global teardown: Cleaning up test data")

  try {
    // Clean up any test data created during the tests
    const usersCollection = await collections.users()

    // Delete test users created during test runs
    const result = await usersCollection.deleteMany({
      email: {
        $regex: /^test-.*@example\.com$/,
      },
    })

    console.log(
      `✅ Global teardown complete: Removed ${result.deletedCount} test users`
    )
  } catch (error) {
    console.error("❌ Global teardown failed:", error)
  }
}
