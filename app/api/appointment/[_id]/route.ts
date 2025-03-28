// app/api/appointments/[id]/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { dbPromise } from '@/lib/mongodb';

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