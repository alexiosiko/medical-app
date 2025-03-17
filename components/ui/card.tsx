"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion';

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
	<AnimatePresence>
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.5 }}
		>
			<div
			data-slot="card"
			className={cn(
				"bg-card shadow-md text-card-foreground flex flex-col gap-6 rounded-xl  py-6",
				className
			)}
			{...props}
			/>
		</motion.div>
	</AnimatePresence>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 md:px-6 max-md:items-center", className)}
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
      className={cn("md:px-6 max-md:px-2 max-md:items-center max-md:text-center", className)}
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

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
