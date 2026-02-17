import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));
    const skip = (page - 1) * limit;
    const status = searchParams.get("status") || undefined;

    const where = {};
    if (status) where.status = status;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          reporter: { select: { id: true, fullName: true, email: true } },
          targetUser: { select: { id: true, fullName: true, email: true } },
          targetTask: { select: { id: true, title: true } },
        },
      }),
      prisma.report.count({ where }),
    ]);

    return NextResponse.json({
      data: reports,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { reporterId, targetUserId, targetTaskId, reason } = body;
    if (!reporterId || !reason) {
      return NextResponse.json(
        { error: "reporterId and reason required" },
        { status: 400 }
      );
    }
    const report = await prisma.report.create({
      data: {
        reporterId,
        targetUserId: targetUserId || null,
        targetTaskId: targetTaskId || null,
        reason,
        status: "OPEN",
      },
      include: {
        reporter: { select: { id: true, fullName: true, email: true } },
        targetUser: { select: { id: true, fullName: true, email: true } },
        targetTask: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json(report, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
