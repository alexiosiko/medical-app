import { NextRequest, NextResponse } from 'next/server';
import { dbPromise } from '@/lib/mongodb';




export async function GET(request: NextRequest) {
	try {
		const db = await dbPromise();
		let appointments = await db.collection('appointments').find({}).toArray();
		return NextResponse.json(appointments);
	} catch (error: any) {
		console.error(error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

