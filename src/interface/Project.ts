import { ProjectManager } from "./ProjectManager";

export interface Project {
  projectId: number;
  projectName: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  projectManager: ProjectManager;
}