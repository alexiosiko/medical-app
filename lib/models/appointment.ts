import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type IAppointment = {
	_id?: Types.ObjectId; // Mongoose ID type
	date: Date;
	time: string;
	description: string;
	communicationMethod: 'chat' | 'video' | 'in-person';
	document?: Buffer;
	fileName?: string;
	fileType?: string;
	createdBy: string;
	createdAt: Date;
	approvalStatus: 'approved' | 'denied' | 'pending';
	approvedBy?: string;
	approvedAt?: Date;
}

// 2. Create a Schema corresponding to the document interface.
const appointmentSchema = new Schema<IAppointment>({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  communicationMethod: { type: String, enum: ['chat', 'video', 'in-person'], required: true },
  document: Buffer,
  fileName: String,
  fileType: String,
  createdBy: String, // Reference to user
  createdAt: { type: Date, default: Date.now },
  approvalStatus: { type: String, enum: ['approved', 'denied', 'pending'], default: 'pending' },
  approvedBy: String,
  approvedAt: Date,
});

// 3. Create a Model.
const Appointment = model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
