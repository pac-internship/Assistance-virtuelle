 import { faker } from '@faker-js/faker';
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


export async function POST(req: Request){
    try{
        // const messages = await prisma.messages.findMany();
        const user = await prisma.user.findMany(); 
        return new Response(JSON.stringify(user) , {status:200, headers: {"Content-Type": "application/json"}})
    }catch(error){
       console.log("Erreur POST :", error);
       
        return Response.json({error: "Failed to fetch messages"} , {status:500})

    }
}



// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { text } = body;

//     if (!text) {
//       return NextResponse.json({ error: "Texte manquant dans la requête" }, { status: 400 });
//     }

//     // 🔹 Simuler une réponse de bot avec faker
//     const botReply = faker.lorem.sentence();

//     // 🔹 Tu peux modifier ces IDs selon ta logique
//     const idChatroom = 1;

//     // Enregistrer le message utilisateur dans la BDD
//     await prisma.message.create({
//       data: {
//         content: text,
//         idChatroom,
//         titre: "Utilisateur"
//       }
//     });

//     // Enregistrer la réponse du bot dans la BDD
//     await prisma.message.create({
//       data: {
//         content: botReply,
//         idChatroom,
//         titre: "Bot"
//       }
//     });

//     return NextResponse.json({ reply: botReply }, { status: 200 });

//   } catch (error) {
//     console.error("Erreur dans POST /api/chatbot:", error);
//     return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
//   }
// }