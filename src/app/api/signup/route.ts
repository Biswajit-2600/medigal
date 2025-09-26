import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Replace this with your actual DB logic
    // Example: await prisma.user.create({ data: body })
    // For now, just echo the data back
    return NextResponse.json({ success: true, user: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as any)?.message || "Unknown error" }, { status: 500 });
  }
}
