import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Confession from '@/models/confession';

export const config = {
    runtime: 'edge',
};

export async function GET(res, { params }) {
    await dbConnect();

    const limit = 20;
    const skip = (params.page-1) * limit;
    let responseObj = {
        totalPage : null,
        confessionList : null
    };
    let searchQuery;
    let categoriesSelected = params.category;
    if(categoriesSelected && categoriesSelected !== 'undefined' && categoriesSelected !== 'Any' && categoriesSelected !== 'null') {
        searchQuery = { status: 'approved' , categories: categoriesSelected};
    } else {
        searchQuery = { status: 'approved'};
    }
    
    try {
        const count = await Confession.countDocuments(searchQuery);
        if (!count) {
            return NextResponse.json('Error');
        }
        else {
            responseObj.totalPage = Math.ceil(count / limit);
            try {
                const doc = await Confession.find(searchQuery).select('-comments').limit(limit).skip(skip);
                if (!doc) {
                    return NextResponse.json('Error');
                }
                responseObj.confessionList = doc;
                return NextResponse.json(responseObj);
              } catch (error) {
                console.log('Error in Retriving Confession', error);
            }
        }
      } catch (error) {
        console.log('Error in Retriving Confession', error);
    }
}