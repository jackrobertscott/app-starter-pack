import type {Page} from "@playwright/test"
import {expect} from "@playwright/test"

/**
 * Helper class for common test operations
 */
export class TestUtils {
  /**
   * Create a test user for authentication tests
   */
  static async createTestUser(
    page: Page,
    {
      firstName = "Test",
      lastName = "User",
      email,
      password = "Test123456!",
    }: {
      firstName?: string
      lastName?: string
      email: string
      password?: string
    }
  ) {
    // Navigate to signup page
    await page.goto("/signup")

    // Fill the signup form
    await page.fill('input[placeholder="John"]', firstName)
    await page.fill('input[placeholder="Doe"]', lastName)
    await page.fill('input[placeholder="you@example.com"]', email)
    await page.fill('input[placeholder="Create a password"]', password)

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for navigation to complete - we should be redirected to the home page
    await page.waitForURL("**/home")

    // Verify we're on the home page
    expect(page.url()).toContain("/home")

    return {firstName, lastName, email, password}
  }

  /**
   * Log in with the specified credentials
   */
  static async login(
    page: Page,
    {
      email,
      password,
      rememberMe = true,
    }: {
      email: string
      password: string
      rememberMe?: boolean
    }
  ) {
    // Navigate to login page
    await page.goto("/")

    // Fill the login form
    await page.fill('input[placeholder="you@example.com"]', email)
    await page.fill('input[placeholder="Enter your password"]', password)

    // Set remember me checkbox based on parameter
    if (rememberMe) {
      await page.check('input[id="remember-me"]')
    } else {
      await page.uncheck('input[id="remember-me"]')
    }

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for navigation to complete - we should be redirected to the home page
    await page.waitForURL("**/home")

    // Verify we're on the home page
    expect(page.url()).toContain("/home")
  }

  /**
   * Log out the current user
   * Note: This depends on your application's logout implementation
   * This is a placeholder that should be updated based on your app's actual logout mechanism
   */
  static async logout(page: Page) {
    // This is a placeholder - replace with your app's actual logout process
    // For example:
    // await page.click('button.logout-button')
    // await page.waitForURL("**/")

    // For now, we'll just clear storage and cookies manually
    await page.evaluate(() => {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_email")
      localStorage.removeItem("remember_me")
      sessionStorage.removeItem("auth_token")
    })

    // Redirect to login page
    await page.goto("/")
  }

  /**
   * Generate a unique test email
   */
  static generateTestEmail(prefix = "test") {
    return `${prefix}-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}@example.com`
  }
}
