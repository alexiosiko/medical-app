import React, { ReactNode } from 'react'

export default function LeftRight({children, className}: {
	children: ReactNode[],
	className?: string,
}) {
  return (
	<div className={`flex w-full max-md:flex-col items-center justify-center place-items-center justify-items-center ${className}`}>
		{children[0]}
		{children[1]}
	</div>
  )
}
