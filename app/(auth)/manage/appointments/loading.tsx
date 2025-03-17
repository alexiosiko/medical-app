import TransitionDiv from '@/components/animations/transitiondiv'
import { TransitionCard } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
  return (
		<TransitionDiv className="p-4 space-y-4 max-w-lg mx-auto">
			<div className='flex justify-between'>
				<Skeleton className="h-8 w-[200px]" />
				<Skeleton className="h-8 w-[200px]" />
			</div>
			<div className="space-y-8">
			{[1, 2, 3].map((i) => (
				<Skeleton key={i} className="h-32 w-full" />
			))}
			</div>
		</TransitionDiv>
  )
}
