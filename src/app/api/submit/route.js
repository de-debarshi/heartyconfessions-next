import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect';
import Confession from '@/models/confession';


export async function POST(req, { params }) {
    await dbConnect()

    try {
        const payload = await req.json();

        var confsn = new Confession({
            age: payload.age,
            sex: payload.sex,
            content: payload.content,
            status: 'unapproved',
            categories: payload.categories,
            reactions: {
                like : 0,
                dislike : 0,
                sad : 0,
                angry : 0,
                funny: 0
            },
            comments : [],
            commentCount : 0,
            reactionCount : 0
        });
        try {
            const doc = await confsn.save()
            if (!doc) {
                return NextResponse.json('Error');
            }
            return NextResponse.json({_id: doc._id});
          } catch (error) {
            console.log('Error in Submitting Confession', error);
        }
      } catch (e) {
        console.log(e);
        return new Response(null, { status: 400, statusText: "Bad Request" });
      }
}