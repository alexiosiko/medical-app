"use client"

import TransitionDiv from '@/components/animations/transitiondiv';
import { CardTitle } from '@/components/ui/card';
import { IAppointment, AppointmentStatus } from '@/lib/models/appointment';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, MessageSquare, Video, User, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AppointmentsAdminPage() {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchAppointments() {
            try {
                setIsLoading(true);
                const res = await axios.get('/api/appointments', {
                    params: { get_all: true }
                });
                if (res.status !== 200) throw Error(res.data.message);
                setAppointments(res.data);
            } catch (error) {
                toast.error('Failed to load appointments');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAppointments();
    }, []);

    const appointmentsByStatus = {
        pending: appointments.filter(app => app.status === 'pending'),
        approved: appointments.filter(app => app.status === 'approved'),
        denied: appointments.filter(app => app.status === 'denied')
    };

    const filteredAppointments = filter === 'all' 
        ? appointments 
        : appointments.filter(app => app.status === filter);

    const handleCancelAppointment = async () => {
        if (!appointmentToCancel) return;
        
        try {
            const res = await axios.patch(`/api/appointment/${appointmentToCancel}`, {
                status: 'denied'
            });
            
            if (res.status === 200) {
                setAppointments(appointments.map(app => 
                    app._id?.toString() === appointmentToCancel ? { ...app, status: 'denied' } : app
                ));
                toast.success('Appointment cancelled successfully');
            }
        } catch (error) {
            toast.error('Failed to cancel appointment');
            console.error(error);
        } finally {
            setAppointmentToCancel(null);
            setCancelDialogOpen(false);
        }
    };

    const getBadgeVariant = (status: AppointmentStatus) => {
        switch (status) {
            case 'pending': return 'secondary';
            case 'approved': return 'default';
            case 'denied': return 'destructive';
            default: return 'outline';
        }
    };

    const getCommunicationIcon = (method: string) => {
        switch (method) {
            case 'video': return <Video className="h-4 w-4" />;
            case 'chat': return <MessageSquare className="h-4 w-4" />;
            case 'in-person': return <User className="h-4 w-4" />;
            default: return <MessageSquare className="h-4 w-4" />;
        }
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            <div className="flex flex-wrap items-center gap-4">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 min-w-[150px]">
                            <Skeleton className="h-9 w-full" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <TransitionDiv className="md:p-4 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <CardTitle className="text-2xl">Appointments Management</CardTitle>
                
                <div className="flex flex-wrap gap-2">
                    <Button 
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                        className="rounded-full"
                    >
                        All ({isLoading ? '-' : appointments.length})
                    </Button>
                    <Button 
                        variant={filter === 'pending' ? 'default' : 'outline'}
                        onClick={() => setFilter('pending')}
                        className="rounded-full"
                    >
                        Pending ({isLoading ? '-' : appointmentsByStatus.pending.length})
                    </Button>
                    <Button 
                        variant={filter === 'approved' ? 'default' : 'outline'}
                        onClick={() => setFilter('approved')}
                        className="rounded-full"
                    >
                        Approved ({isLoading ? '-' : appointmentsByStatus.approved.length})
                    </Button>
                    <Button 
                        variant={filter === 'denied' ? 'default' : 'outline'}
                        onClick={() => setFilter('denied')}
                        className="rounded-full"
                    >
                        Denied ({isLoading ? '-' : appointmentsByStatus.denied.length})
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredAppointments.length === 0 ? (
                            <Alert className="bg-blue-50">
                                <AlertDescription className="text-center py-8">
                                    No {filter === 'all' ? '' : filter} appointments found
                                </AlertDescription>
                            </Alert>
                        ) : (
                            filteredAppointments.map((appointment) => (
                                <div 
                                    key={appointment._id?.toString()}
                                    className="border rounded-lg p-6 bg-white shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex flex-wrap items-center gap-4">
                                                <Badge variant={getBadgeVariant(appointment.status)}>
                                                    {appointment.status}
                                                </Badge>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {format(new Date(appointment.date), 'MMMM d, yyyy')}
                                                    <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                                    {appointment.time}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                {getCommunicationIcon(appointment.communicationMethod)}
                                                {appointment.communicationMethod === 'in-person' ? 'In-Person' : 
                                                 appointment.communicationMethod === 'video' ? 'Video Call' : 'Chat'}
                                            </div>
                                            
                                            <p className="text-sm">{appointment.description}</p>
                                            
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <User className="h-4 w-4" />
                                                {appointment.createdBy}
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2 min-w-[150px]">
                                            {appointment.status !== 'denied' && (
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => {
                                                        setAppointmentToCancel(appointment._id?.toString()!);
                                                        setCancelDialogOpen(true);
                                                    }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <X className="h-4 w-4" />
                                                    Cancel
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}

            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel this appointment?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. The appointment will be marked as denied.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleCancelAppointment}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Confirm Cancel
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </TransitionDiv>
    );
}