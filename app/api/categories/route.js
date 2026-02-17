import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ data: categories });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, slug, order, subcategories } = body;
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug required" },
        { status: 400 }
      );
    }
    const slugNorm = String(slug).trim().toLowerCase().replace(/\s+/g, "-");
    const existing = await prisma.category.findUnique({
      where: { slug: slugNorm },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Category with this slug already exists" },
        { status: 409 }
      );
    }
    const subJson =
      subcategories == null
        ? null
        : JSON.stringify(
            Array.isArray(subcategories)
              ? subcategories
              : typeof subcategories === "string"
                ? subcategories.split(",").map((s) => s.trim()).filter(Boolean)
                : []
          );
    const category = await prisma.category.create({
      data: {
        name: String(name).trim(),
        slug: slugNorm,
        order: parseInt(order, 10) || 0,
        subcategories: subJson,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
