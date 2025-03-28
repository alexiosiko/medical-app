"use client"

import { TransitionLink } from '@/components/animations/transitionlink';
import { Button } from '@/components/ui/button';
import { TransitionCard, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
	const router = useRouter();
  return (
	<TransitionCard className=''>
		<CardHeader>
			<CardTitle>Successfully requested appointment!</CardTitle>
		</CardHeader>
		<CardContent>
			You'll hear back from one of the members from our team shortly!
		
		</CardContent>
		<CardFooter className='flex justify-end gap-2'>
		 	<TransitionLink href='/'><Button variant="secondary" >Go Home</Button></TransitionLink>	
		 	<TransitionLink href='/manage/appointments'><Button>Manage Appointments</Button></TransitionLink>	
		</CardFooter>
	</TransitionCard>
  )
}
