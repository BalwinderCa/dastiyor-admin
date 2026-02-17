import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const { hidden } = body || {};

    const review = await prisma.review.update({
      where: { id: params.id },
      data: { hidden: !!hidden },
    });

    return NextResponse.json(review);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

