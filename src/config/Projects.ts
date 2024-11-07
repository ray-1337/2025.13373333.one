export const ProjectType = ["Platform/Website", "Application", "Entertainment", "Article"] as const;

export const ProjectStateType = ["Discontinued", "Under Construction", "Hiatus"] as const;

interface ProjectsProp extends Record<"name" | "imgURL", string>, Partial<Record<"description" | "url" | "ytVidId", string>> {
  type: typeof ProjectType[number];
  yearRelease?: number;
  credits?: Array<Record<"name" | "url", string>>;
  projectState?: typeof ProjectStateType[number];
  hidden?: boolean
};

type ProjectsVariableProp = Array<ProjectsProp>;
