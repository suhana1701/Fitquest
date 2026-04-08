"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Dumbbell } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "../../hooks/use-toast"
import { useAuth } from "../../lib/auth-context"

export function LoginForm({ onSignupClick }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function onSubmit(event) {
    event.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Login the user
      login(formData.email)

      // Success toast
      toast({
        title: "Login successful",
        description: "Welcome back to FitQuest!",
      })

      // Redirect to dashboard
      navigate("/dashboard")
    }, 1500)
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-primary/10 p-3 rounded-full">
          <Dumbbell className="h-6 w-6 text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold">Welcome back</h3>
        <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
      </motion.div>

      <form onSubmit={onSubmit} className="space-y-4">
        <motion.div className="space-y-2" custom={0} variants={itemVariants} initial="hidden" animate="visible">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </motion.div>

        <motion.div className="space-y-2" custom={1} variants={itemVariants} initial="hidden" animate="visible">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="px-0 font-normal h-auto" size="sm">
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </motion.div>

        <motion.div
          className="flex items-center space-x-2"
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me
          </Label>
        </motion.div>

        <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div className="text-center" custom={4} variants={itemVariants} initial="hidden" animate="visible">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0" onClick={onSignupClick}>
            Sign up
          </Button>
        </p>
      </motion.div>

      <motion.div className="relative" custom={5} variants={itemVariants} initial="hidden" animate="visible">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-3"
        custom={6}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Button variant="outline" type="button" disabled={isLoading}>
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          Apple
        </Button>
      </motion.div>
    </div>
  )
}

