

import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";



export async function GET(request: Request) {
  try {
    const messages = await prisma.message.findMany(); 
    return NextResponse.json(messages, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur Prisma :', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}



import { faker } from '@faker-js/faker';
export async function POST(req: Request){
    try{
        // const messages = await prisma.messages.findMany();
        const body = await req.json(); 
        const {text} = body;
          console.log("Message reçu du front :", text);
        const botReply = faker.lorem.sentence();
        return new Response(JSON.stringify({'reply': botReply}) , {status:200, headers: {"Content-Type": "application/json"}})
    }catch(error){
       console.log("Erreur POST :", error);
       
        return Response.json({error: "Failed to fetch messages"} , {status:500})

    }
}