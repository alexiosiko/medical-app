// app/admin/appointments/page.tsx
"use client"

import TransitionDiv from '@/components/animations/transitiondiv';
import AdminAppointment from '@/components/appointments/adminappointment';
import { CardTitle } from '@/components/ui/card';
import { IAppointment, AppointmentStatus } from '@/lib/models/appointment'
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSkeleton from './loading';

export default function AppointmentsAdminPage() {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    
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


    return (
        <TransitionDiv className="md:p-4 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <CardTitle className="text-2xl">Appointments Management</CardTitle>
                
                <div className="flex justify-center flex-wrap gap-2">
                    <Button 
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                    >
                        All ({isLoading ? '-' : appointments.length})
                    </Button>
                    <Button 
                        variant={filter === 'pending' ? 'default' : 'outline'}
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200 data-[active=true]:bg-blue-500"
                        onClick={() => setFilter('pending')}
                    >
                        Pending ({isLoading ? '-' : appointmentsByStatus.pending.length})
                    </Button>
                    <Button 
                        variant={filter === 'approved' ? 'default' : 'outline'}
                        className="bg-green-100 text-green-800 hover:bg-green-200 data-[active=true]:bg-green-500"
                        onClick={() => setFilter('approved')}
                    >
                        Approved ({isLoading ? '-' : appointmentsByStatus.approved.length})
                    </Button>
                    <Button 
                        variant={filter === 'denied' ? 'default' : 'outline'}
                        className="bg-red-100 text-red-800 hover:bg-red-200 data-[active=true]:bg-red-500"
                        onClick={() => setFilter('denied')}
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
                        {filteredAppointments.map((appointment) => (
                            // In your parent component
							<AdminAppointment 
								key={appointment._id?.toString()}
								appointment={appointment}
								onStatusChange={(updatedAppointment) => {
								// Update your state here
								setAppointments(prev => prev.map(a => 
								a._id === updatedAppointment._id ? updatedAppointment : a
								))
							}}
							/>
                        ))}
                    </AnimatePresence>
                    {filteredAppointments.length === 0 && (
                        <p className="text-gray-500 text-center py-8">
                            No {filter === 'all' ? '' : filter} appointments found
                        </p>
                    )}
                </div>
            )}
        </TransitionDiv>
    );
}