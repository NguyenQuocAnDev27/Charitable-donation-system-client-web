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

export interface TransactionResponse {
  projectId: string;
  projectName: string;
  qrContent: string;
}

export interface Transaction {
  id: string;
  description: string;
  value: string;
  date: string;
  donorName: string;
  projectName: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface TransactionSearchResponse {
  content: Transaction[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}