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
            const doc = await Confession.findByIdAndUpdate(payload._id, { $push: {comments:newComment} }, { new: true })
            if (!doc) {
                return NextResponse.json('Error');
            }
            var commentCount = doc.comments.length;
            try {
                const doc2 = await Confession.findByIdAndUpdate(payload._id, { $set: {commentCount: commentCount} }, { new: true })
                if (!doc) {
                    return NextResponse.json('Error');
                }
                return NextResponse.json({commentCount: doc.commentCount, comments: doc.comments});
            } catch (error) {
                console.log('Error in Confession Update', error);
            }
          } catch (error) {
            console.log('Error in Confession Update', error);
        }
      } catch (e) {
        console.log(e);
        return new Response(null, { status: 400, statusText: "Bad Request" });
      }
}