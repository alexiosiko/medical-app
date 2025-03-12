import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type BookAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    date: string;
    time: string;
    appointmentType: string;
    description: string;
  };
};

export default function BookAlertDialog({
  isOpen,
  onClose,
  bookingDetails,
}: BookAlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="absolute">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Appointment</AlertDialogTitle>
          <AlertDialogDescription>
            <span><strong>Date:</strong> {bookingDetails.date}</span><br />
            <span><strong>Time:</strong> {bookingDetails.time}</span><br />
            <span><strong>Type:</strong> {bookingDetails.appointmentType}</span><br />
            <span><strong>Description:</strong> {bookingDetails.description}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
