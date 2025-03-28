// app/api/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { dbPromise } from '@/lib/mongodb';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    const db = await dbPromise();
    const body = await request.json();
    
    // Validate the appointment ID
    if (!ObjectId.isValid((await params)._id)) {
      return NextResponse.json(
        { message: 'Invalid appointment ID' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      status: body.status,
      updatedAt: new Date()
    };

    // Add approval info if status is being approved
    if (body.status === 'approved') {
      updateData.approvedBy = body.approvedBy || 'admin';
      updateData.approvedAt = new Date();
    }

    // Update the appointment in MongoDB
    const result = await db.collection('appointments').updateOne(
      { _id: new ObjectId((await params)._id) },
      { $set: updateData }
    );

    // Check if appointment was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Return the updated appointment
    const updatedAppointment = await db.collection('appointments').findOne({
      _id: new ObjectId((await params)._id)
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { message: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ _id: string }> }
  ) {
	try {

  
	  const appointmentId = (await params)._id;
	  
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