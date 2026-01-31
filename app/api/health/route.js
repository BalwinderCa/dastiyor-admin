import { prisma } from "@/lib/prisma";

export async function GET() {
  const hint =
    "Set .env DATABASE_URL to the same MySQL URL as your Dastiyor website .env (copy from website repo).";
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json(
        { ok: false, error: "DATABASE_URL is not set", database: "disconnected", hint },
        { status: 500 }
      );
    }
    await prisma.$connect();
    return Response.json({ ok: true, database: "connected" });
  } catch (e) {
    return Response.json(
      { ok: false, error: e.message, database: "disconnected", hint },
      { status: 500 }
    );
  }
}
