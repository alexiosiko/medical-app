export type User = {
	id: string;
	preferredName: string | undefined;
	dateOfBirth: Date | undefined;
	gender: Gender | undefined;
	createdAt: Date,
};

export type Gender = 'male' | 'female' | 'other'