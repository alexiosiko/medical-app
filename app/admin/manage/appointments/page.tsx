"use client";

import TransitionDiv from '@/components/animations/transitiondiv';
import { CardTitle } from '@/components/ui/card';
import { IAppointment, AppointmentStatus } from '@/lib/models/appointment';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, MessageSquare, Video, User, X, Trash2 } from 'lucide-react';
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
import LoadingSkeleton from './loading';

export default function AppointmentsAdminPage() {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
    const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);
    
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
        confirmed: appointments.filter(app => app.status === 'confirmed'),
        cancelled: appointments.filter(app => app.status === 'cancelled'),
        completed: appointments.filter(app => app.status === 'completed'),
    };

    const filteredAppointments = filter === 'all' 
        ? appointments 
        : appointments.filter(app => app.status === filter);

    const handleCancelAppointment = async () => {
        if (!appointmentToCancel) return;
        
        try {
            const res = await axios.patch(`/api/appointment/${appointmentToCancel}`, {
                status: 'cancelled'
            });
            
            if (res.status === 200) {
                setAppointments(appointments.map(app => 
                    app._id?.toString() === appointmentToCancel ? { ...app, status: 'cancelled' } : app
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

    const handleDeleteAppointment = async () => {
        if (!appointmentToDelete) return;
        
        try {
            const res = await axios.delete(`/api/appointment/${appointmentToDelete}`);
            if (res.status === 200) {
                setAppointments(appointments.filter(app => 
                    app._id?.toString() !== appointmentToDelete
                ));
                toast.success('Appointment deleted permanently');
            }
        } catch (error) {
            toast.error('Failed to delete appointment');
            console.error(error);
        } finally {
            setAppointmentToDelete(null);
            setDeleteDialogOpen(false);
        }
    };

    const getBadgeVariant = (status: AppointmentStatus) => {
        switch (status) {
            case 'pending': return 'secondary';
            case 'confirmed': return 'default';
            case 'cancelled': return 'destructive';
            case 'completed': return 'success';
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

    return (
        <TransitionDiv className="md:p-4">
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
                        variant={filter === 'confirmed' ? 'default' : 'outline'}
                        onClick={() => setFilter('confirmed')}
                        className="rounded-full"
                    >
                        Confirmed ({isLoading ? '-' : appointmentsByStatus.confirmed.length})
                    </Button>
                    <Button
                        variant={filter === 'cancelled' ? 'default' : 'outline'}
                        onClick={() => setFilter('cancelled')}
                        className="rounded-full"
                    >
                        Cancelled ({isLoading ? '-' : appointmentsByStatus.cancelled.length})
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'default' : 'outline'}
                        onClick={() => setFilter('completed')}
                        className="rounded-full"
                    >
                        Completed ({isLoading ? '-' : appointmentsByStatus.completed.length})
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
                                    className="border rounded-lg p-6 bg-white shadow-sm transition-all hover:shadow-md relative"
                                >
                                    {appointment.status === 'cancelled' && (
                                        <button
                                            onClick={() => {
                                                setAppointmentToDelete(appointment._id?.toString() || '');
                                                setDeleteDialogOpen(true);
                                            }}
                                            className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 transition-colors"
                                            title="Delete permanently"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                    
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
                                            {appointment.status !== 'cancelled' && (
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

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel this appointment?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will mark the appointment as cancelled. You can still delete it permanently later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleCancelAppointment}
                        >
                            Confirm Cancel
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this appointment?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the cancelled appointment.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDeleteAppointment}
                        >
                            Delete Permanently
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </TransitionDiv>
    );
}