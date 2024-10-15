// index.ts

export * from "./AuthResponse";
export * from "./RegisterBody";
export * from "./SigninBody";
export * from "./UseAuthResponse";
export * from "./User";
export * from "./Project";
export * from "./ProjectManager";
export * from "./ResponseState";
export * from "./ProjectPageResponse";
export * from "./APIState";

export interface ProjectContent {
  type: string; // "text", "image"
  content: string | null;
  path: string | null;
  displayOrder: number;
}

export interface ProjectDetailResponse {
  projectId: number;
  projectName: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  startDate: string; // ISO date format
  endDate: string; // ISO date format
  status: string; // e.g., "pending"
  projectContent: ProjectContent[];
}
