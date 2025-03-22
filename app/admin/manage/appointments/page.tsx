"use client"

import TransitionDiv from '@/components/animations/transitiondiv';
import AdminAppointment from '@/components/appointments/adminappointment';

import { CardTitle } from '@/components/ui/card';
import { IAppointment } from '@/lib/models/appointment'
import axios from 'axios';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function Auth() {
	const [appointments, setAppointments] = useState<IAppointment[]>([]);
	const [busyId, setBusyId] = useState<string | null>(null);
	
	

	useEffect(() => {
		async function fetchAppointments() {
			try {
				const res = await axios.get('/api/appointments', {
					params: {
						get_all: true
					}
				})
				if (res.status != 200)
					throw Error(res.data.message);
			
				setAppointments(res.data);
			} catch (error) {
				toast.error('Failed to load appointments');
			}
		}
		fetchAppointments();
	}, [])

	return (
		<TransitionDiv className="md:p-4 max-w-lg mx-auto">
			<div className="flex max-md:flex-col justify-between items-center">
				<CardTitle >Requested Appointments</CardTitle>
			</div>
			<AnimatePresence>
			{appointments.map((appointment, index) => (
				<AdminAppointment appointment={appointment} key={index} />
			))}
			</AnimatePresence>
			
		</TransitionDiv>
	)
}
