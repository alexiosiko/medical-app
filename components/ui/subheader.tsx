import React from 'react'

export default function SubHeader({ children, className }: {
	children: string,
	className?: string
}) {
  return (
	<div className={`text-3xl font-semibold ${className}`}>{children}</div>
  )
}
