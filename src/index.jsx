import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles/globals.css"
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider } from "./lib/auth-context"
import { Toaster } from "./components/ui/toaster"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

