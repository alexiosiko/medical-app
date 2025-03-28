
import { NextRequest, NextResponse } from 'next/server';
import { dbPromise } from '@/lib/mongodb';
import { auth } from '@clerk/nextjs/server';




export async function GET(request: NextRequest) {
	try {
		const { userId } = await auth();
		const db = await dbPromise();
		let appointments = await db.collection('appointments').find({ createdBy: userId }).toArray();
		return NextResponse.json(appointments);
	} catch (error: any) {
		console.error(error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

