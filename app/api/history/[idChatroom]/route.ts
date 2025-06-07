import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { idChatroom: string } }
) {
  const {idChatroom} = await params;

  console.log('id',idChatroom);
  
  
  //1. Vérifier l'authentification
  const session = await getServerSession(authOptions)
  console.log(session);
  if (!session || !session?.user ) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const chatroomWithMessage = await prisma.chatroom.findUnique({
      where: {  
        id: Number(params.idChatroom) 
       },
      include: {
        message: true,  // Tous les messages
        //question: true      // Toutes les FAQ
      }
    })
    console.log('ID :', params.idChatroom);

 return NextResponse.json({chatroomWithMessage});

}
   catch (error) {
   console.error('[HISTORY_GET]', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }

}
