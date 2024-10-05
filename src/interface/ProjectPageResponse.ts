import { Project } from "./Project";

export interface ProjectPageResponse {
  totalPages: number,
  currentPage: number,
  list: Array<Project>
}