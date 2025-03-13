import { dbPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {

		const data = (await request.json()).data;
		const id = data.id;
		(await dbPromise()).collection('users').insertOne({ id: id });
		return NextResponse.json({ message: "worked" });
	} catch (e: any) {
		return NextResponse.json({ message: e.message}, { status: 500 });
	}
}
