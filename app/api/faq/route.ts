// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//         const questions = await prisma.question.findMany({
//             include: {
//                 reponses: true,
//             },
//         });

//         return NextResponse.json(questions, { 
//             status: 200, 
//             headers: { "Content-Type": "application/json" } 
//         });

//     } catch (error) {
//         console.error('Erreur :', error);
//         return NextResponse.json(
//             { error: 'Failed to fetch messages' },
//             { status: 500 }
//         );
//     }
// }

// app/api/faq/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const mainQuestions = await prisma.question.findMany({
      where: { parentId: null },
      include: { children: true },
    });

    return NextResponse.json(mainQuestions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

