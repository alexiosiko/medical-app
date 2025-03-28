"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { TransitionCard, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import handleTransition from '@/lib/transition'
const BookingForm = () => {
  	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
	const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
	const [description, setDescription] = useState('');
	const [communicationMethod, setCommunicationMethod] = useState<'chat' | 'video' | 'in-person'>('in-person');
	const [document, setDocument] = useState<File | undefined>(undefined);
	const [uploading, setUploading] = useState<boolean>(false);

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			setUploading(true);
			e.preventDefault();
		
			if (!selectedDate)
				throw Error("Must select a date");
			if (!selectedTime)
				throw Error("Must select a time");
		
			const formData = new FormData();
			formData.append('date', selectedDate.toISOString());
			formData.append('time', selectedTime);
			formData.append('description', description);
			formData.append('communicationMethod', communicationMethod);
			if (document) 
				formData.append('document', document);
			
	  
			const response = await axios.post('/api/appointment', formData, {
				headers: {
				'Content-Type': 'multipart/form-data',
				},
			});
		
			if (response.status != 200)
				throw Error('Error submitting booking');

			toast.success('Booking submitted successfully.');

			handleTransition(router, '/create/appointment/success');
		} catch (error) {
			console.error(error);
			toast.error('Error submitting booking');
			setUploading(false);
		}
	  };
	  

  const timeSlots = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`);

  return (
    <TransitionCard className='max-w-lg mx-auto'>
		<CardHeader>

		<CardTitle>
			Book Appointment
		</CardTitle>
		</CardHeader>
      <CardContent className=''>
	
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border  flex justify-center"
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <div className="grid grid-cols-5 gap-2 justify-center ">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="communication-method">Communication Method</Label>
            <RadioGroup
				className='my-4 space-y-2 flex justify-around'
				
              defaultValue={communicationMethod}
			  onValueChange={(value: string) => setCommunicationMethod(value as 'chat' | 'video' | 'in-person')}
			  >
              <div className="flex place-items-center items-center space-x-2">
                <RadioGroupItem   value="chat" id="chat" />
                <Label  htmlFor="chat">Chat</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person">In-Person</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="document">Upload Document (Optional)</Label>
            <Input
              type="file"
              id="document"
              onChange={(e) => setDocument(e.target.files?.[0] || undefined)}
            />
          </div>
          <Button disabled={uploading} type="submit">Submit Booking</Button>
        </form>
      </CardContent>
    </TransitionCard>
  );
};

export default BookingForm;
