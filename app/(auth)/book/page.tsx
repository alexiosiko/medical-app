"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Times from "@/components/book/times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentType from "@/components/book/appointmenttype";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  } from "@/components/ui/alert-dialog";
export default function Page() {
const [date, setDate] = useState<Date | undefined>(new Date());
const [time, setTime] = useState<string>("");
const [appointmentType, setAppointmentType] = useState<string>("");
const [description, setDescription] = useState<string>("");
const [isDialogOpen, setIsDialogOpen] = useState(false);

const handleBooking = () => {
	// Open the dialog
	setIsDialogOpen(true);
};

return (
	<Card className="max-w-xl mx-auto">
		<CardHeader>
			<CardTitle className="text-center">Book an Appointment</CardTitle>
		</CardHeader>
		<CardContent className="flex flex-col items-center gap-4">
			<div className="h-80">

				<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-md border shadow text-3xl font-bold"
				/>
			</div>
			<Times selectedTime={time} setTime={setTime} />
			<AppointmentType
			selectedType={appointmentType}
			setAppointmentType={setAppointmentType}
			/>
			<Textarea
					className="h-32  !max-w-[95%] mt-12"
					placeholder="Give the reason for your appointment here ..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
							<AlertDialog >
								<AlertDialogTrigger asChild>
									<Button>Book Appointment</Button>
								</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
						<AlertDialogTitle>Confirm Your Appointment</AlertDialogTitle>
						<AlertDialogDescription>
							<span><strong>Date:</strong> {date?.toLocaleDateString()}</span><br />
							<span><strong>Time:</strong> {time}</span><br />
							<span><strong>Type:</strong> {appointmentType}</span><br />
							<span><strong>Description:</strong> {description}</span>
						</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
						<AlertDialogCancel >Cancel</AlertDialogCancel>
						<AlertDialogAction >Confirm</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
					</AlertDialog> 
					</CardContent>
		</Card>
	);
}