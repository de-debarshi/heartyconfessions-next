import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Confession from '@/models/confession';

export async function GET(res) {
    await dbConnect();

    const limit = 3;
    
    try {
        const doc = await Confession.find({ status: 'approved'}).sort({ reactionCount: -1, commentCount: -1 }).select('-comments').limit(limit);
        if (!doc) {
            return NextResponse.json('Error');
        }
        return NextResponse.json(doc);
        } catch (error) {
        console.log('Error in Retriving Confession', error);
    }
}