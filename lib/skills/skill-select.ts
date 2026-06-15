import db from "../db";

export async function getAllSkills() {
  "use cache";
  try {
    const result = await db.skill.findMany({
      orderBy: {
        downloads: "desc",
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSkillBySlug(slug: string) {
  "use cache";
  try {
    const result = await db.skill.findUnique({
      where: {
        slug: slug,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
