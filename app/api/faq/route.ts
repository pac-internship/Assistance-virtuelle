

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

