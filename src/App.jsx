"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./lib/auth-context"

// Pages
import Home from "./pages/Home"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App

