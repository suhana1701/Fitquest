"use client"

import { createContext, useContext, useState, useRef, useEffect } from "react"
import { cn } from "../../lib/utils"

const SelectContext = createContext({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
})

export function Select({ children, value, onValueChange, defaultValue }) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setSelectedValue(newValue)
    }
    setOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{
        value: value !== undefined ? value : selectedValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ className, children, id, ...props }) {
  const { value, open, setOpen } = useContext(SelectContext)

  return (
    <button
      type="button"
      id={id}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 opacity-50"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  )
}

export function SelectValue({ placeholder }) {
  const { value } = useContext(SelectContext)

  return <span className="flex-1 truncate">{value ? value : placeholder}</span>
}

export function SelectContent({ className, children, ...props }) {
  const { open, setOpen } = useContext(SelectContext)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectItem({ className, value, children, ...props }) {
  const { value: selectedValue, onValueChange } = useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected ? "bg-accent text-accent-foreground" : "",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
      {children}
    </div>
  )
}

