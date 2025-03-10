import {expect, test} from "@playwright/test"
import {TestUtils} from "@test/test-utils"

test.describe("Navigation and Routing", () => {
  // Generate a unique email for testing to avoid conflicts
  const testEmail = TestUtils.generateTestEmail("test-nav")
  const password = "Test123456!"
  const firstName = "Test"
  const lastName = "User"

  test.beforeEach(async ({page}) => {
    // Start at the root path
    await page.goto("/")
  })

  test("can navigate between login and signup pages", async ({page}) => {
    // Check we're on login page
    await expect(
      page.locator("h2").filter({hasText: "Welcome Back"})
    ).toBeVisible()

    // Navigate to signup page
    await page.click('a[href="/signup"]')
    await expect(
      page.locator("h2").filter({hasText: "Create Account"})
    ).toBeVisible()

    // Navigate back to login page
    await page.click('a[href="/"]')
    await expect(
      page.locator("h2").filter({hasText: "Welcome Back"})
    ).toBeVisible()
  })

  test("login page redirects to home after successful login", async ({
    page,
  }) => {
    // First create a user
    await page.click('a[href="/signup"]')
    await page.fill('input[placeholder="John"]', firstName)
    await page.fill('input[placeholder="Doe"]', lastName)
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill('input[placeholder="Create a password"]', password)
    await page.click('button[type="submit"]')

    // Wait for redirect to home page
    await page.waitForURL("**/home")

    // Log out (This will depend on your app's logout implementation)
    // For testing, we'll just navigate back to login
    await page.goto("/")

    // Now test login redirect
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill('input[placeholder="Enter your password"]', password)
    await page.click('button[type="submit"]')

    // Should redirect to home
    await page.waitForURL("**/home")
    expect(page.url()).toContain("/home")
  })

  test("remembers login state on page reload", async ({page}) => {
    // Log in first
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill('input[placeholder="Enter your password"]', password)
    await page.check('input[id="remember-me"]') // Make sure remember me is checked
    await page.click('button[type="submit"]')

    // Wait for redirect to home
    await page.waitForURL("**/home")

    // Reload the page
    await page.reload()

    // Check we're still on home page and not redirected to login
    expect(page.url()).toContain("/home")
  })

  test("direct navigation to protected route redirects to login when not authenticated", async ({
    page,
    context,
  }) => {
    // Clear cookies and storage to ensure we're logged out
    await context.clearCookies()
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })

    // Try to access a protected route directly
    await page.goto("/home")

    // Should be redirected to login
    await page.waitForURL("**/")
    // Instead of checking that URL doesn't contain "/home", check that we see the login page
    await expect(
      page.locator("h2").filter({hasText: "Welcome Back"})
    ).toBeVisible()
  })

  test("browser back button works as expected after login", async ({page}) => {
    // Log in
    await page.fill('input[placeholder="you@example.com"]', testEmail)
    await page.fill('input[placeholder="Enter your password"]', password)
    await page.click('button[type="submit"]')

    // Wait for redirect to home
    await page.waitForURL("**/home")

    // Go back in browser history
    await page.goBack()

    // Should still be on home page since login->home replaces history entry
    expect(page.url()).toContain("/home")
  })
})
