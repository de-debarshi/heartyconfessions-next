import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Confession from '@/models/confession';
import { use } from 'react';

const ObjectId = require('mongoose').Types.ObjectId;

export async function GET(res, { params }) {
  await dbConnect();

  const { id } = await params;
  const confessionID = id;

  if (!ObjectId.isValid(confessionID)) {
    return NextResponse.json('No record with given id : ', confessionID);
  }

  try {
    const doc = await Confession.findById(confessionID);
    if (!doc) {
      return NextResponse.json('Error');
    }
    return NextResponse.json(doc);
  } catch (error) {
    console.log('Error in Retriving Confession', error);
  }
}
