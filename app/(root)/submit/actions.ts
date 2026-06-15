"use server";

import db from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitSkillAction(formData: {
  name: string;
  slug: string;
  description: string;
  category: string;
  markdownContent: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to submit a skill.");
  }

  // Clean values
  const name = formData.name.trim();
  const slug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
  const description = formData.description.trim();
  const category = formData.category.trim().toLowerCase();
  const markdownContent = formData.markdownContent.trim();

  if (!name || !slug || !description || !category || !markdownContent) {
    throw new Error("All fields are required.");
  }

  if (category !== "frontend" && category !== "backend") {
    throw new Error("Invalid category selected.");
  }

  // Check unique slug constraint
  const existing = await db.skill.findUnique({
    where: { slug },
  });

  if (existing) {
    throw new Error("A skill with this slug/filename already exists. Please choose a unique slug.");
  }

  // Save to database
  const skill = await db.skill.create({
    data: {
      name,
      slug,
      description,
      category,
      markdownContent,
      downloads: 0,
      authorId: session.user.id,
      authorName: session.user.name,
    },
  });

  // Revalidate explore lists
  revalidatePath("/explore");
  revalidatePath("/");

  return { success: true, slug: skill.slug, category: skill.category };
}
