"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"

interface CardProps extends HTMLMotionProps<"div"> {
	className?: string;
  }
  
const TransitionCard = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
	<AnimatePresence>
	  <motion.div
	  	initial={{ opacity: 0 }}
		exit={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		ref={ref}
		data-slot="card"
		className={cn(
		  "bg-card shadow-md text-card-foreground flex flex-col gap-6 rounded-xl py-6",
		  className
		)}
		{...props}
	  />
	</AnimatePresence>
  ));
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
	<div
	  data-slot="card"
	  className={cn(
		"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
		className
	  )}
	  {...props}
	/>
  )
}
  
  TransitionCard.displayName = "TransitionCard";
  

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-4 max-md:items-center", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold text-2xl max-md:text-center", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 max-md:justify-center", className)}
      {...props}
    />
  )
}

export { TransitionCard, Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
