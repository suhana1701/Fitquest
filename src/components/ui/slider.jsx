"use client"

import { useState } from "react"
import { cn } from "../../lib/utils"

export function Slider({
  className,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [0],
  value,
  onValueChange,
  ...props
}) {
  const [values, setValues] = useState(value || defaultValue)

  const handleChange = (e) => {
    const newValue = [Number.parseInt(e.target.value, 10)]

    if (value === undefined) {
      setValues(newValue)
    }

    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  const percentage = ((values[0] - min) / (max - min)) * 100

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
      <div className="relative w-full h-2 overflow-hidden rounded-full bg-secondary">
        <div className="absolute h-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={values[0]}
        onChange={handleChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />
      <div
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  )
}

