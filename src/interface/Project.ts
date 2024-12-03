import { ProjectManager } from "./ProjectManager";
import { User } from "./User";

export interface Project {
  projectId: number;
  projectName: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  projectManager: User;
  imageProject: string;
}