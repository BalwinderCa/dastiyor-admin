import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));
    const skip = (page - 1) * limit;
    const taskId = searchParams.get("taskId") || undefined;
    const userId = searchParams.get("userId") || undefined;
    const status = searchParams.get("status") || undefined;

    const where = {};
    if (taskId) where.taskId = taskId;
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const [responses, total] = await Promise.all([
      prisma.response.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          task: { select: { id: true, title: true, status: true } },
          user: { select: { id: true, fullName: true, email: true } },
        },
      }),
      prisma.response.count({ where }),
    ]);

    return NextResponse.json({
      data: responses,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
