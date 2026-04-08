"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { motion, AnimatePresence } from "framer-motion"

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <AnimatePresence mode="wait">
        {activeTab === "login" && (
          <TabsContent value="login" className="p-6">
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <LoginForm onSignupClick={() => setActiveTab("signup")} />
            </motion.div>
          </TabsContent>
        )}
        {activeTab === "signup" && (
          <TabsContent value="signup" className="p-6">
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SignupForm onLoginClick={() => setActiveTab("login")} />
            </motion.div>
          </TabsContent>
        )}
      </AnimatePresence>
    </Tabs>
  )
}

