import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip")) || 0;
  const take = Number(searchParams.get("take")) || 3;

  try {
    const posts = await prisma.posts.findMany({
      skip: skip,
      take: take,
    });
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}
