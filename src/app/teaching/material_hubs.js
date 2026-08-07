const assignmentSection = {
  id: "assignments",
  eyebrow: "Assignments",
  title: "Assignments and projects",
  description: "Homework assignments, activities, and major projects collected in one place."
};

const lectureSection = {
  id: "lectures",
  eyebrow: "Lectures",
  title: "Lectures and class sessions",
  description: "A session-by-session home for lecture videos, slide decks, and transcripts as they become available."
};

const codeSection = {
  id: "code-and-data",
  eyebrow: "Code",
  title: "Code and datasets",
  description: "Course code, datasets, and the GitHub repository for reproducible examples."
};

export const hoaMaterialSections = [lectureSection, assignmentSection, codeSection];

export const fabMaterialSections = [lectureSection, assignmentSection];

export function getMaterialHub(courseSlug) {
  if (courseSlug.startsWith("hoa-")) return hoaMaterialSections;
  if (courseSlug.startsWith("fab-")) return fabMaterialSections;
  return null;
}
