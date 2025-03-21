"use client";

import { useLayoutEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransitionLink } from '@/components/animations/transitionlink';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from './loading';
import TransitionDiv from '@/components/animations/transitiondiv';
import { IAppointment } from '@/lib/models/appointment';
import { formatDate } from '@/lib/time';


export default function AppointmentsPage() {
	const { userId, isLoaded } = useAuth();
	const [ appointments, setAppointments] = useState<IAppointment[]>([]);
	const [ loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	useLayoutEffect(() => {
		if (isLoaded && userId) {
		fetchAppointments();
		}
	}, [isLoaded, userId]);

	const fetchAppointments = async () => {
		try {
		setLoading(true);
		const response = await axios.get('/api/appointments');
		const data = await response.data
		setAppointments(data);
		setLoading(false);
		} catch (error) {
		toast.error('Failed to load appointments');
		}
	};

	const handleDelete = async (appointment_id: string | undefined) => {
		try {
			if (!appointment_id)
				throw Error("ObjectId is null?")
			setDeletingId(appointment_id);
			const response = await axios.delete('/api/appointments', {
				params: {
					_id: appointment_id
				}
			})


			if (response.status != 200) 
				throw Error('Failed to cancel appointment');

			setAppointments(prev => prev.filter(a => a._id?.toString() !== appointment_id));
			toast.success('Appointment cancelled successfully');
			} catch (error: any) {
				console.log(error);
				toast.error(error.message);
			} finally {
				setDeletingId(null);
			}
	};

	const handleDownload = (appointment: IAppointment) => {
		try {
			if (!appointment.fileName || !appointment || !appointment.document) 
				return;
		
			// Decode the base64 string to a byte array
			const byteCharacters = atob(appointment.document as any);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
		
			// Create a Blob from the byte array
			const blob = new Blob([byteArray], { type: 'application/pdf' }); // Adjust MIME type as needed
		
			// Create a URL for the Blob
			const url = window.URL.createObjectURL(blob);
		
			// Create an anchor element
			const a = document.createElement('a');
			a.href = url;
			a.download = appointment.fileName;
			a.style.display = 'none';
		
			// Append the anchor to the document body
			document.body.appendChild(a);
		
			// Programmatically click the anchor to trigger the download
			a.click();
		
			// Clean up by revoking the Object URL and removing the anchor
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
			} catch (error) {
			console.error('Error downloading document:', error);
			toast.error('Failed to download document');
			}
	};

	if (loading)
		return <Loading />


	return (
		<TransitionDiv className="md:p-4 max-w-lg mx-auto">
			<div className="flex max-md:flex-col justify-between items-center">
				<h1 className="text-2xl font-bold">My Appointments</h1>
				<TransitionLink href="/create/appointment">
				<Button>New Appointment</Button>
				</TransitionLink>
			</div>

		{appointments.length === 0 ? (
			<div className="text-center text-gray-500">
			No appointments scheduled yet.
			</div>
		) : (
			<AnimatePresence>
			{appointments.map((appointment) => (
				<motion.div 
					layout="position"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					key={appointment._id?.toString()}
					exit={{ opacity: 0, x: 500 }}
					className='mb-4'
					>
					<Card>
						<CardContent className=" flex justify-between items-center">
							<div>
								<h3 className="font-semibold">
									{new Date(appointment.date).toLocaleDateString()} - {appointment.time}
								</h3>
								<p className="text-gray-600">{appointment.description}</p>
								<p className="text-sm text-gray-500">
									Method: {appointment.communicationMethod}
								</p>
								{appointment.fileName && (
									<p onClick={() => handleDownload(appointment)} className="text-sm text-blue-600">
										Document: {appointment.fileName}
									</p>
								)}
								<p>
									Created at: {formatDate(appointment.createdAt)}
								</p>
								{appointment.approvalStatus == 'approved' ?
								<>	
									<p>
										Status: {appointment.approvalStatus}
									</p>
									<p>
										Approved at: {formatDate(appointment.approvedAt)}
									</p>

									<p>
										Approved by: {appointment.approvedBy}
									</p>
								</> 
								: <p>
									Status: {appointment.approvalStatus}
								</p>
								}
							</div>
							
							<AlertDialog>
							<AlertDialogTrigger asChild >
								<Button 
								variant="destructive" 
								disabled={deletingId === appointment._id?.toString()}
								>
								{deletingId === appointment._id?.toString() ? 'Cancelling...' : 'Cancel'}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
								<AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to cancel this appointment? This action cannot be undone.
								</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
								<AlertDialogCancel>Back</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => handleDelete(appointment._id?.toString())}
								>
									Confirm Cancellation
								</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
							</AlertDialog>
						</CardContent>
					</Card>
				</motion.div>
			))}
			</AnimatePresence>
		)}
		</TransitionDiv>
	);
}