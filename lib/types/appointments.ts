export type CreateAppointment = {
	date: Date;
	time: string;
	description: string;
	communicationMethod: 'chat' | 'video' | 'in-person';
	document?: Buffer;
}

export type Appointment = AppointmentWithout_id & {
	_id: string
}
export type AppointmentWithout_id = CreateAppointment & {
	communicationMethod: 'chat' | 'video' | 'in-person';
	date: Date;
	description: string;
	time: string;
	document?: Buffer;
	fileName?: string;
	fileType?: string;
	createdBy: string;
	createdAt: Date;
};

