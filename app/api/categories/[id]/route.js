import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { name, slug, order, subcategories } = body;
    const existing = await prisma.category.findUnique({
      where: { id: params.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    const data = {};
    if (name !== undefined) data.name = String(name).trim();
    if (slug !== undefined) {
      const slugNorm = String(slug).trim().toLowerCase().replace(/\s+/g, "-");
      const duplicate = await prisma.category.findFirst({
        where: { slug: slugNorm, id: { not: params.id } },
      });
      if (duplicate) {
        return NextResponse.json(
          { error: "Another category with this slug exists" },
          { status: 409 }
        );
      }
      data.slug = slugNorm;
    }
    if (order !== undefined) data.order = parseInt(order, 10) || 0;
    if (subcategories !== undefined) {
      data.subcategories = Array.isArray(subcategories)
        ? JSON.stringify(subcategories)
        : typeof subcategories === "string"
          ? JSON.stringify(
              subcategories.split(",").map((s) => s.trim()).filter(Boolean)
            )
          : null;
    }
    const category = await prisma.category.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(category);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
