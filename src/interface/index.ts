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
  projectManagerName: string;
  projectContent: ProjectContent[];
}

export interface Tag {
  tagId: number,
  tagName: string,
  createdAt: string,
  updatedAt: string
}

export interface ContentBlogResponse {
  projectDetail: ProjectDetailResponse,
  tags: Tag[]
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
  projectId: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export interface TransactionSearchResponse {
  content: Transaction[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}

export interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface Role {
  roleId: number;
  roleName: string;
  createdAt: string;
}

interface Authority {
  authority: string;
}

export interface UserDetailInfo {
  userId: number;
  fullName: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  isDeleted: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  password: string;
  username: string;
  authorities: Authority[];
}