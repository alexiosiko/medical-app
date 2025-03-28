"use client";

import { IAppointment, AppointmentStatus } from '@/lib/models/appointment';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export default function StatusUpdater({ appointment }: { appointment: IAppointment }) {
  const [currentStatus, setCurrentStatus] = useState<AppointmentStatus>(appointment.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | null>(null);

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: <Clock className="w-4 h-4 mr-2" />, color: 'bg-yellow-500 hover:bg-yellow-600' },
    { value: 'approved', label: 'Approved', icon: <CheckCircle2 className="w-4 h-4 mr-2" />, color: 'bg-green-500 hover:bg-green-600' },
    { value: 'denied', label: 'Denied', icon: <XCircle className="w-4 h-4 mr-2" />, color: 'bg-red-500 hover:bg-red-600' },
  ];

  const confirmUpdate = (newStatus: AppointmentStatus) => {
    setSelectedStatus(newStatus);
    setShowDialog(true);
  };

	const updateStatus = async () => {
		if (!selectedStatus) return;
		setIsUpdating(true);
		setShowDialog(false);
		try {
		const updateData = {
			status: selectedStatus,
			...(selectedStatus === 'approved' && {
			approvedAt: new Date(),
			}),
		};

		const res = await axios.patch(`/api/appointment/${appointment._id}`, updateData);
		if (res.status === 200) {
			setCurrentStatus(selectedStatus);
			toast.success(`Status updated to ${selectedStatus}`);
		}
		} catch (error) {
		toast.error('Failed to update status');
		console.error(error);
		} finally {
		setIsUpdating(false);
		setSelectedStatus(null);
		}
	};

  const currentStatusOption = statusOptions.find(opt => opt.value === currentStatus) || statusOptions[0];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`${currentStatusOption.color} text-white`} disabled={isUpdating}>
            <div className="flex items-center">
              {currentStatusOption.icon}
              {currentStatusOption.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => confirmUpdate(option.value as AppointmentStatus)}
              disabled={option.value === currentStatus || isUpdating}
              className="cursor-pointer"
            >
              {option.icon}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <p>Do you really want to change the status to {selectedStatus}?</p>
          <AlertDialogFooter>
            <Button variant="destructive" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={updateStatus} disabled={isUpdating}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
