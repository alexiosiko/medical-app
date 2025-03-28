"use client";

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Appointment = {
  id: string;
  date: string;
  time: string;
  description: string;
  communicationMethod: 'chat' | 'video' | 'in-person';
  documentUrl?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
};

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState<'chat' | 'video' | 'in-person'>('in-person');
  const [document, setDocument] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'book' | 'view'>('book');

  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointment');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setUploading(true);
      e.preventDefault();
  
      if (!selectedDate) throw Error("Must select a date");
      if (!selectedTime) throw Error("Must select a time");
  
      const formData = new FormData();
      formData.append('date', selectedDate.toISOString());
      formData.append('time', selectedTime);
      formData.append('description', description);
      formData.append('communicationMethod', communicationMethod);
      if (document) formData.append('document', document);
      
      const response = await axios.post('/api/appointment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status !== 200) throw Error('Error submitting booking');

      toast.success('Booking submitted successfully!');
      setAppointments([...appointments, response.data]);
      setActiveTab('view');
      resetForm();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error submitting booking');
    } finally {
      setUploading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      const response = await axios.delete(`/api/appointment/${id}`);
      if (response.status === 200) {
        setAppointments(appointments.map(appt => 
          appt.id === id ? { ...appt, status: 'cancelled' } : appt
        ));
        toast.success('Appointment cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  const resetForm = () => {
    setSelectedDate(new Date());
    setSelectedTime(undefined);
    setDescription('');
    setCommunicationMethod('in-person');
    setDocument(undefined);
  };

  const timeSlots = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`);

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex border-b">
        <Button
          variant="ghost"
          className={`rounded-none ${activeTab === 'book' ? 'border-b-2 border-primary' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book Appointment
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none ${activeTab === 'view' ? 'border-b-2 border-primary' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          My Appointments ({appointments.length})
        </Button>
      </div>

      {activeTab === 'book' ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Schedule New Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border flex justify-center"
                />
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className="py-2"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the reason for your appointment..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Communication Method</Label>
                <RadioGroup
                  value={communicationMethod}
                  onValueChange={(value) => setCommunicationMethod(value as typeof communicationMethod)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chat" id="chat" />
                    <Label htmlFor="chat">Chat</Label>
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

              <div className="space-y-2">
                <Label htmlFor="document">Upload Document (Optional)</Label>
                <Input
                  type="file"
                  id="document"
                  onChange={(e) => setDocument(e.target.files?.[0] || undefined)}
                  className="cursor-pointer"
                />
                {document && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {document.name}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={uploading}
              >
                {uploading ? 'Submitting...' : 'Book Appointment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <Alert>
              <AlertTitle>No Appointments</AlertTitle>
              <AlertDescription>
                You don't have any appointments scheduled yet. Book one now!
              </AlertDescription>
            </Alert>
          ) : (
            appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="flex flex-row justify-between items-start space-y-0">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {format(parseISO(appointment.date), 'MMMM d, yyyy')} at {appointment.time}
                      <Badge variant={getBadgeVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {appointment.communicationMethod === 'in-person' ? 'In-Person' : 
                       appointment.communicationMethod === 'video' ? 'Video Call' : 'Chat'}
                    </p>
                  </div>
                  {appointment.status === 'pending' || appointment.status === 'confirmed' ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => cancelAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                  ) : null}
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{appointment.description}</p>
                  {appointment.documentUrl && (
                    <div className="mt-3">
                      <a 
                        href={appointment.documentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View attached document
                      </a>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  Booked on {format(parseISO(appointment.createdAt), 'MMMM d, yyyy \'at\' h:mm a')}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;