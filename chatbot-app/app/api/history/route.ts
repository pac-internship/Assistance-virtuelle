//import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET (request:Request) {
    try{
        const body = await request.json();
        return NextResponse.json(body) , {status:200, headers: {"Content-Type": "application/json"}}

    }catch (error) {
        console.error('Erreur  :', error);
        return NextResponse.json(
          { error: 'Failed to fetch messages' },
          { status: 500 }
        );
}
}