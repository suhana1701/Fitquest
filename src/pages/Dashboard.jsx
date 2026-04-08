"use client"
import { useAuth } from "../lib/auth-context"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-white">FitQuest</h1>
        <Button variant="outline" className="bg-white" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <main className="flex-1 w-full max-w-4xl py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome, {user?.firstName || "Fitness Enthusiast"}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your fitness dashboard is being built. Check back soon for your personalized fitness tracking!</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your fitness goals will appear here.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your recent activities will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

