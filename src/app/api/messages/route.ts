import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB URI and Database Name
const MONGODB_URI = process.env.MONGODB_URI as string;

// Singleton MongoDB Client
let client: MongoClient | null = null;

async function getMongoClient() {
  if (!client) {
    try {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }
  return client;
}

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db("virtuals_backroom");

    const collections = await db.listCollections().toArray();
    // get last collection in array
    const latestChat = collections[collections.length - 1];

    // Access the "messages" collection
    const messagesCollection = db.collection(latestChat.name);
    const messages = await messagesCollection.find().sort({ timestamp: 1 }).toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
