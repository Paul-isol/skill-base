"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function incrementDownloadCountAction(slug: string) {
  try {
    const updated = await db.skill.update({
      where: { slug },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    // Revalidate paths that render skill metrics
    revalidatePath("/explore");
    revalidatePath(`/explore/${slug}`);
    revalidatePath("/profile");
    revalidatePath("/");

    return { success: true, downloads: updated.downloads };
  } catch (error) {
    console.error("Failed to increment download count:", error);
    return { success: false, error: "Database update failed" };
  }
}
