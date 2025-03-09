import React from 'react'

export default function Header({ children, className }: {
	children: string,
	className?: string
}) {
  return (
	<div className={`text-6xl font-extrabold ${className}`}>{children}</div>
  )
}
