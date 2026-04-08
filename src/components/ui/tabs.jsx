"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "../../lib/utils"

const TabsContext = createContext({
  value: "",
  onValueChange: () => {},
})

export function Tabs({ defaultValue, value, onValueChange, className, children, ...props }) {
  const [tabValue, setTabValue] = useState(defaultValue || "")

  const contextValue = {
    value: value !== undefined ? value : tabValue,
    onValueChange: onValueChange || setTabValue,
  }

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ className, value, children, ...props }) {
  const { value: selectedValue, onValueChange } = useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ className, value, children, ...props }) {
  const { value: selectedValue } = useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    >
      {children}
    </div>
  )
}

