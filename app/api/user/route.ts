import { IUser } from "@/lib/models/user";
import { dbPromise } from "@/lib/mongodb";
import { validateRequestAndParseToJson } from "@/lib/webhook";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const { userId } = await auth();
		if (!userId)
			return NextResponse.json({ message: "userId is null"}, { status: 500 });
		
		const db = await dbPromise();
		const user = await db.collection('users').findOne({ userId: userId });

		if (!user)
		{
			// create
			const newUser = createUser(userId);

			await db.collection('users').insertOne(newUser);

			return NextResponse.json(newUser);
		}
		console.log(user)
		return NextResponse.json(user);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const json = await validateRequestAndParseToJson(request);
	try {
		const userId = json.data.id;
		if (!userId)
			return NextResponse.json({ message: `User id is null??` }, { status: 400 });
		
		const db = await dbPromise();
		const existingUser = await db.collection('users').findOne({ id: userId });

		if (existingUser)
			return NextResponse.json({ message: `User with id ${userId} already exists.` }, { status: 201 });

		const user = createUser(userId);
		
		await db.collection('users').insertOne(user);
		return NextResponse.json({ message: "Created user with Id" });
	} catch (e: any) {
		return NextResponse.error();
	}
}

export async function PATCH(request: Request) {
	try {
	  // Parse the incoming JSON request body
	  const json = await request.json();
	  const user: IUser = json.data;
	  const { userId } = await auth();

	  if (!userId) 
		return NextResponse.json({ message: "User id is required." }, { status: 400 });
  
	  user.userId = userId;
  
	  const db = await dbPromise();
	  const existingUser = await db.collection("users").findOne({ userId: user.userId });
  
	  if (!existingUser) 
		return NextResponse.json({ message: `User with id ${user.userId} does not exist.` }, { status: 404 });
	  
  
	  // Update the user in the database
  
	  await db.collection("users").updateOne(
		{ userId: user.userId },
		{ $set: user }
	  );
  
	  return NextResponse.json({ message: "User updated successfully." });
	} catch (e: any) {
		console.error(e);
	  return NextResponse.error();
	}
  }


function createUser(userId: string): IUser {
	return {
		email: null,
		dateOfBirth: null,
		gender: null,
		userId: userId,
		firstName: null,
		lastName: null,
		createdAt: new Date(),
		phoneNumber: null

	};
}