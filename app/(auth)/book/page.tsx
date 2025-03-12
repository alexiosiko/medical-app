"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Times from "@/components/book/times";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentType from "@/components/book/appointmenttype";
import Description from "@/components/book/description";
import { Button } from "@/components/ui/button";
import BookAlertDialog from "@/components/book/alert-dialog";

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
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow text-3xl font-bold"
        />
        <Times selectedTime={time} setTime={setTime} />
        <AppointmentType
          selectedType={appointmentType}
          setAppointmentType={setAppointmentType}
        />
        <Description description={description} setDescription={setDescription} />
        <Button onClick={handleBooking}>Book Appointment</Button>
        <BookAlertDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          bookingDetails={{
            date: date?.toLocaleDateString() || "",
            time,
            appointmentType,
            description,
          }}
        />
      </CardContent>
    </Card>
  );
}
