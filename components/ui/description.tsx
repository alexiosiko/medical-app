import React from 'react'

export default function Description({ children }: {
	children: string
}) {
  return (
	<div className='text-xl'>{children}</div>
  )
}
