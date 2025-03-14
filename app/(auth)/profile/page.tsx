"use client";

import { User, Gender } from '@/lib/types/user';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserProfileUpdate() {
	const { user, isLoaded } = useUser();
	const [userData, setUserData] = useState<User | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	// State for input fields
	const [preferredName, setPreferredName] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<string>('');
	const [gender, setGender] = useState<Gender | ''>('');

	useEffect(() => {
		if (!isLoaded || !user?.id) return;

		async function fetchUser() {
		setLoading(true);
		try {
			const res = await axios.get('/api/users', {
			params: { id: user?.id },
			});
			const data: User = res.data;
			setUserData(data);
			console.log(data);
			// Initialize input fields with fetched data
			setPreferredName(data.preferredName || '');
			setDateOfBirth(data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '');
			setGender(data.gender || '');
		} catch (e) {
			console.error(e);
			toast.error("Error fetching data :(");
		} finally {
			setLoading(false);
		}
		}

		fetchUser();
	}, [isLoaded, user?.id]);
	const handleUpdate = async () => {
		if (!user?.id) {
		toast.error("User ID is missing.");
		return;
		}
		try {
		await axios.patch('/api/users', {
			data: {
				id: user.id,
				preferredName,
				dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
				gender: gender || undefined,
			}
		});
		toast.success("User updated successfully.");
		} catch (error) {
		console.error(error);
		toast.error("Error updating user.");
		}
	};

	if (loading) {
		return 		<Card className="max-w-md mx-auto">
					<CardHeader>
						<CardTitle>Getting profile data ...</CardTitle>
					</CardHeader>
					</Card>
	}


	return (
		<Card className="max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<Label htmlFor="preferredName" className="block text-sm font-medium text-gray-700">
					Preferred Name:
					</Label>
					<Input
					type="text"
					id="preferredName"
					value={preferredName}
					onChange={(e) => setPreferredName(e.target.value)}
					className="mt-1 block w-full"
					/>

				</div>
				<div>
					<Label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
					Date of Birth:
					</Label>
					<Input
					type="date"
					id="dateOfBirth"
					value={dateOfBirth}
					onChange={(e) => setDateOfBirth(e.target.value)}
					className="mt-1 block w-full"
					/>

				</div>
				<div>
					<Label htmlFor="gender" className="block text-sm font-medium text-gray-700">
					Gender:
					</Label>
					<Select onValueChange={(value) => setGender(value as Gender)} value={gender}>
						<SelectTrigger className="mt-1 w-full">
							{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Select Gender'}
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
						</Select>

				</div>
			</CardContent>
			<CardFooter>
					<Button onClick={handleUpdate} className="mt-4">
					Update
				</Button>
			</CardFooter>
		</Card>
	);
}
