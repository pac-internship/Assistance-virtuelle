import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === 'admin' && password === '1234') {
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return NextResponse.json(
    { success: false, message: 'Identifiants invalides' },
    { status: 401 }
  );
}
