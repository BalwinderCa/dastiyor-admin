import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function monthLabel(d) {
  return d.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

export async function GET() {
  try {
    const now = new Date();
    const start = new Date(now);
    start.setMonth(start.getMonth() - 11);
    start.setHours(0, 0, 0, 0);

    // Build last-12-month buckets (oldest -> newest)
    const buckets = [];
    const bucketMap = new Map();
    for (let i = 0; i < 12; i++) {
      const m = new Date(start);
      m.setMonth(start.getMonth() + i);
      const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`;
      buckets.push({ key, label: monthLabel(m), count: 0 });
      bucketMap.set(key, i);
    }

    const [
      usersCount,
      tasksCount,
      tasksOpen,
      tasksCompleted,
      reviewsCount,
      subscriptionsActive,
      tasksCreatedAt,
      recentTasks,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.task.count(),
      prisma.task.count({ where: { status: "OPEN" } }),
      prisma.task.count({ where: { status: "COMPLETED" } }),
      prisma.review.count(),
      prisma.subscription.count({ where: { isActive: true } }),
      prisma.task.findMany({
        where: { createdAt: { gte: start } },
        select: { createdAt: true },
      }),
      prisma.task.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { fullName: true, email: true, avatar: true },
          },
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    for (const t of tasksCreatedAt) {
      const d = new Date(t.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const idx = bucketMap.get(key);
      if (idx !== undefined) buckets[idx].count += 1;
    }

    return NextResponse.json({
      users: usersCount,
      tasks: tasksCount,
      tasksOpen,
      tasksCompleted,
      reviews: reviewsCount,
      subscriptionsActive,
      taskActivity: {
        labels: buckets.map((b) => b.label),
        data: buckets.map((b) => b.count),
      },
      recentTasks,
      recentUsers,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
