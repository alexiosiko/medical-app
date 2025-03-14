export type User = {
	id: string;
	preferredName: string | undefined;
	dateOfBirth: Date | undefined;
	gender: Gender | undefined;
};

export type Gender = 'male' | 'female' | 'other'