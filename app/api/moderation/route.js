import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET moderation queue: open tasks, unverified providers, recent tasks for review.
 */
export async function GET() {
  try {
    const [openTasksCount, unverifiedProviders, recentOpenTasks] = await Promise.all([
      prisma.task.count({ where: { status: "OPEN" } }),
      prisma.user.findMany({
        where: { role: "PROVIDER", isVerified: false },
        take: 20,
        orderBy: { createdAt: "desc" },
        select: { id: true, fullName: true, email: true, createdAt: true },
      }),
      prisma.task.findMany({
        where: { status: "OPEN" },
        take: 15,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, fullName: true, email: true } },
          _count: { select: { responses: true } },
        },
      }),
    ]);

    return NextResponse.json({
      openTasksCount,
      unverifiedProviders,
      recentOpenTasks,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
