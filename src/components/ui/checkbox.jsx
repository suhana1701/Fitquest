"use client"

import { useState } from "react"
import { cn } from "../../lib/utils"

export function Checkbox({ className, checked, onCheckedChange, id, ...props }) {
  const [isChecked, setIsChecked] = useState(checked || false)

  const handleChange = (e) => {
    const newChecked = e.target.checked
    setIsChecked(newChecked)
    if (onCheckedChange) {
      onCheckedChange(newChecked)
    }
  }

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        className="peer absolute h-4 w-4 opacity-0"
        {...props}
      />
      <div
        className={cn(
          "peer-focus-visible:ring-offset-2 peer-focus-visible:ring-2 peer-focus-visible:ring-ring h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
      >
        {(checked !== undefined ? checked : isChecked) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  )
}

