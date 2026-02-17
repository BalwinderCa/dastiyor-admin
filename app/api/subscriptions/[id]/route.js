import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const sub = await prisma.subscription.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
      },
    });
    if (!sub) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }
    return NextResponse.json(sub);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PATCH: extend (add days) or cancel (set isActive: false).
 * Body: { action: "extend" | "cancel", extendDays?: number }
 */
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const { action, extendDays } = body;

    const sub = await prisma.subscription.findUnique({
      where: { id: params.id },
    });
    if (!sub) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    if (action === "cancel") {
      await prisma.subscription.update({
        where: { id: params.id },
        data: { isActive: false },
      });
      return NextResponse.json({ success: true, message: "Subscription cancelled" });
    }

    if (action === "extend") {
      const days = Math.max(1, parseInt(extendDays, 10) || 30);
      const currentEnd = new Date(sub.endDate);
      const newEnd = new Date(currentEnd);
      newEnd.setDate(newEnd.getDate() + days);
      await prisma.subscription.update({
        where: { id: params.id },
        data: { endDate: newEnd, isActive: true },
      });
      return NextResponse.json({
        success: true,
        message: `Extended by ${days} days`,
        endDate: newEnd.toISOString(),
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Use extend or cancel." },
      { status: 400 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
