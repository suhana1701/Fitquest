"use client"
import { AuthTabs } from "../components/auth/auth-tabs"
import { motion } from "framer-motion"

function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            FitQuest
          </motion.h1>
          <motion.p
            className="text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your fitness journey, gamified
          </motion.p>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AuthTabs />
        </motion.div>
      </motion.div>
    </main>
  )
}

export default Home

