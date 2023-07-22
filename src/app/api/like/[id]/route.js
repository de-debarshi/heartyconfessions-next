import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect';
import Confession from '@/models/confession';

const ObjectId = require('mongoose').Types.ObjectId;

export async function PUT(req, { params }) {
    await dbConnect()

    const confessionID = params.id;
    
    if (!ObjectId.isValid(confessionID)) {
        return NextResponse.json('No record with given id : ', confessionID);
    }

    try {
        const doc = await Confession.findByIdAndUpdate(confessionID, { $inc: { 'reactions.like': 1, reactionCount: 1 } }, { new: true });
        if (!doc) {
            return NextResponse.json('Error');
        }
        return NextResponse.json({reactionCount: doc.reactionCount});
      } catch (error) {
        console.log('Error in Confession Update', error);
    }
}