"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"
import { Checkbox } from "../components/ui/checkbox"
import { Trophy, Dumbbell, Target, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "../hooks/use-toast"

export default function Onboarding() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [profileData, setProfileData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
  })

  const [fitnessData, setFitnessData] = useState({
    fitnessLevel: "",
    activities: [],
    workoutFrequency: "",
  })

  const [goalsData, setGoalsData] = useState({
    dailySteps: 10000,
    weeklyWorkouts: 4,
    monthlyCalories: 8000,
    goals: [],
  })

  const [errors, setErrors] = useState({})

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name, value) => {
    if (step === 1) {
      setProfileData((prev) => ({ ...prev, [name]: value }))
    } else if (step === 2) {
      setFitnessData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleActivityToggle = (activity, checked) => {
    if (checked) {
      setFitnessData((prev) => ({
        ...prev,
        activities: [...prev.activities, activity],
      }))
    } else {
      setFitnessData((prev) => ({
        ...prev,
        activities: prev.activities.filter((a) => a !== activity),
      }))
    }

    // Clear error when user selects
    if (errors.activities) {
      setErrors((prev) => ({ ...prev, activities: "" }))
    }
  }

  const handleGoalToggle = (goal, checked) => {
    if (checked) {
      setGoalsData((prev) => ({
        ...prev,
        goals: [...prev.goals, goal],
      }))
    } else {
      setGoalsData((prev) => ({
        ...prev,
        goals: prev.goals.filter((g) => g !== goal),
      }))
    }
  }

  const handleSliderChange = (name, value) => {
    setGoalsData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const validateStep = () => {
    if (step === 1) {
      const newErrors = {}

      if (!profileData.height) {
        newErrors.height = "Height is required"
      }

      if (!profileData.weight) {
        newErrors.weight = "Weight is required"
      }

      if (!profileData.age) {
        newErrors.age = "Age is required"
      }

      if (!profileData.gender) {
        newErrors.gender = "Please select a gender"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    } else if (step === 2) {
      const newErrors = {}

      if (!fitnessData.fitnessLevel) {
        newErrors.fitnessLevel = "Please select a fitness level"
      }

      if (fitnessData.activities.length === 0) {
        newErrors.activities = "Select at least one activity"
      }

      if (!fitnessData.workoutFrequency) {
        newErrors.workoutFrequency = "Please select a workout frequency"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      // Success toast
      toast({
        title: "Profile setup complete",
        description: "Your fitness profile has been created successfully!",
      })

      // Redirect to dashboard
      navigate("/dashboard")
    }, 1500)
  }

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <Card className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {step === 1 ? (
                    <Trophy className="h-6 w-6 text-primary" />
                  ) : step === 2 ? (
                    <Dumbbell className="h-6 w-6 text-primary" />
                  ) : (
                    <Target className="h-6 w-6 text-primary" />
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl">
                {step === 1 ? "Welcome to FitQuest" : step === 2 ? "Your Fitness Profile" : "Set Your Goals"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Let's get started with your fitness journey"
                  : step === 2
                    ? "Tell us about your fitness experience"
                    : "Set your fitness goals to track your progress"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="175"
                      value={profileData.height}
                      onChange={handleProfileChange}
                      className={errors.height ? "border-red-500" : ""}
                    />
                    {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="70"
                      value={profileData.weight}
                      onChange={handleProfileChange}
                      className={errors.weight ? "border-red-500" : ""}
                    />
                    {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="30"
                      value={profileData.age}
                      onChange={handleProfileChange}
                      className={errors.age ? "border-red-500" : ""}
                    />
                    {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={profileData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger id="gender" className={errors.gender ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fitnessLevel">Fitness Level</Label>
                    <Select
                      value={fitnessData.fitnessLevel}
                      onValueChange={(value) => handleSelectChange("fitnessLevel", value)}
                    >
                      <SelectTrigger id="fitnessLevel" className={errors.fitnessLevel ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select fitness level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="athlete">Athlete</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fitnessLevel && <p className="text-sm text-red-500 mt-1">{errors.fitnessLevel}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Activities</Label>
                    {errors.activities && <p className="text-sm text-red-500 mt-1">{errors.activities}</p>}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="running"
                          checked={fitnessData.activities.includes("running")}
                          onCheckedChange={(checked) => handleActivityToggle("running", checked)}
                        />
                        <Label htmlFor="running" className="font-normal">
                          Running
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cycling"
                          checked={fitnessData.activities.includes("cycling")}
                          onCheckedChange={(checked) => handleActivityToggle("cycling", checked)}
                        />
                        <Label htmlFor="cycling" className="font-normal">
                          Cycling
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="weightTraining"
                          checked={fitnessData.activities.includes("weightTraining")}
                          onCheckedChange={(checked) => handleActivityToggle("weightTraining", checked)}
                        />
                        <Label htmlFor="weightTraining" className="font-normal">
                          Weight Training
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="yoga"
                          checked={fitnessData.activities.includes("yoga")}
                          onCheckedChange={(checked) => handleActivityToggle("yoga", checked)}
                        />
                        <Label htmlFor="yoga" className="font-normal">
                          Yoga
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="swimming"
                          checked={fitnessData.activities.includes("swimming")}
                          onCheckedChange={(checked) => handleActivityToggle("swimming", checked)}
                        />
                        <Label htmlFor="swimming" className="font-normal">
                          Swimming
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hiit"
                          checked={fitnessData.activities.includes("hiit")}
                          onCheckedChange={(checked) => handleActivityToggle("hiit", checked)}
                        />
                        <Label htmlFor="hiit" className="font-normal">
                          HIIT
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workoutFrequency">Workout Frequency (per week)</Label>
                    <Select
                      value={fitnessData.workoutFrequency}
                      onValueChange={(value) => handleSelectChange("workoutFrequency", value)}
                    >
                      <SelectTrigger id="workoutFrequency" className={errors.workoutFrequency ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 times</SelectItem>
                        <SelectItem value="3-4">3-4 times</SelectItem>
                        <SelectItem value="5-6">5-6 times</SelectItem>
                        <SelectItem value="7+">7+ times</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.workoutFrequency && <p className="text-sm text-red-500 mt-1">{errors.workoutFrequency}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="dailySteps">Daily Steps Goal</Label>
                      <span className="text-sm font-medium">{goalsData.dailySteps.toLocaleString()} steps</span>
                    </div>
                    <Slider
                      id="dailySteps"
                      defaultValue={[goalsData.dailySteps]}
                      max={20000}
                      step={500}
                      className="py-2"
                      onValueChange={(value) => handleSliderChange("dailySteps", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="weeklyWorkouts">Weekly Workouts Goal</Label>
                      <span className="text-sm font-medium">{goalsData.weeklyWorkouts} workouts</span>
                    </div>
                    <Slider
                      id="weeklyWorkouts"
                      defaultValue={[goalsData.weeklyWorkouts]}
                      max={14}
                      step={1}
                      className="py-2"
                      onValueChange={(value) => handleSliderChange("weeklyWorkouts", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="monthlyCalories">Monthly Calories Goal</Label>
                      <span className="text-sm font-medium">{goalsData.monthlyCalories.toLocaleString()} calories</span>
                    </div>
                    <Slider
                      id="monthlyCalories"
                      defaultValue={[goalsData.monthlyCalories]}
                      max={20000}
                      step={500}
                      className="py-2"
                      onValueChange={(value) => handleSliderChange("monthlyCalories", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Fitness Goals</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="loseWeight"
                          checked={goalsData.goals.includes("loseWeight")}
                          onCheckedChange={(checked) => handleGoalToggle("loseWeight", checked)}
                        />
                        <Label htmlFor="loseWeight" className="font-normal">
                          Lose Weight
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="buildMuscle"
                          checked={goalsData.goals.includes("buildMuscle")}
                          onCheckedChange={(checked) => handleGoalToggle("buildMuscle", checked)}
                        />
                        <Label htmlFor="buildMuscle" className="font-normal">
                          Build Muscle
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="improveEndurance"
                          checked={goalsData.goals.includes("improveEndurance")}
                          onCheckedChange={(checked) => handleGoalToggle("improveEndurance", checked)}
                        />
                        <Label htmlFor="improveEndurance" className="font-normal">
                          Improve Endurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="improveFlexibility"
                          checked={goalsData.goals.includes("improveFlexibility")}
                          onCheckedChange={(checked) => handleGoalToggle("improveFlexibility", checked)}
                        />
                        <Label htmlFor="improveFlexibility" className="font-normal">
                          Improve Flexibility
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1 || isSubmitting}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={isSubmitting} className="flex items-center gap-1">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      {step === 3 ? "Finish" : "Next"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </AnimatePresence>
      </Card>
    </main>
  )
}

