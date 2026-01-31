import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [usersCount, tasksCount, tasksOpen, tasksCompleted, reviewsCount, subscriptionsActive] =
      await Promise.all([
        prisma.user.count(),
        prisma.task.count(),
        prisma.task.count({ where: { status: "OPEN" } }),
        prisma.task.count({ where: { status: "COMPLETED" } }),
        prisma.review.count(),
        prisma.subscription.count({ where: { isActive: true } }),
      ]);

    return NextResponse.json({
      users: usersCount,
      tasks: tasksCount,
      tasksOpen,
      tasksCompleted,
      reviews: reviewsCount,
      subscriptionsActive,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
