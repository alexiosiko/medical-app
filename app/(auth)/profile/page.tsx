"use client";

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TransitionCard, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from './loading';
import { Gender, IUser } from '@/lib/models/user';

export default function UserProfileUpdate() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);

  // Single state object for all user data
  const [userData, setUserData] = useState<{
    dateOfBirth: string;
    gender: string;
    email: string;
    phoneNumber: string;
    userId: string;
	firstName: string,
	lastName: string,
  }>({
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    userId: '',
	firstName: '',
	lastName: '',
  });

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await axios.get('/api/user');
        const data: IUser = res.data;
        
        setUserData({
			firstName: data.firstName || '',
			lastName: data.lastName || '',
			dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
			gender: data.gender || '',
			email: data.email || '',
			phoneNumber: data.phoneNumber || '',
			userId: data.userId || '',
        });

      } catch (e) {
        console.error(e);
        toast.error("Error fetching data :(");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [user, isLoaded]);

  const handleUpdate = async () => {
    try {
      setFetching(true);
      if (!user?.id) {
        toast.error("User ID is missing.");
        return;
      }

      // Convert form data to IUser format
      const updatedUser: IUser = {
		firstName: userData.firstName,
		lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
        gender: (userData.gender as Gender) || null,
        email: userData.email || null,
        phoneNumber: userData.phoneNumber || null,
        userId: userData.userId,
        createdAt: new Date(), // This should come from backend normally
      };
	  
	  validateForm(updatedUser);

      await axios.patch('/api/user', { data: updatedUser});
      toast.success("User updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Error updating user.");
    } finally {
      setFetching(false);
    }
  };

  if (!isLoaded || loading) {
    return <Loading />;
  }

  return (
    <TransitionCard className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="preferredName">First Name:</Label>
            <Input
              type="text"
              id="preferredName"
              value={userData.firstName}
              onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="preferredName">Last Name:</Label>
            <Input
              type="text"
              id="preferredName"
              value={userData.lastName}
              onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
              className="mt-1"
            />
          </div>

			<div className='grid grid-cols-2 gap-4'>


				<div>
					<Label htmlFor="dateOfBirth">Date of Birth:</Label>
					<Input
					type="date"
					id="dateOfBirth"
					value={userData.dateOfBirth}
					onChange={(e) => setUserData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
					className="mt-1"
					/>
				</div>

				<div>
					<Label htmlFor="gender">Gender:</Label>
					<Select
					value={userData.gender}
					onValueChange={(value) => setUserData(prev => ({ ...prev, gender: value }))}
					>
					<SelectTrigger className="mt-1 w-full">
						{userData.gender || 'Select Gender'}
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Male">Male</SelectItem>
						<SelectItem value="Female">Female</SelectItem>
						<SelectItem value="Other">Other</SelectItem>
					</SelectContent>
					</Select>
				</div>
		  </div>

          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input
              type="tel"
              id="phoneNumber"
              value={userData.phoneNumber}
              onChange={(e) => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="mt-1"
            />
          </div>


        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={fetching} onClick={handleUpdate} className="mt-4">
          Update
        </Button>
      </CardFooter>
    </TransitionCard>
  );
}


function  validateForm(userData: IUser): boolean {
	if (userData.email == null)
		throw Error("Please add your email.");
	if (userData.phoneNumber == null)
		throw Error("Please add your phone number.");



	return true;
}