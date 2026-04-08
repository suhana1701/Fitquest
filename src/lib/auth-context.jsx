"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define user type
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fitquest-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("fitquest-user")
      }
    }
  }, [])

  const login = (email, firstName) => {
    // Create a new user object
    const userData = {
      id: `user-${Date.now()}`,
      firstName: firstName || email.split("@")[0],
      lastName: "",
      email: email,
      profilePicture: "/placeholder.svg?height=200&width=200",
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("fitquest-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("fitquest-user")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

