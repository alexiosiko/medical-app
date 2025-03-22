import React, { useEffect, useState } from 'react'
import { formatDate } from '@/lib/time';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { IAppointment } from '@/lib/models/appointment';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';
import { User } from '@clerk/nextjs/server';
import axios from 'axios';



export default function AdminAppointment({ appointment }: {
	appointment: IAppointment
}) {
	const [busy, setBusy] = useState<boolean>(false);

	const handleDownload = (appointment: IAppointment) => {
		try {
			if (!appointment.fileName || !appointment || !appointment.document) 
				return;
		
			// Decode the base64 string to a byte array
			const byteCharacters = atob(appointment.document as any);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) 
				byteNumbers[i] = byteCharacters.charCodeAt(i);
		
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
			console.error('Error downloading document: ', error);
			toast.error('Failed to download document');
		}
	};


	const handleDelete = async (_id: string | undefined) => {
		try {
			setBusy(true);
		} catch (e) {

		} finally {
			setBusy(false);
		}

	}
	const handleDeny = async (_id: string | undefined) => {
		try {
			setBusy(true);
		} catch (e) {

		} finally {
			setBusy(false);
		}
	}
	return (
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
						<p>
							Created by: {appointment.createdBy}
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
						<Button disabled={busy}>
							{busy ? 'Updating...' : 'Edit'}
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
								Confirm
							</AlertDialogAction>
							<AlertDialogAction
								onClick={() => handleDeny(appointment._id?.toString())}
							>
								Deny
							</AlertDialogAction>
					
						</AlertDialogFooter>
					</AlertDialogContent>
					</AlertDialog>
				</CardContent>
			</Card>
		</motion.div>
	)
}
