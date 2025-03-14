import { dbPromise } from "@/lib/mongodb";
import { User } from "@/lib/types/user";
import { validateRequestAndParseToJson } from "@/lib/webhook";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
	try {
	  // Access query parameters
		const searchParams = request.nextUrl.searchParams;
	  const id = searchParams.get('id');
	  if (!id)
		return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
  
	  const db = await dbPromise();
	  const existingUser = await db.collection('users').findOne({ id: id });
  
	  if (!existingUser)
		return NextResponse.json({ message: `User with id ${id} not found.` }, { status: 404 });
  
	  return NextResponse.json(existingUser);
	} catch (error: any) {
	  return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const json = await validateRequestAndParseToJson(request);
	try {
		const id = json.data.id;
		if (!id)
			return NextResponse.json({ message: `User id is null??` }, { status: 400 });
		
		const db = await dbPromise();
		const existingUser = await db.collection('users').findOne({ id: id });

		if (existingUser)
			return NextResponse.json({ message: `User with id ${id} already exists.` }, { status: 201 });

		const user: User = {
			dateOfBirth: undefined,
			gender: undefined,
			id: id,
			preferredName: undefined
		}
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
	  const user: User = json.data;
	  console.log(user);
  
	  // Ensure the user ID is provided
	  if (!user.id) 
		return NextResponse.json({ message: "User id is required." }, { status: 400 });
  
	  const db = await dbPromise();
	  const existingUser = await db.collection("users").findOne({ id: user.id });
  
	  if (!existingUser) 
		return NextResponse.json({ message: `User with id ${user.id} does not exist.` }, { status: 404 });
	  
  
	  // Update the user in the database
	  const updatedUser: Partial<User> = {};
	  if (user.dateOfBirth) updatedUser.dateOfBirth = user.dateOfBirth;
	  if (user.gender) updatedUser.gender = user.gender;
	  if (user.preferredName) updatedUser.preferredName = user.preferredName;
  
	  await db.collection("users").updateOne(
		{ id: user.id },
		{ $set: updatedUser }
	  );
  
	  return NextResponse.json({ message: "User updated successfully." });
	} catch (e: any) {
	  return NextResponse.error();
	}
  }