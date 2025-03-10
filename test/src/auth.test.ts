import {expect, test} from "@playwright/test"
import {TestUtils} from "@test/test-utils"

test.describe("Authentication", () => {
  // Generate a unique email for testing to avoid conflicts
  const testEmail = TestUtils.generateTestEmail()
  const password = "Test123456!"
  const firstName = "Test"
  const lastName = "User"

  test.beforeEach(async ({page}) => {
    // Navigate to the app
    await page.goto("/")
  })

  test("should allow a user to sign up successfully", async ({page}) => {
    // Navigate to signup page
    await page.click('a[href="/signup"]')

    // Verify we're on the signup page
    await expect(
      page.locator("h2").filter({hasText: "Create Account"})
    ).toBeVisible()

    // Fill the signup form
    await page.fill('input[placeholder="John"]', firstName)
    await page.fill('input[placeholder="Doe"]', lastName)
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill('input[placeholder="Create a password"]', password)

    // Check the remember me checkbox
    await page.check('input[id="remember-me"]')

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for navigation to complete - we should be redirected to the home page
    await page.waitForURL("**/home")

    // Verify we're on the home page (basic check)
    expect(page.url()).toContain("/home")
  })

  test("should show error for signup with existing email", async ({page}) => {
    // Navigate to signup page
    await page.click('a[href="/signup"]')

    // Fill the signup form with the same email
    await page.fill('input[placeholder="John"]', firstName)
    await page.fill('input[placeholder="Doe"]', lastName)
    await page.fill('input[placeholder="you@example.com"]', testEmail) // Using the same email
    await page.fill('input[placeholder="Create a password"]', password)

    // Submit the form
    await page.click('button[type="submit"]')

    // We should get an error message
    const errorMessage = page.locator(".bg-red-50")
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText("Email already in use")
  })

  test("should allow a user to login successfully", async ({page}) => {
    // We're already on the login page from beforeEach

    // Fill the login form
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill('input[placeholder="Enter your password"]', password)

    // Check the remember me checkbox
    await page.check('input[id="remember-me"]')

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for navigation to complete - we should be redirected to the home page
    await page.waitForURL("**/home")

    // Verify we're on the home page (basic check)
    expect(page.url()).toContain("/home")
  })

  test("should show error for login with invalid credentials", async ({
    page,
  }) => {
    // Fill the login form with incorrect password
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill(
      'input[placeholder="Enter your password"]',
      "WrongPassword123!"
    )

    // Submit the form
    await page.click('button[type="submit"]')

    // We should get an error message
    const errorMessage = page.locator(".bg-red-50")
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText("User not found")
  })
})
