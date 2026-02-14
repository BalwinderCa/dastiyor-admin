import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;
    const active = searchParams.get("active");
    const where = {};
    if (active === "true") where.isActive = true;
    if (active === "false") where.isActive = false;

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { endDate: "desc" },
        include: {
          user: { select: { id: true, fullName: true, email: true } },
        },
      }),
      prisma.subscription.count({ where }),
    ]);

    return NextResponse.json({
      data: subscriptions,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
