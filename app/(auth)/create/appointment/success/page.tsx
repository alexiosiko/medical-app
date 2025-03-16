"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
	const router = useRouter();
  return (
	<Card className='max-w-lg mx-auto'>
		<CardHeader>
			<CardTitle>Successfully requested appointment!</CardTitle>
		</CardHeader>
		<CardContent>
			You'll hear back from one of the members from our team shortly!
		
		</CardContent>
		<CardFooter className='flex justify-end gap-2'>
			<Button variant="secondary" onClick={() => router.push("/")}>Go Home</Button>
			<Button onClick={() => router.push("/manage/appointments")}>Manage Appointments</Button>
		</CardFooter>
	</Card>
  )
}
