import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const numberOfPosts = await prisma.posts.count();
    return new Response(JSON.stringify(numberOfPosts), {
      status: 200,
      headers: {
        "Content-Type": "application-json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}
