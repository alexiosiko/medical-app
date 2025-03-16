// app/dashboard/appointments/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
import { Appointment } from '@/lib/types/appointments';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';


export default function AppointmentsPage() {
  const { userId, isLoaded } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
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
	  console.log(data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    try {
      setDeletingId(appointmentId);
	  const response = await axios.delete('/api/appointments', {
		params: {
			_id: appointmentId
		}
	  })


      if (response.status != 200) 
		  throw Error('Failed to cancel appointment');

      setAppointments(prev => prev.filter(a => a._id !== appointmentId));
      toast.success('Appointment cancelled successfully');
    } catch (error: any) {
	console.log(error);
	toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (appointment: Appointment) => {
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
  

  if (!isLoaded || loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Please sign in to view appointments</h2>
        <TransitionLink href="/sign-in">
          <Button>Sign In</Button>
        </TransitionLink>
      </div>
    );
  }

  return (
    <div className="md:p-4 ">
      <div className="flex max-md:flex-col space-y-2 justify-between items-center">
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
				key={appointment._id}
				exit={{ opacity: 0, x: 500 }}
				className='mb-4'
				>
				<Card key={appointment._id}>
				<CardContent className="p-4 flex justify-between items-center">
					<div className="flex-1">
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
					</div>
					
					<AlertDialog>
					<AlertDialogTrigger asChild >
						<Button 
						variant="destructive" 
						disabled={deletingId === appointment._id}
						>
						{deletingId === appointment._id ? 'Cancelling...' : 'Cancel'}
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
							onClick={() => handleDelete(appointment._id)}
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
    </div>
  );
}