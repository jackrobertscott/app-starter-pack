/**
 * Authentication utilities for the browser client
 */

const AUTH_TOKEN_KEY = "authToken"
const REMEMBER_ME_KEY = "rememberMe"
const USER_EMAIL_KEY = "userEmail"

/**
 * Get the authentication token from storage
 * Checks both localStorage and sessionStorage
 */
export function getAuthToken(): string | null {
  // First check localStorage (persistent storage)
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) {
    return token
  }
  
  // Then check sessionStorage (session-only storage)
  return sessionStorage.getItem(AUTH_TOKEN_KEY)
}

/**
 * Set the authentication token in storage
 * @param token The JWT token to store
 * @param rememberMe If true, store in localStorage (persistent), otherwise in sessionStorage (session-only)
 * @param email Optional user email to store for convenience
 */
export function setAuthToken(token: string, rememberMe: boolean = false, email?: string): void {
  // Store remember me preference
  localStorage.setItem(REMEMBER_ME_KEY, String(rememberMe))
  
  if (rememberMe) {
    // Persistent storage across browser sessions
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    // Clean up any session storage
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
    
    // Store email if provided
    if (email) {
      localStorage.setItem(USER_EMAIL_KEY, email)
    }
  } else {
    // Session-only storage (cleared when browser is closed)
    sessionStorage.setItem(AUTH_TOKEN_KEY, token)
    // Clean up any local storage
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_EMAIL_KEY)
  }
}

/**
 * Remove the authentication token from all storage
 */
export function removeAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  sessionStorage.removeItem(AUTH_TOKEN_KEY)
}

/**
 * Get the saved user email (if any)
 */
export function getSavedEmail(): string | null {
  return localStorage.getItem(USER_EMAIL_KEY)
}

/**
 * Clear all auth-related data
 */
export function clearAuthData(): void {
  removeAuthToken()
  localStorage.removeItem(USER_EMAIL_KEY)
}

/**
 * Check if the user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

/**
 * Get the remembered preference
 */
export function getRememberMe(): boolean {
  return localStorage.getItem(REMEMBER_ME_KEY) === "true"
}

/**
 * Logout the user by removing all auth data
 */
export function logout(): void {
  clearAuthData()
}