
//lire
// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from "next/server";

// let prisma: PrismaClient;

// prisma = new PrismaClient();

// export async function POST(request: Request){
//     try{
//         const messages = await prisma.messages.findMany();
//         return NextResponse.json(messages , {status:200})
//     }catch(error){
//         console.error("Erreur Prisma :", error);
//         return NextResponse.json({error: "Failed to fetch messages"} , {status:500})

//     }
// }


import { faker } from '@faker-js/faker';
export async function POST(req: Request){
    try{
        // const messages = await prisma.messages.findMany();
        const body = await req.json(); 
        const {text} = body;
        
        const botReply = faker.lorem.sentence();
        return new Response(JSON.stringify({'reply': botReply}) , {status:200, headers: {"Content-Type": "application/json"}})
    }catch(error){
       console.log(error);
       
        return Response.json({error: "Failed to fetch messages"} , {status:500})

    }
}