"use client"

import TransitionDiv from '@/components/animations/transitiondiv';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, TransitionCard } from '@/components/ui/card';
import { User } from '@clerk/nextjs/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function page({ params }: { 
	params: Promise<{ userId: string}>
}) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getCreatedBy = async () => {
			console.log((await params).userId);
			try {
				const res = await axios.get('/api/user', {
					params: {
						userId: (await params).userId
					}
				});


				if (res.status != 200)
					throw Error(res.data.message);

				setUser(res.data);
				console.log(res.data);

			} catch (e: any) {
				console.error(e);
				toast.error(e.message);
			}
		}

		getCreatedBy();
	}, [])
  return (

	<TransitionCard>
		<CardHeader>
			<CardTitle className='flex items-center justify-center gap-4'>
				<Avatar>
					<AvatarImage  src={user?.imageUrl}/>
				</Avatar>
				{user?.firstName} {user?.lastName}
			</CardTitle>
		</CardHeader>
		<CardContent>
			<p>{user?.primaryEmailAddress?.emailAddress}</p>
			<a href={`tel:${user?.primaryPhoneNumber}`}>{user?.primaryPhoneNumber?.phoneNumber}</a>

		</CardContent>
		
	</TransitionCard>
  )
}
