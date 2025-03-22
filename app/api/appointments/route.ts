import { NextRequest, NextResponse } from 'next/server';
import { dbPromise } from '@/lib/mongodb';
import { auth } from '@clerk/nextjs/server';
import { IAppointment } from '@/lib/models/appointment';
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    
    // Validate required fields
    if (!formData.has('communicationMethod') || 
        !formData.has('date') || 
        !formData.has('time')) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract and validate data
    const communicationMethod = formData.get('communicationMethod') as string;
    const dateString = formData.get('date') as string;
    const description = formData.get('description') as string || '';
    const time = formData.get('time') as string;
    const documentFile = formData.get('document') as File | null;

    // Validate date format
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    // Handle file upload
    let documentBuffer: Buffer | undefined;
    let fileName: string | undefined;
    let fileType: string | undefined;

    if (documentFile && documentFile.size > 0) {
      // Validate file size (example: 5MB limit)
      if (documentFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { message: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }
      
      const bytes = await documentFile.arrayBuffer();
      documentBuffer = Buffer.from(bytes);
      fileName = documentFile.name;
      fileType = documentFile.type;
    }

		// Create appointment data
		const appointmentData: IAppointment = {
			communicationMethod: communicationMethod as 'chat' | 'video' | 'in-person',
			date,
			description,
			time,
			document: documentBuffer,
			fileName,
			fileType,
			createdBy: userId,
			createdAt: new Date(),
			approvalStatus: 'pending',
		};

		const db = await dbPromise();
		await db.collection('appointments').insertOne(appointmentData);
		return NextResponse.json({ message: 'Appointment created successfully' });
	} catch (error: any) {
		console.error(error);
		console.error(error.message);
		return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {

		const searchParams = request.nextUrl.searchParams;
		const getAll = searchParams.get('get_all');
		let appointments;
		const db = await dbPromise();
		if (getAll) {
			appointments = await db.collection('appointments').find({}).toArray();
		} else {
			const {userId} = await auth();
			if (!userId)
				return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
			appointments = await db.collection('appointments').find({ createdBy: userId }).toArray();
		}
		return NextResponse.json(appointments);
		
	} catch (error: any) {
		console.error(error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
	  const { userId } = await auth();
	  if (!userId) {
		return NextResponse.json(
		  { message: "Unauthorized" }, 
		  { status: 401 }
		);
	  }
  
	  const searchParams = request.nextUrl.searchParams;
	  const appointmentId = searchParams.get('_id');
	  
	  if (!appointmentId) {
		return NextResponse.json(
		  { message: "Appointment ID is required" },
		  { status: 400 }
		);
	  }
  
	  const db = await dbPromise();
	  const { ObjectId } = await import('mongodb');
  
	  // Validate appointment ID format
	  if (!ObjectId.isValid(appointmentId)) {
		return NextResponse.json(
		  { message: "Invalid appointment ID format" },
		  { status: 400 }
		);
	  }
  
	  const result = await db.collection('appointments').deleteOne({
		_id: new ObjectId(appointmentId),
		createdBy: userId
	  });
  
	  if (result.deletedCount === 0) {
		return NextResponse.json(
		  { message: "Appointment not found or not authorized" },
		  { status: 404 }
		);
	  }
  
	  return NextResponse.json(
		{ message: "Appointment deleted successfully" }
	  );
  
	} catch (error: any) {
	  console.error('DELETE error:', error);
	  return NextResponse.json(
		{ message: 'Internal server error' },
		{ status: 500 }
	  );
	}
  }