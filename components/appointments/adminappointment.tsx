"use client"

import { IAppointment, AppointmentStatus } from '@/lib/models/appointment';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock, Download, CalendarDays, Clock as ClockIcon, Video, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusUpdater from './statusupdater';

interface AdminAppointmentProps {
  appointment: IAppointment;
  onStatusChange: (updatedAppointment: IAppointment) => void;
}

export default function AdminAppointment({ appointment, onStatusChange }: AdminAppointmentProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (newStatus: AppointmentStatus) => {
    setIsUpdating(true);
    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === 'approved' && {
          approvedBy: 'Admin', // Replace with actual admin ID
          approvedAt: new Date()
        })
      };

      const res = await axios.patch(`/api/appointment/${appointment._id}`, updateData);
      if (res.status === 200) {
        onStatusChange({ ...appointment, ...updateData });
        toast.success(`Appointment ${newStatus}`);
      }
    } catch (error) {
      toast.error(`Failed to update status`);
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'approved':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
          </Badge>
        );
      case 'denied':
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="w-3 h-3 mr-1" /> Denied
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
    }
  };

  const getCommunicationIcon = () => {
    switch (appointment.communicationMethod) {
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'in-person': return <User className="w-4 h-4 text-purple-500" />;
      default: return null;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {format(new Date(appointment.date), 'PPP')} at {appointment.time}
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-sm">
            {getCommunicationIcon()}
            <span className="capitalize">{appointment.communicationMethod.replace('-', ' ')}</span>
          </div>

          {appointment.description && (
            <p className="text-sm text-gray-600">{appointment.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {/* Status Update Buttons */}
            {appointment.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  className="gap-1 bg-green-600 hover:bg-green-700"
                  onClick={() => updateStatus('approved')}
                  disabled={isUpdating}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="gap-1"
                  onClick={() => updateStatus('denied')}
                  disabled={isUpdating}
                >
                  <XCircle className="h-4 w-4" />
                  Deny
                </Button>
              </>
            )}

            {appointment.status === 'approved' && (
              <Button
                size="sm"
                variant="destructive"
                className="gap-1"
                onClick={() => updateStatus('denied')}
                disabled={isUpdating}
              >
                <XCircle className="h-4 w-4" />
                Cancel Approval
              </Button>
            )}

            {appointment.status === 'denied' && (
              <Button
                size="sm"
                className="gap-1 bg-green-600 hover:bg-green-700"
                onClick={() => updateStatus('approved')}
                disabled={isUpdating}
              >
                <CheckCircle2 className="h-4 w-4" />
                Re-approve
              </Button>
            )}

            {/* Document Download Button */}
            {appointment.document && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={() => {
                  // Download logic here
                }}
                disabled={isUpdating}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 mt-2">
            <p>Created by: {appointment.createdBy}</p>
            <p>Created at: {format(new Date(appointment.createdAt), 'PPpp')}</p>
            {appointment.lastUpdatedBy && (
              <p>Approved by: {appointment.lastUpdatedBy}</p>
            )}
            {appointment.lastUpdatedAt && (
              <p>Approved at: {format(new Date(appointment.lastUpdatedAt), 'PPpp')}</p>
            )}
          </div>
        </div>
		<div className="flex justify-end mt-4">
		</div>
      </CardContent>
    </Card>
  );
}