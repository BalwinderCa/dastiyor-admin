import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const ALLOWED_KEYS = ["company", "payment", "profile"];

export async function GET(request, { params }) {
  try {
    const key = params.key;
    if (!ALLOWED_KEYS.includes(key)) {
      return NextResponse.json({ error: "Invalid settings key" }, { status: 400 });
    }
    const row = await prisma.systemSetting.findUnique({
      where: { key },
    });
    const value = row ? JSON.parse(row.value || "{}") : {};
    return NextResponse.json(value);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const key = params.key;
    if (!ALLOWED_KEYS.includes(key)) {
      return NextResponse.json({ error: "Invalid settings key" }, { status: 400 });
    }
    const body = await request.json();
    const value = JSON.stringify(body);
    await prisma.systemSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
