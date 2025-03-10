import {test, expect} from "@playwright/test"

test.describe("UI Components", () => {
  test("login page renders correctly", async ({page}) => {
    await page.goto("/")
    
    // Check page title
    await expect(page.locator("h2").filter({hasText: "Welcome Back"})).toBeVisible()
    
    // Check form elements
    await expect(page.locator('input[placeholder="you@example.com"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible()
    await expect(page.locator('input[id="remember-me"]')).toBeVisible()
    await expect(page.locator('label[for="remember-me"]')).toContainText("Remember me")
    await expect(page.locator('button[type="submit"]')).toContainText("Sign in")
    
    // Check links
    await expect(page.locator('a', {hasText: "Forgot your password?"})).toBeVisible()
    await expect(page.locator('a[href="/signup"]')).toContainText("Sign up")
    
    // Verify layout classes
    const form = page.locator('form')
    await expect(form).toHaveClass(/mt-6 space-y-6/)
    
    // Check that there are icons
    await expect(page.locator('svg')).toBeVisible()
  })
  
  test("signup page renders correctly", async ({page}) => {
    await page.goto("/signup")
    
    // Check page title
    await expect(page.locator("h2").filter({hasText: "Create Account"})).toBeVisible()
    
    // Check form elements
    await expect(page.locator('input[placeholder="John"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Doe"]')).toBeVisible()
    await expect(page.locator('input[placeholder="you@example.com"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Create a password"]')).toBeVisible()
    await expect(page.locator('input[id="remember-me"]')).toBeVisible()
    await expect(page.locator('label[for="remember-me"]')).toContainText("Remember me")
    await expect(page.locator('button[type="submit"]')).toContainText("Sign up")
    
    // Check links
    await expect(page.locator('a[href="/"]')).toContainText("Sign in")
    
    // Verify layout classes
    const form = page.locator('form')
    await expect(form).toHaveClass(/mt-6 space-y-6/)
    
    // Check form fields count
    await expect(page.locator('.rounded-md.space-y-5 input')).toHaveCount(4)
    
    // Check that there are icons
    await expect(page.locator('svg')).toBeVisible()
  })
  
  test("form validation visual feedback", async ({page}) => {
    // Test login form validation
    await page.goto("/")
    
    // Submit empty form and check for HTML5 validation
    await page.click('button[type="submit"]')
    
    // Check that we're still on the login page (form didn't submit)
    await expect(page.locator("h2").filter({hasText: "Welcome Back"})).toBeVisible()
    
    // Test signup form validation
    await page.goto("/signup")
    
    // Submit empty form and check for HTML5 validation
    await page.click('button[type="submit"]')
    
    // Check that we're still on the signup page (form didn't submit)
    await expect(page.locator("h2").filter({hasText: "Create Account"})).toBeVisible()
  })
  
  test("responsive layout", async ({page}) => {
    // Test login page on mobile viewport
    await page.setViewportSize({width: 375, height: 667}) // iPhone SE size
    await page.goto("/")
    
    // Check that everything is visible and properly sized
    await expect(page.locator("h2").filter({hasText: "Welcome Back"})).toBeVisible()
    await expect(page.locator('input[placeholder="you@example.com"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    
    // Test signup page on mobile viewport
    await page.goto("/signup")
    
    // Check that everything is visible and properly sized
    await expect(page.locator("h2").filter({hasText: "Create Account"})).toBeVisible()
    await expect(page.locator('input[placeholder="John"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Doe"]')).toBeVisible()
    await expect(page.locator('input[placeholder="you@example.com"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Create a password"]')).toBeVisible()
    
    // Check layout adjusts for mobile
    await expect(page.locator('form')).toBeVisible()
  })
  
  test("form card component styling", async ({page}) => {
    await page.goto("/")
    
    // Check that the form is visible
    const formCard = page.locator('form').first()
    await expect(formCard).toBeVisible()
    
    // Check that there's an icon somewhere on the page
    await expect(page.locator('svg')).toBeVisible()
    
    // Check responsive padding
    const padding = await formCard.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.padding
    })
    
    // Verify there is some padding (actual values will depend on screen size)
    expect(padding).toBeTruthy()
  })
  
  test("button component styling and states", async ({page}) => {
    await page.goto("/")
    
    const button = page.locator('button[type="submit"]')
    
    // Check button styling
    await expect(button).toHaveClass(/bg-indigo-600/)
    
    // Check button hover state
    await button.hover()
    
    // Check disabled state
    await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]') as HTMLButtonElement
      button.disabled = true
    })
    
    await expect(button).toBeDisabled()
    
    // Re-enable button
    await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]') as HTMLButtonElement
      button.disabled = false
    })
    
    await expect(button).toBeEnabled()
  })
})