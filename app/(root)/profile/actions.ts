"use server";

import db from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteSkillAction(slug: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to delete a skill.");
  }

  // Find the skill to check ownership
  const skill = await db.skill.findUnique({
    where: { slug },
  });

  if (!skill) {
    throw new Error("Skill not found.");
  }

  if (skill.authorId !== session.user.id) {
    throw new Error("You are not authorized to delete this skill.");
  }

  // Delete from database
  await db.skill.delete({
    where: { slug },
  });

  // Revalidate lists
  revalidatePath("/explore");
  revalidatePath("/profile");
  revalidatePath("/");

  return { success: true };
}

export async function updateSkillAction(
  originalSlug: string,
  formData: {
    name: string;
    slug: string;
    description: string;
    category: string;
    markdownContent: string;
  }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to update a skill.");
  }

  // Check ownership
  const originalSkill = await db.skill.findUnique({
    where: { slug: originalSlug },
  });

  if (!originalSkill) {
    throw new Error("Original skill not found.");
  }

  if (originalSkill.authorId !== session.user.id) {
    throw new Error("You are not authorized to edit this skill.");
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

  // If slug is changing, verify unique constraint on new slug
  if (slug !== originalSlug) {
    const existing = await db.skill.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new Error("A skill with this new slug/filename already exists. Please choose a unique slug.");
    }
  }

  // Update Prisma database record
  await db.skill.update({
    where: { slug: originalSlug },
    data: {
      name,
      slug,
      description,
      category,
      markdownContent,
    },
  });

  // Revalidate routes
  revalidatePath("/explore");
  revalidatePath(`/explore/${slug}`);
  if (slug !== originalSlug) {
    revalidatePath(`/explore/${originalSlug}`);
  }
  revalidatePath("/profile");
  revalidatePath("/");

  return { success: true, slug, category };
}
