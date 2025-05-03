"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import getDbUserId from "../actions/user.action";
export async function createPost(content: string, image: string) {
  try {
    const user = await getDbUserId();

    if (!user) return;

    const post = await prisma.post.create({
      data: {
        content,
        image,
        authorId: user.id,
      },
    });

    revalidatePath("/"); // purge the cache for the home page
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
