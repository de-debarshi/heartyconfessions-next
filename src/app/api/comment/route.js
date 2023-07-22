import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect';
import Confession from '@/models/confession';

const ObjectId = require('mongoose').Types.ObjectId;

export async function POST(req, { params }) {
    await dbConnect()

    try {
        const payload = await req.json();

        if (!ObjectId.isValid(payload._id))
        return res.status(400).send(`No record with given id : ${payload._id}`);
        var newComment = {
            username : payload.username,
            comment : payload.comment
        };
        
        try {
            const doc = await Confession.findByIdAndUpdate(payload._id, { $push: {comments:newComment}, $inc: { commentCount: 1 } }, { new: true })
            if (!doc) {
                return NextResponse.json('Error');
            }
            return NextResponse.json({commentCount: doc.commentCount, comments: doc.comments});
          } catch (error) {
            console.log('Error in Confession Update', error);
        }
      } catch (e) {
        console.log(e);
        return new Response(null, { status: 400, statusText: "Bad Request" });
      }
}