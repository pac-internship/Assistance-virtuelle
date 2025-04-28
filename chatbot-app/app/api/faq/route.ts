import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const questions = await prisma.question.findMany({
            include: {
                reponses: true,
            },
        });

        return NextResponse.json(questions, { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error) {
        console.error('Erreur :', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
