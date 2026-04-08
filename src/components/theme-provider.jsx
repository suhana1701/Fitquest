"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
  disableTransitionOnChange = false,
}) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme")
      if (storedTheme) return storedTheme

      if (enableSystem) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        return systemTheme
      }
    }

    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    if (disableTransitionOnChange) {
      root.classList.add("disable-transitions")

      // Force a reflow
      window.getComputedStyle(root).opacity
    }

    if (attribute === "class") {
      root.classList.remove("light", "dark")
      if (theme !== "system") {
        root.classList.add(theme)
      }
    } else {
      root.setAttribute(attribute, theme)
    }

    if (disableTransitionOnChange) {
      // Force a reflow
      window.getComputedStyle(root).opacity

      setTimeout(() => {
        root.classList.remove("disable-transitions")
      }, 0)
    }

    localStorage.setItem("theme", theme)
  }, [theme, attribute, disableTransitionOnChange])

  const setTheme = (newTheme) => {
    setThemeState(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

