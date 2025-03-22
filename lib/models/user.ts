import { Schema, model, Types } from 'mongoose';


export type Gender = 'Male' | 'Female' | 'Other'


// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  _id?: Types.ObjectId;
  firstName: string | null,
  lastName: string | null,
  dateOfBirth: Date | null;
  gender: 'Male' | 'Female' | 'Other' | null;
  createdAt: Date;
  email: string | null,
  phoneNumber: string | null,
  userId: string,
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	firstName: { type: String },
	lastName: { type: String },
	dateOfBirth: { type: Date },
	gender: { type: String, enum: ['male', 'female', 'other'] },
	createdAt: { type: Date, default: Date.now },
	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	userId: { type: String, required: true }
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;
